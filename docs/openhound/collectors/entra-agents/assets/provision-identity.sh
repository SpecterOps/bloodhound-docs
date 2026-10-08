#!/usr/bin/env bash
# provision-identity.sh — provision the unattended, least-privilege collector.
#
# Default mode creates only the collector application/service principal, grants
# Microsoft Graph application permissions, two custom Azure read roles, and
# Power Platform Reader. Dataverse Application User creation and its read-only
# role remain deliberate per-environment administrator actions.
#
# Set COLLECTOR_MODE=compatibility to additionally create and license the
# delegated reader required only by legacy device-code collection.

set -euo pipefail

err() { printf '[provision] %s\n' "$*" >&2; }
fail() { err "ERROR: $*"; exit 2; }

if ! command -v az >/dev/null 2>&1; then
  fail "'az' is required"
fi
if command -v python3 >/dev/null 2>&1; then
  PYTHON_BIN=python3
elif command -v python >/dev/null 2>&1; then
  PYTHON_BIN=python
else
  fail "Python is required for Foundry role synchronization"
fi
"$PYTHON_BIN" -c 'import sys; sys.exit(sys.version_info < (3, 13))' \
  || fail 'Python 3.13 or newer is required'
if ! az account show >/dev/null 2>&1; then
  fail "sign in with 'az login --tenant <tenant-guid>' first"
fi
if [[ -t 1 && "${FORCE_TTY:-}" != "1" ]]; then
  err "This script emits a client secret to stdout. Redirect it to an approved secret file."
  err "Example: bash ./provision-identity.sh >> .env"
  exit 2
fi

COLLECTOR_MODE="${COLLECTOR_MODE:-sp-only}"
case "$COLLECTOR_MODE" in
  sp-only|compatibility) ;;
  *) fail "COLLECTOR_MODE must be 'sp-only' or 'compatibility'" ;;
esac

[[ -z "${FOUNDRY_SUBSCRIPTIONS:-}" ]] \
  || fail 'FOUNDRY_SUBSCRIPTIONS is no longer supported; use SUBSCRIPTIONS for both Azure roles'

TENANT_ID="${TENANT_ID:-$(az account show --query tenantId -o tsv)}"
[[ "$TENANT_ID" =~ ^[0-9a-fA-F-]{36}$ ]] || fail "Invalid tenant ID: $TENANT_ID"
SP_NAME="${SP_NAME:-OpenGraph-AZAgents-Collector-ReadOnly}"
SUBSCRIPTIONS="${SUBSCRIPTIONS:-}"
subscriptions=()
if [[ -n "${SUBSCRIPTIONS//[[:space:]]/}" ]]; then
  read -r -a subscriptions <<< "${SUBSCRIPTIONS//$'\n'/ }"
  for subscription in "${subscriptions[@]}"; do
    [[ "$subscription" =~ ^[0-9a-fA-F-]{36}$ ]] || fail "Invalid subscription ID: $subscription"
  done
fi
ARM_ROLE_NAME='OpenHound Entra Agents ARM Reader'
GRAPH_APP_ID='00000003-0000-0000-c000-000000000000'
PP_API_VERSION='2024-10-01'

READER_UPN=''
READER_SKU_ID=''
USAGE_LOCATION="${USAGE_LOCATION:-US}"
if [[ "$COLLECTOR_MODE" == 'compatibility' ]]; then
  command -v openssl >/dev/null 2>&1 || fail "'openssl' is required in compatibility mode"
  READER_UPN="${READER_UPN:-azagents-collector-reader@$(az rest --method get --url 'https://graph.microsoft.com/v1.0/organization' --query 'value[0].verifiedDomains[?isDefault].name | [0]' -o tsv)}"
  READER_SKU_ID="${READER_SKU_ID:-}"
  [[ -n "$READER_SKU_ID" ]] || fail "READER_SKU_ID is required in compatibility mode"
fi

GRAPH_APP_SCOPES=(
  'Application.Read.All'
  'User.Read.All'
  'RoleManagement.Read.Directory'
  'AgentIdentity.Read.All'
  'AgentIdentityBlueprint.Read.All'
  'AgentIdentityBlueprintPrincipal.Read.All'
  'AgentCollection.Read.All'
  'AgentInstance.Read.All'
)

err "Mode: $COLLECTOR_MODE"
err "Tenant: $TENANT_ID"
az account show --query '{user:user.name, tenant:tenantId, subscription:id}' -o table >&2

