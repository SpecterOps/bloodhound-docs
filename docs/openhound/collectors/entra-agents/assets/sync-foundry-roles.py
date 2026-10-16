#!/usr/bin/env python3
"""Preview or grant the subscription-scoped Foundry agent read role.

Uses the signed-in Azure CLI identity. The default run is read-only; --apply
creates or extends the role and adds missing subscription assignments. It never
creates credentials or removes existing assignments.
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any

ROLE_FILE = Path(__file__).with_name("openhound-entra-agents-foundry-agent-reader-role.json")
ACCOUNT_API_VERSIONS = ("2025-06-01", "2023-05-01")


class AzureCliError(RuntimeError):
    """Azure CLI could not complete a required operation."""


def az(*args: str) -> Any:
    launcher = shutil.which("az") or "az"
    command = [launcher]
    if launcher.lower().endswith((".cmd", ".bat")):
        bundled_python = Path(launcher).parent.parent / "python.exe"
        if not bundled_python.is_file():
            raise AzureCliError("Azure CLI's bundled Python was not found next to its Windows launcher")
        command = [str(bundled_python), "-IBm", "azure.cli"]
    try:
        result = subprocess.run(
            [*command, *args, "--output", "json"],
            capture_output=True,
            text=True,
            check=False,
        )
    except OSError as exc:
        raise AzureCliError("Azure CLI is not available; install az and sign in") from exc
    if result.returncode:
        detail = result.stderr.strip().splitlines()[-1:] or ["unknown Azure CLI error"]
        raise AzureCliError(f"az {' '.join(args[:3])} failed: {detail[0][:300]}")
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as exc:
        raise AzureCliError(f"az {' '.join(args[:3])} returned invalid JSON") from exc


def visible_subscriptions(tenant_id: str) -> list[str]:
    accounts = az("account", "list", "--refresh")
    return [
        account["id"].lower()
        for account in accounts
        if account.get("tenantId", "").lower() == tenant_id.lower() and account.get("state", "").lower() == "enabled"
    ]


def selected_subscriptions(visible: list[str]) -> list[str]:
    if os.environ.get("FOUNDRY_SUBSCRIPTIONS"):
        raise ValueError("FOUNDRY_SUBSCRIPTIONS is no longer supported; use SUBSCRIPTIONS")
    override = os.environ.get("SUBSCRIPTIONS", "").split()
    if override:
        return list(dict.fromkeys(override))
    found: list[str] = []
    for subscription in visible:
        accounts = arm_items(
            f"/subscriptions/{subscription}/providers/Microsoft.CognitiveServices/accounts",
            ACCOUNT_API_VERSIONS,
        )
        if any((account.get("kind") or "").lower() in {"aiservices", "openai"} for account in accounts):
            found.append(subscription)
    return found


def principal_object_id(explicit: str | None) -> str:
    principal = explicit or os.environ.get("AZ_AGENTS_SP_OBJECT_ID")
    if principal:
        return principal
    display_name = os.environ.get("SP_NAME", "OpenGraph-AZAgents-Collector-ReadOnly")
    apps = az("ad", "app", "list", "--display-name", display_name)
    matches = [app for app in apps if app.get("displayName") == display_name]
    if len(matches) != 1:
        raise ValueError(f"Expected one app named {display_name!r}; set AZ_AGENTS_SP_OBJECT_ID")
    service_principals = az("ad", "sp", "list", "--filter", f"appId eq '{matches[0]['appId']}'")
    if len(service_principals) != 1:
        raise ValueError("Collector enterprise application was not found; set AZ_AGENTS_SP_OBJECT_ID")
    return service_principals[0]["id"]


def arm_items(path: str, versions: tuple[str, ...]) -> list[dict[str, Any]]:
    last_error: AzureCliError | None = None
    had_success = False
    for version in versions:
        url = f"https://management.azure.com{path}?api-version={version}"
        items: list[dict[str, Any]] = []
        try:
            while url:
                if not url.startswith("https://management.azure.com/"):
                    raise ValueError("Azure returned a nextLink outside management.azure.com")
                response = az("rest", "--method", "get", "--url", url)
                if not isinstance(response, dict):
                    raise AzureCliError(f"Azure returned an invalid resource list for {path}")
                page = response.get("value")
                if not isinstance(page, list):
                    raise AzureCliError(f"Azure returned an invalid resource list for {path}")
                items.extend(page)
                url = response.get("nextLink") or ""
        except AzureCliError as exc:
            last_error = exc
            continue
        had_success = True
        if items:
            return items
    if had_success:
        return []
    raise AzureCliError(f"Cannot enumerate {path}: {last_error}")


def role_definition(role_name: str, subscriptions: list[str]) -> dict[str, Any] | None:
    matches: dict[str, dict[str, Any]] = {}
    for subscription in subscriptions:
        definitions = az(
            "role",
            "definition",
            "list",
            "--name",
            role_name,
            "--scope",
            f"/subscriptions/{subscription}",
        )
        for role in definitions:
            if role.get("roleName") == role_name:
                matches[role["name"]] = role
    if len(matches) > 1:
        raise ValueError(f"Multiple Azure role definitions named {role_name!r}")
    return next(iter(matches.values())) if matches else None


def check_role_permissions(role: dict[str, Any], template: dict[str, Any]) -> None:
    if role.get("roleType") != "CustomRole":
        raise ValueError("Existing Foundry role is not a custom role")
    permissions = role.get("permissions") or []
    if len(permissions) != 1:
        raise ValueError("Existing Foundry role has an unexpected permission set")
    expected = template["permissions"][0]
    for key in ("actions", "notActions", "dataActions", "notDataActions"):
        if sorted(permissions[0].get(key) or []) != sorted(expected[key]):
            raise ValueError(f"Existing Foundry role {key} differ from the role template")


def cli_role_from_template(template: dict[str, Any], scopes: list[str]) -> dict[str, Any]:
    permissions = template["permissions"][0]
    return {
        "Name": template["roleName"],
        "IsCustom": True,
        "Description": template["description"],
        "Actions": permissions["actions"],
        "NotActions": permissions["notActions"],
        "DataActions": permissions["dataActions"],
        "NotDataActions": permissions["notDataActions"],
        "AssignableScopes": scopes,
    }


def write_role(role: dict[str, Any], operation: str) -> dict[str, Any]:
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", encoding="utf-8", delete=False) as file:
        json.dump(role, file)
        path = file.name
    try:
        result = az("role", "definition", operation, "--role-definition", path)
    finally:
        Path(path).unlink(missing_ok=True)
    if not isinstance(result, dict):
        raise AzureCliError(f"Azure returned an invalid role definition after {operation}")
    return result


def has_assignment(principal: str, scope: str, role_id: str) -> bool:
    assignments = az("role", "assignment", "list", "--assignee", principal, "--scope", scope)
    return any(
        assignment.get("scope", "").lower() == scope.lower()
        and assignment.get("roleDefinitionId", "").lower().endswith("/" + role_id.lower())
        for assignment in assignments
    )


def sync(apply: bool, explicit_principal: str | None) -> None:
    current = az("account", "show")
    tenant_id = os.environ.get("TENANT_ID") or current["tenantId"]
    if tenant_id.lower() != current["tenantId"].lower():
        raise ValueError("TENANT_ID differs from the signed-in Azure CLI tenant")
    visible = visible_subscriptions(tenant_id)
    subscriptions = selected_subscriptions(visible)
    if not subscriptions:
        print("No subscriptions with Foundry-capable accounts were discovered; no role assignments needed.")
        return
    principal = principal_object_id(explicit_principal)
    template = json.loads(ROLE_FILE.read_text(encoding="utf-8"))["properties"]
    role_name = template["roleName"]
    role = role_definition(role_name, list(dict.fromkeys([*visible, *subscriptions])))
    if role:
        check_role_permissions(role, template)
        current_scopes = role.get("assignableScopes") or []
    else:
        current_scopes = []
    root_scope = f"/providers/Microsoft.Management/managementGroups/{tenant_id}".lower()
    current_scope_set = {scope.lower() for scope in current_scopes}
    added_scopes = [
        f"/subscriptions/{sub}"
        for sub in subscriptions
        if root_scope not in current_scope_set and f"/subscriptions/{sub}" not in current_scope_set
    ]
    scopes = [f"/subscriptions/{sub}" for sub in subscriptions]
    missing = [scope for scope in scopes if role is None or not has_assignment(principal, scope, role["name"])]

    print(f"Foundry subscriptions ({len(subscriptions)}): {', '.join(subscriptions)}")
    source = (
        "SUBSCRIPTIONS (account discovery skipped)"
        if os.environ.get("SUBSCRIPTIONS", "").split()
        else "subscriptions with AI Services or OpenAI accounts"
    )
    print(f"Source: {source}")
    for scope in scopes:
        state = "assign" if scope in missing else "already assigned"
        print(f"  {scope} ({state})")
    if role is None:
        print(f"Role definition: create {role_name}")
    elif added_scopes:
        print(f"Role definition: add assignable scopes {', '.join(added_scopes)}")
    else:
        print("Role definition: unchanged")

    if not apply:
        print("Preview only. Run with --apply to add the missing role and assignments.")
        return

    if role is None:
        new_role = cli_role_from_template(template, [f"/subscriptions/{sub}" for sub in subscriptions])
        role = write_role(new_role, "create")
    elif added_scopes:
        updated_role = dict(role)
        updated_role["assignableScopes"] = [*current_scopes, *added_scopes]
        role = write_role(updated_role, "update")
    if role is None:
        raise AzureCliError("Foundry role definition was not returned")
    check_role_permissions(role, template)
    updated_scopes = {scope.lower() for scope in role.get("assignableScopes") or []}
    if root_scope not in updated_scopes and any(
        f"/subscriptions/{sub}" not in updated_scopes for sub in subscriptions
    ):
        raise AzureCliError("Foundry role does not include every selected subscription as an assignable scope")
    for scope in missing:
        try:
            az(
                "role",
                "assignment",
                "create",
                "--role",
                role["name"],
                "--assignee-object-id",
                principal,
                "--assignee-principal-type",
                "ServicePrincipal",
                "--scope",
                scope,
            )
        except AzureCliError:
            if not has_assignment(principal, scope, role["name"]):
                raise
        if not has_assignment(principal, scope, role["name"]):
            raise AzureCliError(f"Foundry role assignment was not found at {scope}")
    print(f"Applied {len(missing)} new Foundry subscription assignment(s).")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Create or update the role and add missing assignments")
    parser.add_argument("--principal-object-id", help="Collector enterprise application object ID")
    args = parser.parse_args()
    try:
        sync(args.apply, args.principal_object_id)
    except (AzureCliError, ValueError, KeyError) as exc:
        print(f"[foundry-role-sync] ERROR: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
