// Edge links are kept as data so the table rows are generated automatically.
export const traversableADEdges = [
  { name: "AbuseTGTDelegation", href: "/resources/edges/abuse-tgt-delegation" },
  { name: "ADCSESC1", href: "/resources/edges/adcs-esc1" },
  { name: "ADCSESC10a", href: "/resources/edges/adcs-esc10a" },
  { name: "ADCSESC10b", href: "/resources/edges/adcs-esc10b" },
  { name: "ADCSESC13", href: "/resources/edges/adcs-esc13" },
  { name: "ADCSESC3", href: "/resources/edges/adcs-esc3" },
  { name: "ADCSESC4", href: "/resources/edges/adcs-esc4" },
  { name: "ADCSESC6a", href: "/resources/edges/adcs-esc6a" },
  { name: "ADCSESC6b", href: "/resources/edges/adcs-esc6b" },
  { name: "ADCSESC9a", href: "/resources/edges/adcs-esc9a" },
  { name: "ADCSESC9b", href: "/resources/edges/adcs-esc9b" },
  { name: "AddAllowedToAct", href: "/resources/edges/add-allowed-to-act" },
  { name: "AddKeyCredentialLink", href: "/resources/edges/add-key-credential-link" },
  { name: "AddMember", href: "/resources/edges/add-member" },
  { name: "AddSelf", href: "/resources/edges/add-self" },
  { name: "AdminTo", href: "/resources/edges/admin-to" },
  { name: "AllExtendedRights", href: "/resources/edges/all-extended-rights" },
  { name: "AllowedToAct", href: "/resources/edges/allowed-to-act" },
  { name: "AllowedToDelegate", href: "/resources/edges/allowed-to-delegate" },
  { name: "CanPSRemote", href: "/resources/edges/can-ps-remote" },
  { name: "CanRDP", href: "/resources/edges/can-rdp" },
  { name: "ClaimSpecialIdentity", href: "/resources/edges/claim-special-identity" },
  { name: "CoerceAndRelayNTLMToADCS", href: "/resources/edges/coerce-and-relay-ntlm-to-adcs" },
  { name: "CoerceAndRelayNTLMToLDAP", href: "/resources/edges/coerce-and-relay-ntlm-to-ldap" },
  { name: "CoerceAndRelayNTLMToLDAPS", href: "/resources/edges/coerce-and-relay-ntlm-to-ldaps" },
  { name: "CoerceAndRelayNTLMToSMB", href: "/resources/edges/coerce-and-relay-ntlm-to-smb" },
  { name: "CoerceToTGT", href: "/resources/edges/coerce-to-tgt" },
  { name: "Contains", href: "/resources/edges/contains" },
  { name: "CrossForestTrust", href: "/resources/edges/cross-forest-trust" },
  { name: "DCFor", href: "/resources/edges/dc-for" },
  { name: "DCSync", href: "/resources/edges/dc-sync" },
  { name: "DumpSMSAPassword", href: "/resources/edges/dump-smsa-password" },
  { name: "ExecuteDCOM", href: "/resources/edges/execute-dcom" },
  { name: "ForceChangePassword", href: "/resources/edges/force-change-password" },
  { name: "GenericAll", href: "/resources/edges/generic-all" },
  { name: "GenericWrite", href: "/resources/edges/generic-write" },
  { name: "GoldenCert", href: "/resources/edges/golden-cert" },
  { name: "GPLink", href: "/resources/edges/gp-link" },
  { name: "HasSIDHistory", href: "/resources/edges/has-sid-history" },
  { name: "HasSession", href: "/resources/edges/has-session" },
  { name: "HasTrustKeys", href: "/resources/edges/has-trust-keys" },
  { name: "ManageCA", href: "/resources/edges/manage-ca" },
  { name: "ManageCertificates", href: "/resources/edges/manage-certificates" },
  { name: "MemberOf", href: "/resources/edges/member-of" },
  { name: "Owns", href: "/resources/edges/owns" },
  { name: "OwnsLimitedRights", href: "/resources/edges/owns-limited-rights" },
  { name: "ReadGMSAPassword", href: "/resources/edges/read-gmsa-password" },
  { name: "ReadLAPSPassword", href: "/resources/edges/read-laps-password" },
  { name: "SameForestTrust", href: "/resources/edges/same-forest-trust" },
  { name: "SpoofSIDHistory", href: "/resources/edges/spoof-sid-history" },
  { name: "ServerIs", href: "/resources/edges/server-is" },
  { name: "SyncedToADUser", href: "/resources/edges/synced-to-ad-user" },
  { name: "SQLAdmin", href: "/resources/edges/sql-admin" },
  { name: "SyncedToEntraUser", href: "/resources/edges/synced-to-entra-user" },
  { name: "SyncLAPSPassword", href: "/resources/edges/sync-laps-password" },
  { name: "WriteAccountRestrictions", href: "/resources/edges/write-account-restrictions" },
  { name: "WriteAltSecurityIdentities", href: "/resources/edges/write-alt-security-identities" },
  { name: "WriteDacl", href: "/resources/edges/write-dacl" },
  { name: "WriteGPLink", href: "/resources/edges/write-gp-link" },
  { name: "WriteOwner", href: "/resources/edges/write-owner" },
  { name: "WriteOwnerLimitedRights", href: "/resources/edges/write-owner-limited-rights" },
  { name: "WritePublicInformation", href: "/resources/edges/write-public-information" },
  { name: "WriteSPN", href: "/resources/edges/write-spn" },
  { name: "ADCSESC16", href: "/resources/edges/adcs-esc16" },
  { name: "CoerceAndRelayNTLMToADCSRPC", href: "/resources/edges/coerce-and-relay-ntlm-to-adcs-rpc" },
];