PUBLIC_CLIENT=false
if [[ "$COLLECTOR_MODE" == 'compatibility' ]]; then
  PUBLIC_CLIENT=true
fi

APP_ID=$(az ad app list --display-name "$SP_NAME" --query '[0].appId' -o tsv || true)
if [[ -z "$APP_ID" ]]; then
  err "Creating Entra application $SP_NAME"
  APP_ID=$(az ad app create \
    --display-name "$SP_NAME" \
    --sign-in-audience AzureADMyOrg \
    --is-fallback-public-client "$PUBLIC_CLIENT" \
    --query appId -o tsv)
else
  err "Reusing Entra application $SP_NAME ($APP_ID)"
  az ad app update --id "$APP_ID" --is-fallback-public-client "$PUBLIC_CLIENT"
fi

SP_OBJECT_ID=$(az ad sp list --filter "appId eq '$APP_ID'" --query '[0].id' -o tsv || true)
if [[ -z "$SP_OBJECT_ID" ]]; then
  err "Creating enterprise application for $APP_ID"
  SP_OBJECT_ID=$(az ad sp create --id "$APP_ID" --query id -o tsv)
fi

err "Adding read-only Microsoft Graph application permissions"
for scope in "${GRAPH_APP_SCOPES[@]}"; do
  role_id=$(az ad sp show --id "$GRAPH_APP_ID" \
    --query "appRoles[?value=='$scope'].id | [0]" -o tsv)
  [[ -n "$role_id" && "$role_id" != 'null' ]] || fail "Microsoft Graph does not expose app role $scope"
  az ad app permission add --id "$APP_ID" --api "$GRAPH_APP_ID" --api-permissions "$role_id=Role" >/dev/null
done