export const traversableAzureEdges = [
  { name: "AZGetSecrets", href: "/resources/edges/az-get-secrets" },
  { name: "AZNodeResourceGroup", href: "/resources/edges/az-node-resource-group" },
  { name: "AZAddMembers", href: "/resources/edges/az-add-members" },
  { name: "AZGlobalAdmin", href: "/resources/edges/az-global-admin" },
  { name: "AZOwner", href: "/resources/edges/az-owner" },
  { name: "AZAddOwner", href: "/resources/edges/az-add-owner" },
  { name: "AZHasRole", href: "/resources/edges/az-has-role" },
  { name: "AZOwns", href: "/resources/edges/az-owns" },
  { name: "AZAddSecret", href: "/resources/edges/az-add-secret" },
  { name: "AZKeyVaultContributor", href: "/resources/edges/az-key-vault-contributor" },
  { name: "AZPrivilegedAuthAdmin", href: "/resources/edges/az-privileged-auth-admin" },
  { name: "AZAppAdmin", href: "/resources/edges/az-app-admin" },
  { name: "AZLogicAppContributor", href: "/resources/edges/az-logic-app-contributor" },
  { name: "AZPrivilegedRoleAdmin", href: "/resources/edges/az-privileged-role-admin" },
  { name: "AZAutomationContributor", href: "/resources/edges/az-automation-contributor" },
  { name: "AZMGAddMember", href: "/resources/edges/az-mg-add-member" },
  { name: "AZResetPassword", href: "/resources/edges/az-reset-password" },
  { name: "AZAvereContributor", href: "/resources/edges/az-avere-contributor" },
  { name: "AZMGAddOwner", href: "/resources/edges/az-mg-add-owner" },
  { name: "AZRunsAs", href: "/resources/edges/az-runs-as" },
  { name: "AZCloudAppAdmin", href: "/resources/edges/az-cloud-app-admin" },
  { name: "AZMGAddSecret", href: "/resources/edges/az-mg-add-secret" },
  { name: "AZUserAccessAdministrator", href: "/resources/edges/az-user-access-administrator" },
  { name: "AZContains", href: "/resources/edges/az-contains" },
  { name: "AZMGGrantAppRoles", href: "/resources/edges/az-mg-grant-app-roles" },
  { name: "AZVMAdminLogin", href: "/resources/edges/az-vm-admin-login" },
  { name: "AZContributor", href: "/resources/edges/az-contributor" },
  { name: "AZMGGrantRole", href: "/resources/edges/az-mg-grant-role" },
  { name: "AZVMContributor", href: "/resources/edges/az-vm-contributor" },
  { name: "AZExecuteCommand", href: "/resources/edges/az-execute-command" },
  { name: "AZManagedIdentity", href: "/resources/edges/az-managed-identity" },
  { name: "AZWebsiteContributor", href: "/resources/edges/az-website-contributor" },
  { name: "AZGetCertificates", href: "/resources/edges/az-get-certificates" },
  { name: "AZMemberOf", href: "/resources/edges/az-member-of" },
  { name: "SyncedToADUser", href: "/resources/edges/synced-to-ad-user" },
  { name: "AZGetKeys", href: "/resources/edges/az-get-keys" },
];

export const nonTraversableADEdges = [
  { name: "DelegatedEnrollmentAgent", href: "/resources/edges/delegated-enrollment-agent" },
  { name: "Enroll", href: "/resources/edges/enroll" },
  { name: "EnrollOnBehalfOf", href: "/resources/edges/enroll-on-behalf-of" },
  { name: "EnterpriseCAFor", href: "/resources/edges/enterprise-ca-for" },
  { name: "ExtendedByPolicy", href: "/resources/edges/extended-by-policy" },
  { name: "GetChanges", href: "/resources/edges/get-changes" },
  { name: "GetChangesAll", href: "/resources/edges/get-changes-all" },
  { name: "GetChangesInFilteredSet", href: "/resources/edges/get-changes-in-filtered-set" },
  { name: "HostsCAService", href: "/resources/edges/hosts-ca-service" },
  { name: "IssuedSignedBy", href: "/resources/edges/issued-signed-by" },
  { name: "LocalToComputer", href: "/resources/edges/local-to-computer" },
  { name: "MemberOfLocalGroup", href: "/resources/edges/member-of-local-group" },
  { name: "MemberOfZone", href: "/resources/edges/member-of-zone" },
  { name: "NTAuthStoreFor", href: "/resources/edges/nt-auth-store-for" },
  { name: "OIDGroupLink", href: "/resources/edges/oid-group-link" },
  { name: "OwnsRaw", href: "/resources/edges/owns-raw" },
  { name: "ProtectAdminGroups", href: "/resources/edges/protect-admin-groups" },
  { name: "PublishedTo", href: "/resources/edges/published-to" },
  { name: "RemoteInteractiveLogonRight", href: "/resources/edges/remote-interactive-logon-right" },
  { name: "RootCAFor", href: "/resources/edges/root-ca-for" },
  { name: "TrustedForNTAuth", href: "/resources/edges/trusted-for-nt-auth" },
  { name: "WriteOwnerRaw", href: "/resources/edges/write-owner-raw" },
  { name: "WritePKIEnrollmentFlag", href: "/resources/edges/write-pki-enrollment-flag" },
  { name: "WritePKINameFlag", href: "/resources/edges/write-pki-name-flag" },
];

export const nonTraversableAzureEdges = [
  { name: "AZMGAppRoleAssignment_ReadWrite_All", href: "/resources/edges/az-mg-app-role-assignment-readwrite-all" },
  { name: "AZMGGroup_ReadWrite_All", href: "/resources/edges/az-mg-group-readwrite-all" },
  { name: "AZMGApplication_ReadWrite_All", href: "/resources/edges/az-mg-application-readwrite-all" },
  { name: "AZMGRoleManagement_ReadWrite_Directory", href: "/resources/edges/az-mg-role-management-readwrite-directory" },
  { name: "AZMGDirectory_ReadWrite_All", href: "/resources/edges/az-mg-directory-readwrite-all" },
  { name: "AZMGServicePrincipalEndpoint_ReadWrite_All", href: "/resources/edges/az-mg-service-principal-endpoint-readwrite-all" },
  { name: "AZMGGroupMember_ReadWrite_All", href: "/resources/edges/az-mg-group-member-readwrite-all" },
];

export const EdgeTypeTable = ({ edges, label, columns = 3 }) => {
  const rows = [];
  for (let index = 0; index < edges.length; index += columns) {
    rows.push(edges.slice(index, index + columns));
  }

  return (
    <table aria-label={label}>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`${label}-${rowIndex}`}>
            {row.map((edge) => (
              <td key={edge.href}>
                <a href={edge.href}>{edge.name}</a>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EdgeTypeTable;