if [[ "$COLLECTOR_MODE" == 'compatibility' ]]; then
  # Compatibility mode intentionally omits delegated ARM. ARM and Foundry are
  # application-only in both modes.
  DELEGATED_RESOURCES=(
    'PowerApps:475226c6-020e-4fb2-8a90-7a972cbfc1d4:User'
    'Flow:7df0a125-d3be-4c96-aa54-591f83ff541c:User'
    'Dataverse:00000007-0000-0000-c000-000000000000:user_impersonation'
  )
  err "Adding compatibility delegated permissions"
  for entry in "${DELEGATED_RESOURCES[@]}"; do
    resource_name=${entry%%:*}
    remainder=${entry#*:}
    resource_app_id=${remainder%%:*}
    scope_name=${remainder#*:}
    az ad sp create --id "$resource_app_id" >/dev/null 2>&1 || true
    scope_id=$(az ad sp show --id "$resource_app_id" \
      --query "oauth2PermissionScopes[?value=='$scope_name'].id | [0]" -o tsv)
    [[ -n "$scope_id" && "$scope_id" != 'null' ]] || fail "$resource_name does not expose delegated scope $scope_name"
    az ad app permission add --id "$APP_ID" --api "$resource_app_id" --api-permissions "$scope_id=Scope" >/dev/null
  done
fi

err 'Granting administrator consent'
for attempt in 1 2 3 4 5; do
  if az ad app permission admin-consent --id "$APP_ID"; then
    break
  fi
  [[ "$attempt" != 5 ]] || fail 'administrator consent failed after five attempts'
  sleep $((attempt * 5))
done

if [[ "$COLLECTOR_MODE" == 'compatibility' ]]; then
  for entry in "${DELEGATED_RESOURCES[@]}"; do
    remainder=${entry#*:}
    resource_app_id=${remainder%%:*}
    scope_name=${remainder#*:}
    resource_sp_id=$(az ad sp show --id "$resource_app_id" --query id -o tsv)
    az ad app permission grant \
      --id "$APP_ID" \
      --api "$resource_sp_id" \
      --scope "$scope_name" \
      --consent-type AllPrincipals >/dev/null
  done
fi

grant_azure_role() {
  local role_name="$1"
  local scope="$2"
  local assignment_id
  local create_output

  assignment_id=$(az role assignment list \
    --assignee "$SP_OBJECT_ID" \
    --role "$role_name" \
    --scope "$scope" \
    --query "[?scope=='$scope'].id | [0]" -o tsv) \
    || fail "Unable to check $role_name at $scope"
  if [[ -n "$assignment_id" && "$assignment_id" != 'null' ]]; then
    err "$role_name assignment already exists at $scope ($assignment_id)"
  else
    err "Granting $role_name to the collector at $scope"
    if ! create_output=$(az role assignment create \
      --role "$role_name" \
      --assignee-object-id "$SP_OBJECT_ID" \
      --assignee-principal-type ServicePrincipal \
      --scope "$scope" 2>&1); then
      assignment_id=$(az role assignment list \
        --assignee "$SP_OBJECT_ID" \
        --role "$role_name" \
        --scope "$scope" \
        --query "[?scope=='$scope'].id | [0]" -o tsv) \
        || fail "Unable to check $role_name at $scope after assignment failure"
      if [[ -n "$assignment_id" && "$assignment_id" != 'null' ]]; then
        err "$role_name assignment already exists at $scope ($assignment_id)"
      else
        fail "Unable to grant $role_name at $scope: $create_output"
      fi
    fi
  fi

  assignment_id=$(az role assignment list \
    --assignee "$SP_OBJECT_ID" \
    --role "$role_name" \
    --scope "$scope" \
    --query "[?scope=='$scope'].id | [0]" -o tsv) \
    || fail "Unable to verify $role_name at $scope"
  [[ -n "$assignment_id" && "$assignment_id" != 'null' ]] \
    || fail "$role_name assignment was not found at $scope"
  err "Verified $role_name assignment at $scope ($assignment_id)"
}

TENANT_ROOT_MANAGEMENT_GROUP_SCOPE=$(az account management-group show \
  --name "$TENANT_ID" \
  --query id -o tsv) || fail 'Unable to resolve the tenant root management group'
[[ "$TENANT_ROOT_MANAGEMENT_GROUP_SCOPE" == /providers/Microsoft.Management/managementGroups/* ]] \
  || fail 'Azure CLI returned an invalid tenant root management-group scope'
if [[ -z "$(az role definition list --name "$ARM_ROLE_NAME" --query '[0].name' -o tsv)" ]]; then
  role_file=$(mktemp)
  if ! "$PYTHON_BIN" -c '
import json
import sys

with open(sys.argv[1], encoding="utf-8") as source:
    properties = json.load(source)["properties"]
permissions = properties["permissions"][0]
role = {
    "Name": properties["roleName"],
    "IsCustom": True,
    "Description": properties["description"],
    "Actions": permissions["actions"],
    "NotActions": permissions["notActions"],
    "DataActions": permissions["dataActions"],
    "NotDataActions": permissions["notDataActions"],
    "AssignableScopes": [scope.replace("<tenantRootGroupId>", sys.argv[2]) for scope in properties["assignableScopes"]],
}
json.dump(role, sys.stdout)
' "$(dirname "$0")/openhound-entra-agents-arm-reader-role.json" "$TENANT_ID" > "$role_file"; then
    rm -f "$role_file"
    fail "Unable to prepare $ARM_ROLE_NAME"
  fi
  if ! az role definition create --role-definition "$role_file" >/dev/null; then
    rm -f "$role_file"
    fail "Unable to create $ARM_ROLE_NAME"
  fi
  rm -f "$role_file"
fi
if ((${#subscriptions[@]})); then
  for subscription in "${subscriptions[@]}"; do
    grant_azure_role "$ARM_ROLE_NAME" "/subscriptions/$subscription"
  done
else
  grant_azure_role "$ARM_ROLE_NAME" "$TENANT_ROOT_MANAGEMENT_GROUP_SCOPE"
fi

err 'Discovering Foundry subscriptions and assigning the subscription-scoped role'
# The helper uses the same SUBSCRIPTIONS setting as the ARM role assignment.
"$PYTHON_BIN" "$(dirname "$0")/sync-foundry-roles.py" \
  --apply --principal-object-id "$SP_OBJECT_ID" >&2

err 'Assigning Power Platform Reader to the collector enterprise application'
PP_TOKEN=$(az account get-access-token --resource 'https://api.powerplatform.com' --query accessToken -o tsv)
PP_HEADERS=("Authorization=Bearer $PP_TOKEN" 'Content-Type=application/json')
PP_READER_ROLE_ID=$(az rest --method get \
  --url "https://api.powerplatform.com/authorization/roleDefinitions?api-version=$PP_API_VERSION" \
  --headers "${PP_HEADERS[@]}" \
  --query "value[?name=='Reader'].id | [0]" -o tsv)
[[ -n "$PP_READER_ROLE_ID" && "$PP_READER_ROLE_ID" != 'null' ]] || fail 'Power Platform Reader role definition was not returned'
PP_SCOPE="/tenants/$TENANT_ID"
EXISTING_PP_ASSIGNMENT=$(az rest --method get \
  --url "https://api.powerplatform.com/authorization/roleAssignments?api-version=$PP_API_VERSION" \
  --headers "${PP_HEADERS[@]}" \
  --query "value[?principalObjectId=='$SP_OBJECT_ID' && roleDefinitionId=='$PP_READER_ROLE_ID' && scope=='$PP_SCOPE'].id | [0]" -o tsv)
if [[ -z "$EXISTING_PP_ASSIGNMENT" || "$EXISTING_PP_ASSIGNMENT" == 'null' ]]; then
  az rest --method post \
    --url "https://api.powerplatform.com/authorization/roleAssignments?api-version=$PP_API_VERSION" \
    --headers "${PP_HEADERS[@]}" \
    --body "{\"roleDefinitionId\":\"$PP_READER_ROLE_ID\",\"principalObjectId\":\"$SP_OBJECT_ID\",\"principalType\":\"ApplicationUser\",\"scope\":\"$PP_SCOPE\"}" >/dev/null
fi

READER_OBJECT_ID=''
if [[ "$COLLECTOR_MODE" == 'compatibility' ]]; then
  READER_OBJECT_ID=$(az ad user list --filter "userPrincipalName eq '$READER_UPN'" --query '[0].id' -o tsv || true)
  if [[ -z "$READER_OBJECT_ID" ]]; then
    INITIAL_PASSWORD=$(openssl rand -base64 24)
    err "Creating delegated reader $READER_UPN"
    READER_OBJECT_ID=$(az ad user create \
      --display-name 'OpenGraph AZ Agents Reader' \
      --user-principal-name "$READER_UPN" \
      --password "$INITIAL_PASSWORD" \
      --force-change-password-next-sign-in true \
      --query id -o tsv)
    err "INITIAL_PASSWORD=$INITIAL_PASSWORD (complete the required password change)"
  fi
  CURRENT_USAGE_LOCATION=$(az rest --method get \
    --url "https://graph.microsoft.com/v1.0/users/$READER_OBJECT_ID" \
    --query usageLocation -o tsv)
  if [[ -z "$CURRENT_USAGE_LOCATION" || "$CURRENT_USAGE_LOCATION" == 'null' ]]; then
    az rest --method patch --url "https://graph.microsoft.com/v1.0/users/$READER_OBJECT_ID" \
      --headers 'Content-Type=application/json' \
      --body "{\"usageLocation\":\"$USAGE_LOCATION\"}" >/dev/null
  fi
  az rest --method post --url "https://graph.microsoft.com/v1.0/users/$READER_OBJECT_ID/assignLicense" \
    --headers 'Content-Type=application/json' \
    --body "{\"addLicenses\":[{\"skuId\":\"$READER_SKU_ID\"}],\"removeLicenses\":[]}" >/dev/null
fi

err 'Creating collector secret with a 12-month lifetime'
CLIENT_SECRET=$(az ad app credential reset \
  --id "$APP_ID" \
  --append \
  --display-name "collector-$(date +%Y%m%d)" \
  --years 1 \
  --query password -o tsv)

err 'Provisioning complete.'
if [[ "$COLLECTOR_MODE" == 'sp-only' ]]; then
  err 'Next: export/review the environment inventory and create an enabled Dataverse Application User with a read-only role in each approved environment.'
else
  err 'Next: add the reader as an enabled Dataverse user and assign OpenGraph Agent Reader in each approved Dataverse environment. For an approved no-Dataverse compatibility environment, retain only the least environment role required by its legacy collection surface and record the exception.'
fi

cat <<EOF
# --- OpenHound Entra Agents collector ($(date -u +%Y-%m-%dT%H:%M:%SZ)) ---
AZ_AGENTS_TENANT_ID=$TENANT_ID
AZ_AGENTS_CLIENT_ID=$APP_ID
AZ_AGENTS_CLIENT_SECRET=$CLIENT_SECRET
AZ_AGENTS_SP_OBJECT_ID=$SP_OBJECT_ID
EOF
if [[ "$COLLECTOR_MODE" == 'compatibility' ]]; then
  cat <<EOF
AZ_AGENTS_READER_UPN=$READER_UPN
AZ_AGENTS_READER_OBJECT_ID=$READER_OBJECT_ID
EOF
fi
printf '%s\n' '# ----------------------------------------------------------------------'
