// Must use arrow function syntax in Mintlify snippets

export const OpenGraphLibrary = () => {
const libraryCategories = [
  {
    name: '1Password',
    icon: { type: 'onepassword', label: '1P' },
    extensions: [
      {
        name: '1PassHound',
        maintainer: 'specterops',
        vendor: '1Password',
        description:
          'Collects 1Password for Business access-control data and converts vault, item, group, and user relationships into OpenGraph data for BloodHound analysis.',
        href: 'https://github.com/SpecterOps/1PassHound',
      },
    ],
  },
  {
    name: 'Ansible',
    icon: { type: 'ansible', label: 'A' },
    extensions: [
      {
        name: 'AnsibleHound',
        maintainer: 'community',
        vendor: 'Ansible',
        description:
          'Maps Ansible AWX and Tower organization structure and permissions into a BloodHound-compatible attack-path graph.',
        href: 'https://github.com/TheSleekBoyCompany/AnsibleHound',
      },
    ],
  },
  {
    name: 'Active Directory',
    icon: { type: 'microsoft', label: 'AD' },
    extensions: [
      {
        name: 'ADAttributeHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Exports selected Active Directory custom attributes as OpenGraph node properties so BloodHound can enrich or create nodes with additional directory context.',
        href: 'https://github.com/martinsohn/ADAttributeHound',
      },
      {
        name: 'ManagerOfHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Collects manager-subordinate relationships from Active Directory and exports them as custom ManagerOf edges for BloodHound ingestion.',
        href: 'https://github.com/martinsohn/ManagerOfHound',
      },
      {
        name: 'GhostHound',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Enumerates Active Directory tombstones and reanimation rights, then emits OpenGraph data that highlights deleted-object restoration attack paths.',
        href: 'https://github.com/JVBotelho/ghosthound',
      },
      {
        name: 'ProfileHound',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Finds user profiles on domain machines and creates HasUserProfile edges that help operators decide which systems to target for credential access.',
        href: 'https://github.com/m4lwhere/profilehound',
      },
      {
        name: 'WinSSHound',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Maps lateral movement paths through misconfigured native and third-party SSH servers in Active Directory environments.',
        href: 'https://github.com/1r0BIT/WinSSHound',
      },
    ],
  },
  {
    name: 'Amazon Web Services',
    icon: { type: 'aws', label: 'AWS' },
    extensions: [
      {
        name: 'IAMhounddog',
        maintainer: 'community',
        vendor: 'AWS',
        description:
          'Creates OpenGraph-compatible IAM-to-resource models for identifying privileged principals and second-order escalation opportunities in AWS environments.',
        href: 'https://github.com/VirtueSecurity/IAMhounddog',
      },
    ],
  },
  {
    name: 'Atlassian',
    icon: { type: 'atlassian', label: 'A' },
    extensions: [
      {
        name: 'AtlassianHound',
        maintainer: 'specterops',
        vendor: 'Atlassian',
        description:
          'Collects foundational Jira and Confluence access data and exports it to BloodHound OpenGraph format for Atlassian Cloud and tested deployment paths.',
        href: 'https://github.com/werdhaihai/AtlassianHound',
      },
    ],
  },
  {
    name: 'Cisco Duo Security',
    icon: { type: 'cisco', label: 'DUO' },
    extensions: [
      {
        name: 'DuoHound',
        maintainer: 'specterops',
        vendor: 'Cisco',
        description:
          'Extracts Duo Admin API data into OpenGraph so teams can analyze MFA relationships, application access, and enrollment coverage in BloodHound.',
        href: 'https://github.com/julian1j/DuoHound',
      },
    ],
  },
  {
    name: 'Credentials',
    icon: { type: 'key', label: 'KEY' },
    extensions: [
      {
        name: 'AIHound',
        maintainer: 'community',
        vendor: 'Netwrix',
        description:
          'Exports AI credential and secret scanning results as OpenGraph JSON so BloodHound can visualize attack paths across AI tools and datastores.',
        href: 'https://github.com/netwrix/AIHound',
      },
      {
        name: 'SecretHound',
        maintainer: 'specterops',
        vendor: 'Secrets',
        description:
          'Converts secret scanning results from tools like GitHub Secret Scanning, NoseyParker, TruffleHog, and Nemesis into BloodHound OpenGraph data.',
        href: 'https://github.com/C0KERNEL/SecretHound',
      },
    ],
  },
  {
    name: 'CyberArk',
    icon: { type: 'cyberark', label: 'CyberArk' },
    extensions: [
      {
        name: 'CyberArkHound',
        maintainer: 'community',
        vendor: 'CyberArk',
        description:
          'Exports CyberArk PVWA users, groups, safes, accounts, and permissions into BloodHound-compatible OpenGraph JSON for attack-path analysis.',
        href: 'https://github.com/jazofra/CyberArkHound/tree/main',
      },
    ],
  },
  {
    name: 'DevOps',
    icon: { type: 'devops', label: 'DO' },
    extensions: [
      {
        name: 'Dop2Mop',
        maintainer: 'community',
        vendor: 'DevOps',
        description:
          'Maps attack paths from DevOps to MLOps infrastructure across GitHub, Azure DevOps, Azure ML, and AWS SageMaker.',
        href: 'https://github.com/h4wkst3r/Dop2Mop',
      },
    ],
  },
  {
    name: 'Entra ID',
    icon: { type: 'microsoft', label: 'ID' },
    extensions: [
      {
        name: 'EntraAuthPolicyHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Demonstrates collection of Entra ID permissions related to Temporary Access Passes and passkeys, then exports the results as BloodHound OpenGraph data.',
        href: 'https://github.com/MichaelGrafnetter/EntraAuthPolicyHound',
      },
      {
        name: 'EntraSSSOHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Models Entra ID Seamless SSO trust paths that can allow Active Directory computers to affect synced Entra ID users.',
        href: 'https://github.com/SpecterOps/EntraSSSOHound',
      },
    ],
  },
  {
    name: 'FreeIPA',
    icon: { type: 'freeipa', label: 'IPA' },
    extensions: [
      {
        name: 'IDMHound',
        maintainer: 'community',
        vendor: 'FreeIPA',
        description:
          'Collects FreeIPA and Red Hat Identity Management users, groups, domains, computers, HBAC rules, sudoer rights, and group memberships.',
        href: 'https://github.com/lvruibr/idmhound',
      },
    ],
  },
  {
    name: 'GitHub',
    icon: { type: 'github', label: 'GH' },
    extensions: [
      {
        name: 'GitHound',
        maintainer: 'specterops',
        vendor: 'GitHub',
        description:
          'Collects GitHub organization structure and permissions into a navigable OpenGraph attack-path model compatible with the SpecterOps GitHub extension.',
        href: 'https://github.com/SpecterOps/GitHound',
      },
      {
        name: 'openhound-github',
        maintainer: 'specterops',
        vendor: 'GitHub',
        description:
          'Collects resources from GitHub organizations and transforms them into usable nodes and edges for BloodHound through OpenHound.',
        href: 'https://github.com/SpecterOps/openhound-github',
      },
      {
        name: 'GitHoundPy',
        maintainer: 'community',
        vendor: 'GitHub',
        description:
          'Provides a Python implementation of GitHound that aims to stay in sync with the main PowerShell collector.',
        href: 'https://github.com/CorvraLabs/GitHoundPy',
      },
    ],
  },
  {
    name: 'GitLab',
    icon: { type: 'gitlab', label: 'GL' },
    extensions: [
      {
        name: 'GitLabHound',
        maintainer: 'community',
        vendor: 'GitLab',
        description:
          'Generates a GitLab attack-path graph covering users, groups, roles, repositories, CI/CD resources, SSO identities, OIDC trust paths, and leaked secrets.',
        href: 'https://github.com/CompassSecurity/GitLabHound',
      },
    ],
  },
  {
    name: 'Google Cloud Platform',
    icon: { type: 'gcp', label: 'GCP' },
    extensions: [
      {
        name: 'GCP-Hound',
        maintainer: 'community',
        vendor: 'Google Cloud',
        description:
          'Transforms Google Cloud IAM relationships into interactive BloodHound attack graphs for security enumeration and privilege escalation discovery.',
        href: 'https://github.com/F41zK4r1m/GCP-Hound',
      },
      {
        name: 'GCPwn',
        maintainer: 'community',
        vendor: 'Google Cloud',
        description:
          'Collects Google Cloud data for credential handling, service enumeration, artifact collection, and OpenGraph attack-path analysis.',
        href: 'https://github.com/NetSPI/gcpwn',
      },
    ],
  },
  {
    name: 'Jamf',
    icon: { type: 'jamf', label: 'J' },
    extensions: [
      {
        name: 'JamfHound',
        maintainer: 'specterops',
        vendor: 'Jamf',
        description:
          'Collects Jamf Pro tenant data and identifies attack paths based on object permissions, saved as JSON for BloodHound ingestion.',
        href: 'https://github.com/SpecterOps/jamfhound',
      },
      {
        name: 'openhound-jamf',
        maintainer: 'specterops',
        vendor: 'Jamf',
        description:
          'Collects Jamf Pro resources and transforms them into usable nodes and edges for BloodHound through OpenHound.',
        href: 'https://github.com/SpecterOps/openhound-jamf',
      },
    ],
  },
  {
    name: 'Kubernetes',
    icon: { type: 'kubernetes', label: 'K8S' },
    extensions: [
      {
        name: 'Bloodhound-Kube',
        maintainer: 'community',
        vendor: 'Kubernetes',
        description:
          'Collects Kubernetes and OpenShift topology, RBAC, and common custom resources to visualize multi-step attack paths through large-scale clusters.',
        href: 'https://github.com/HackinAhab/bloodhound-kube',
      },
      {
        name: 'ClusterHound',
        maintainer: 'community',
        vendor: 'Kubernetes',
        description:
          'Collects cluster topology and RBAC configuration with kubectl and outputs OpenGraph JSON for Kubernetes attack-path analysis.',
        href: 'https://github.com/dovesec/ClusterHound',
      },
    ],
  },
  {
    name: 'Linux',
    icon: { type: 'linux', label: 'LX' },
    extensions: [
      {
        name: 'GoLinHound',
        maintainer: 'community',
        vendor: 'Linux',
        description:
          'Discovers Linux and SSH attack paths, including local privilege escalation, SSH key and certificate authentication, and identity connections.',
        href: 'https://github.com/RantaSec/golinhound',
      },
    ],
  },
  {
    name: 'Microsoft Exchange',
    icon: { type: 'microsoft', label: 'EX' },
    extensions: [
      {
        name: 'ExchangeHound',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Models Exchange on-premises objects and relationships, including mailbox delegation, folder access, transport rules, and Exchange RBAC assignments.',
        href: 'https://github.com/FilipPwn/exchangehound',
      },
    ],
  },
  {
    name: 'MSSQL',
    icon: { type: 'microsoft', label: 'SQL' },
    extensions: [
      {
        name: 'MSSQLHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Collects BloodHound OpenGraph-compatible data from one or more MSSQL servers and packages the output for ingestion.',
        href: 'https://github.com/SpecterOps/MSSQLHound',
      },
    ],
  },
  {
    name: 'Network',
    icon: { type: 'network', label: 'NET' },
    extensions: [
      {
        name: 'NetworkHound',
        maintainer: 'community',
        vendor: 'Network',
        description:
          'Discovers computer objects, resolves hostnames, scans ports and HTTP services, identifies shadow IT, and builds OpenGraph network topology data.',
        href: 'https://github.com/mordavid/NetworkHound',
      },
    ],
  },
  {
    name: 'Okta',
    icon: { type: 'okta', label: 'O' },
    extensions: [
      {
        name: 'OktaHound',
        maintainer: 'specterops',
        vendor: 'Okta',
        description:
          'Collects Okta users, groups, applications, roles, and related entities for analysis with the SpecterOps Okta OpenGraph extension.',
        href: 'https://github.com/SpecterOps/OktaHound',
      },
      {
        name: 'openhound-okta',
        maintainer: 'specterops',
        vendor: 'Okta',
        description:
          'Collects Okta resources and transforms them into usable nodes and edges for BloodHound through OpenHound.',
        href: 'https://github.com/SpecterOps/openhound-okta',
      },
    ],
  },
  {
    name: 'Oracle Cloud Infrastructure',
    icon: { type: 'oracle', label: 'OCI' },
    extensions: [
      {
        name: 'OCInferno',
        maintainer: 'community',
        vendor: 'Oracle',
        description:
          'Collects OCI data for credential handling, service enumeration, artifact download, and OpenGraph privilege-escalation path analysis.',
        href: 'https://github.com/NetSPI/ocinferno',
      },
    ],
  },
  {
    name: 'Ping',
    icon: { type: 'ping', label: 'P' },
    extensions: [
      {
        name: 'PingOneHound',
        maintainer: 'specterops',
        vendor: 'Ping Identity',
        description:
          'Collects PingOne identity provider data needed to identify, analyze, execute, and audit PingOne attack paths and object-level permissions.',
        href: 'https://github.com/andyrobbins/PingOneHound',
      },
    ],
  },
  {
    name: 'Resource Access Control Facility',
    icon: { type: 'mainframe', label: 'RACF' },
    extensions: [
      {
        name: 'RacfHound',
        maintainer: 'community',
        vendor: 'IBM z/OS',
        description:
          'Collects RACF database data over SSH for supported z/OS classes without requiring an IRRDBU00 dump.',
        href: 'https://github.com/4-L3X/racfhound',
      },
    ],
  },
  {
    name: 'runZero',
    icon: { type: 'runzero', label: 'rZ' },
    extensions: [
      {
        name: 'runZeroHound',
        maintainer: 'community',
        vendor: 'runZero',
        description:
          'Brings runZero Exposure Management data into BloodHound through OpenGraph.',
        href: 'https://github.com/runZeroInc/runZeroHound',
      },
    ],
  },
  {
    name: 'Salesforce',
    icon: { type: 'salesforce', label: 'SF' },
    extensions: [
      {
        name: 'ForceHound',
        maintainer: 'community',
        vendor: 'Salesforce',
        description:
          'Maps Salesforce identity, permission, and access-control structures into an OpenGraph attack-path graph for BloodHound Community Edition.',
        href: 'https://github.com/NetSPI/ForceHound',
      },
      {
        name: 'SFHound',
        maintainer: 'community',
        vendor: 'Salesforce',
        description:
          'Enumerates Salesforce users, profiles, permission sets, roles, groups, queues, connected apps, and object or field permissions.',
        href: 'https://github.com/Khadinxc/sfhound',
      },
    ],
  },
  {
    name: 'Snowflake',
    icon: { type: 'snowflake', label: 'SN' },
    extensions: [
      {
        name: 'SnowHound',
        maintainer: 'specterops',
        vendor: 'Snowflake',
        description:
          'Maps Snowflake users, databases, roles, warehouses, integrations, and related permissions for BloodHound attack-path analysis.',
        href: 'https://github.com/SpecterOps/SnowHound',
      },
    ],
  },
  {
    name: 'System Center',
    icon: { type: 'microsoft', label: 'SC' },
    extensions: [
      {
        name: 'ConfigManBearPig',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Adds Microsoft Configuration Manager and SCCM attack-path data to BloodHound through a PowerShell OpenGraph collector.',
        href: 'https://github.com/SpecterOps/ConfigManBearPig',
      },
      {
        name: 'SCCM_SQL_Collector',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Collects SCCM attack paths from an SCCM site database using a proof-of-concept SQL collection workflow.',
        href: 'https://github.com/G0ldenGunSec/SCCM_SQL_Collector',
      },
      {
        name: 'SCOMHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Enumerates System Center Operations Manager infrastructure from Active Directory and emits BloodHound OpenGraph data.',
        href: 'https://github.com/SpecterOps/SCOMHound',
      },
    ],
  },
  {
    name: 'Tailscale',
    icon: { type: 'tailscale', label: 'TS' },
    extensions: [
      {
        name: 'TailscaleHound',
        maintainer: 'specterops',
        vendor: 'Tailscale',
        description:
          'Collects tailnet users, devices, groups, tags, ACLs, grants, SSH rules, routes, app connectors, services, invites, and webhooks.',
        href: 'https://github.com/KingOfTheNOPs/TailscaleHound',
      },
    ],
  },
  {
    name: 'vCenter',
    icon: { type: 'vmware', label: 'vC' },
    extensions: [
      {
        name: 'vCenterHound',
        maintainer: 'community',
        vendor: 'vCenter',
        description:
          'Collects vCenter infrastructure entities, permissions, roles, users, groups, and assignments into a BloodHound-compatible JSON graph.',
        href: 'https://github.com/MorDavid/vCenterHound',
      },
    ],
  },
  {
    name: 'Windows',
    icon: { type: 'windows', label: 'WIN' },
    extensions: [
      {
        name: 'PrivHound',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Models Windows local privilege escalation vectors as multi-hop attack paths that can overlay existing SharpHound Active Directory data.',
        href: 'https://github.com/dazzyddos/PrivHound',
      },
      {
        name: 'ShareHound',
        maintainer: 'specterops',
        vendor: 'Microsoft',
        description:
          'Maps network shares, permissions, and paths at scale to help identify attack paths to network shares.',
        href: 'https://github.com/p0dalirius/sharehound',
      },
      {
        name: 'TaskHound',
        maintainer: 'community',
        vendor: 'Microsoft',
        description:
          'Hunts for Windows scheduled tasks that run with privileged accounts and stored credentials, then exports findings for BloodHound.',
        href: 'https://github.com/1r0BIT/TaskHound',
      },
    ],
  },
];

const nonAttackPathCategories = [
  {
    name: 'MITRE ATT&CK',
    icon: { type: 'mitre', label: 'ATT&CK' },
    extensions: [
      {
        name: 'BloodSOCer',
        maintainer: 'specterops',
        vendor: 'MITRE ATT&CK',
        description:
          'Aggregates threat intelligence from MITRE ATT&CK, Sigma rules, and Atomic Red Team into OpenGraph data for BloodHound visualization.',
        href: 'https://github.com/Scoubi/BloodSOCer',
      },
    ],
  },
];

const openGraphTools = [
  {
    name: 'OpenHound',
    maintainer: 'specterops',
    vendor: 'OpenGraph',
    description:
      'Provides a standardized collect-first, convert-later framework for building OpenGraph collectors and converters.',
    href: 'https://github.com/SpecterOps/OpenHound',
  },
  {
    name: 'bhopengraph',
    maintainer: 'specterops',
    vendor: 'Python',
    description:
      'Provides Python classes for creating and managing graph structures that conform to BloodHound OpenGraph schema expectations.',
    href: 'https://github.com/p0dalirius/bhopengraph',
  },
  {
    name: 'BloodHoundOperator',
    maintainer: 'specterops',
    vendor: 'PowerShell',
    description:
      'Provides a PowerShell client for BloodHound Community Edition and BloodHound Enterprise.',
    href: 'https://github.com/SadProcessor/BloodHoundOperator',
  },
  {
    name: 'BloodHound OpenGraph Helper Library',
    maintainer: 'community',
    vendor: 'Python',
    description:
      'Provides a Python library for creating BloodHound OpenGraph JSON data that conforms to the OpenGraph data payload schema.',
    href: 'https://github.com/rookuu/bloodhound-opengraph',
  },
  {
    name: 'gopengraph',
    maintainer: 'specterops',
    vendor: 'Go',
    description:
      'Provides Go types and helpers for creating and managing graph structures that are compatible with BloodHound OpenGraph.',
    href: 'https://github.com/TheManticoreProject/gopengraph',
  },
  {
    name: 'flashingestor',
    maintainer: 'community',
    vendor: 'Ingestion',
    description:
      'Provides a fast, customizable, BloodHound CE-compatible data ingestor with a terminal user interface and progress tracking.',
    href: 'https://github.com/Macmod/flashingestor',
  },
  {
    name: 'HoundTrainer',
    maintainer: 'community',
    vendor: 'Management',
    description:
      'Automates custom node type and Cypher query management in BloodHound through JSON schema handling and API interactions.',
    href: 'https://github.com/toneillcodes/HoundTrainer',
  },
  {
    name: 'ScrappyDoo',
    maintainer: 'specterops',
    vendor: 'Generator',
    description:
      'Provides a self-hosted web app for generating BloodHound OpenGraph-compatible JSON.',
    href: 'https://github.com/c0rdyc3ps/ScrappyDoo',
  },
];

const flattenExtensions = (categories) =>
  categories.reduce((items, category) => items.concat(category.extensions), []);

const categoryMap = libraryCategories.reduce((categories, category) => {
  categories[category.name] = category;
  return categories;
}, {});

const technologyGroups = [
  {
    name: 'Identity and Access',
    description: 'Identity providers, directory services, MFA, PAM, and access-control systems.',
    categories: [
      categoryMap['1Password'],
      categoryMap['Active Directory'],
      categoryMap['Atlassian'],
      categoryMap['Cisco Duo Security'],
      categoryMap['CyberArk'],
      categoryMap['Entra ID'],
      categoryMap['FreeIPA'],
      categoryMap['Okta'],
      categoryMap['Ping'],
    ],
  },
  {
    name: 'Microsoft Platform',
    description: 'Microsoft infrastructure, collaboration, database, endpoint, and management technologies.',
    categories: [
      categoryMap['Microsoft Exchange'],
      categoryMap['MSSQL'],
      categoryMap['System Center'],
      categoryMap['Windows'],
    ],
  },
  {
    name: 'Cloud Infrastructure',
    description: 'Cloud providers, Kubernetes environments, and cloud-adjacent infrastructure platforms.',
    categories: [
      categoryMap['Amazon Web Services'],
      categoryMap['Google Cloud Platform'],
      categoryMap['Kubernetes'],
      categoryMap['Oracle Cloud Infrastructure'],
    ],
  },
  {
    name: 'Developer and DevOps',
    description: 'Source control, automation, CI/CD, and DevOps-to-MLOps attack-path projects.',
    categories: [
      categoryMap['Ansible'],
      categoryMap['DevOps'],
      categoryMap['GitHub'],
      categoryMap['GitLab'],
    ],
  },
  {
    name: 'SaaS, Data, and Business Systems',
    description: 'Business applications, data platforms, endpoint management, and network access services.',
    categories: [
      categoryMap['Jamf'],
      categoryMap['Salesforce'],
      categoryMap['Snowflake'],
      categoryMap['Tailscale'],
      categoryMap['runZero'],
    ],
  },
  {
    name: 'Host, Network, and Legacy Systems',
    description: 'Operating systems, network discovery, virtualization, credentials, and mainframe access.',
    categories: [
      categoryMap['Credentials'],
      categoryMap['Linux'],
      categoryMap['Network'],
      categoryMap['Resource Access Control Facility'],
      categoryMap['vCenter'],
    ],
  },
].map((group) => ({
  ...group,
  categories: group.categories.filter(Boolean),
}));

const categoryExtensionCount = (categories) =>
  flattenExtensions(categories).length;

const MaintainerBadge = ({ maintainer }) => {
  const isSpecterOps = maintainer === 'specterops';

  return (
    <span
      className={`og-maintainer-badge ${
        isSpecterOps ? 'og-maintainer-so' : 'og-maintainer-community'
      }`}
      title={isSpecterOps ? 'SpecterOps-maintained community extension' : 'Community maintainer'}
    >
      <span aria-hidden="true">
        {isSpecterOps ? (
          <SO_Icon size={36} />
        ) : (
          <Icon icon="people-group" iconType="solid" color="currentColor" size={36} />
        )}
      </span>
    </span>
  );
};

const vendorIconMap = {
  onepassword: { src: '/assets/icons/vendor/onepassword.svg', wide: false },
  ansible: { src: '/assets/icons/vendor/ansible.svg', wide: false },
  microsoft: { src: '/assets/icons/vendor/microsoft.svg', wide: false },
  aws: { src: '/assets/icons/vendor/aws.svg', wide: true },
  atlassian: { src: '/assets/icons/vendor/atlassian.svg', wide: false },
  cisco: { src: '/assets/icons/vendor/cisco.svg', wide: false },
  cyberark: { src: '/assets/icons/vendor/cyberark.svg', wide: true },
  freeipa: { src: '/assets/icons/vendor/freeipa.svg', wide: false },
  github: { src: '/assets/icons/vendor/github.svg', wide: false },
  gitlab: { src: '/assets/icons/vendor/gitlab.svg', wide: true },
  gcp: { src: '/assets/icons/vendor/gcp.svg', wide: false },
  jamf: { src: '/assets/icons/vendor/jamf.svg', wide: false },
  kubernetes: { src: '/assets/icons/vendor/kubernetes.svg', wide: false },
  linux: { src: '/assets/icons/vendor/linux.svg', wide: false },
  okta: { src: '/assets/icons/vendor/okta.svg', wide: false },
  oracle: { src: '/assets/icons/vendor/oracle.svg', wide: true },
  ping: { src: '/assets/icons/vendor/ping.svg', wide: true },
  mainframe: { src: '/assets/icons/vendor/ibm.svg', wide: true },
  runzero: { src: '/assets/icons/vendor/runzero.svg', wide: true },
  salesforce: { src: '/assets/icons/vendor/salesforce.svg', wide: false },
  snowflake: { src: '/assets/icons/vendor/snowflake.svg', wide: false },
  tailscale: { src: '/assets/icons/vendor/tailscale.svg', wide: false },
  vmware: { src: '/assets/icons/vendor/vmware.svg', wide: true },
  windows: { src: '/assets/icons/vendor/windows.svg', wide: false },
  mitre: { src: '/assets/icons/vendor/mitre.svg', wide: true },
};

const CategoryIcon = ({ icon }) => {
  const vendorIcon = vendorIconMap[icon.type];

  if (vendorIcon) {
    return (
      <span
        className={`og-category-icon og-category-icon-image ${
          vendorIcon.wide ? 'og-category-icon-image-wide' : ''
        }`}
        aria-label={`${icon.label} category`}
      >
        <img src={vendorIcon.src} alt="" loading="lazy" />
      </span>
    );
  }

  if (icon.type === 'microsoft') {
    return (
      <span className="og-category-icon og-category-icon-microsoft" aria-label={`${icon.label} category`}>
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  if (icon.type === 'github') {
    return (
      <span className="og-category-icon og-category-icon-github" aria-label="GitHub category">
        <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
          <path d="M8 .2a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-.9-2.7-.9-.3-.8-.9-1-.9-1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.9 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.5.8 1.2.8 2.1 0 3-1.8 3.7-3.6 3.9.3.3.6.8.6 1.6v2.3c0 .2.1.5.6.4A8 8 0 0 0 8 .2Z" />
        </svg>
      </span>
    );
  }

  if (icon.type === 'key') {
    return (
      <span className="og-category-icon og-category-icon-key" aria-label="Credentials category">
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M8.2 14.4a5.4 5.4 0 1 1 4.1-4.1l8.7 8.7v3h-3v-2h-2v-2h-2l-5.8-5.6Zm-.8-3.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" />
        </svg>
      </span>
    );
  }

  if (icon.type === 'jamf') {
    return (
      <span className="og-category-icon og-category-icon-jamf" aria-label="Jamf category">
        <span />
        <span />
      </span>
    );
  }

  if (icon.type === 'okta') {
    return (
      <span className="og-category-icon og-category-icon-okta" aria-label="Okta category">
        <span />
      </span>
    );
  }

  return (
    <span
      className={`og-category-icon og-category-icon-${icon.type}`}
      aria-label={`${icon.label} category`}
    >
      <span>{icon.label}</span>
    </span>
  );
};

const ExtensionCard = ({ extension, compact = false }) => {
  const external = extension.href.startsWith('http');

  return (
    <a
      className={`og-extension-card ${compact ? 'og-extension-card-compact' : ''}`}
      href={extension.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <div className="og-extension-card-top">
        <div>
          <h3>{extension.name}</h3>
          <p className="og-extension-vendor">{extension.vendor}</p>
        </div>
        {extension.maintainer ? (
          <MaintainerBadge maintainer={extension.maintainer} />
        ) : (
          <CategoryIcon icon={extension.icon} />
        )}
      </div>
      <p className="og-extension-description">{extension.description}</p>
      <span className="og-extension-action">{extension.action || 'View on GitHub'}</span>
    </a>
  );
};

const LibrarySection = ({ title, eyebrow, description, count, children }) => {
  return (
    <section className="og-library-section">
      <div className="og-section-heading">
        <div>
          <p className="og-section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="og-section-count">{count}</span>
      </div>
      {children}
    </section>
  );
};

const LibraryHero = () => {
  return (
    <header className="og-library-hero">
      <div className="og-library-hero-copy">
        <a className="og-library-breadcrumb" href="/opengraph">
          OpenGraph
        </a>
        <h1>BloodHound Community Extensions</h1>
        <p>
          Explore extensions created by the community and SpecterOps that extend the coverage of BloodHound with OpenGraph.
        </p>
      </div>
    </header>
  );
};

const LibraryGuide = () => {
  return (
    <section className="og-library-guide" aria-label="OpenGraph Library contribution and icon guide">
      <img noZoom src="/assets/enterprise-AND-community-edition-pill-tag.svg" alt="Applies to BloodHound Enterprise and CE" />
      <p>
        Have you built a cool extension using OpenGraph and want to feature it on this page? Is your extension already in the list and you need to update something?
      </p>
      <p>
        Click the button below to open an issue in the BloodHound Docs repository on GitHub and someone from the team will review it and get back to you!
      </p>
      <div className="og-library-guide-actions">
        <a className="og-submit-link" href="https://github.com/SpecterOps/bloodhound-docs/issues/new?template=opengraph-library-change.md" target="_blank" rel="noopener noreferrer">
          Submit a library change
        </a>
      </div>
      <div className="og-library-legend" aria-label="Maintainer icon legend">
        <div className="og-library-legend-item">
          <MaintainerBadge maintainer="community" />
          <p>
            Community icons represent community extensions that leverage OpenGraph to extend BloodHound's coverage and capabilities.
          </p>
        </div>
        <div className="og-library-legend-item">
          <MaintainerBadge maintainer="specterops" />
          <p>
            SpecterOps icons represent SpecterOps extensions that can be used as-is or serve as examples and inspiration for your own OpenGraph extensions.
          </p>
        </div>
      </div>
      <Warning>
        <strong>Use linked code at your own risk.</strong><br/><br/>
        All code linked via this library is provided “as is,” without review, approval, or endorsement by SpecterOps, regardless of authorship. It has not been audited for accuracy, security, or fitness for any purpose.<br/><br/>
        Use at your own risk. You are solely responsible for testing, validating, and ensuring the code meets your requirements before use in any environment. SpecterOps is not responsible for any damages, losses, or security issues arising from the use of any linked code.
      </Warning>
    </section>
  );
};

const CategoryGroup = ({ category }) => {
  return (
    <section className="og-category-group" id={category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <div className="og-category-heading">
        <CategoryIcon icon={category.icon} />
        <div>
          <h3>{category.name}</h3>
          <p>
            {category.extensions.length}{' '}
            {category.extensions.length === 1 ? 'extension' : 'extensions'}
          </p>
        </div>
      </div>
      <div className="og-card-grid">
        {category.extensions.map((extension) => (
          <ExtensionCard key={extension.name} extension={extension} />
        ))}
      </div>
    </section>
  );
};

const TechnologyGroup = ({ group, defaultOpen = false }) => {
  const count = categoryExtensionCount(group.categories);

  return (
    <details className="og-technology-group" open={defaultOpen}>
      <summary className="og-technology-heading">
        <div>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
        <span className="og-technology-heading-meta">
          <span className="og-technology-count">
            {count} {count === 1 ? 'extension' : 'extensions'}
          </span>
          <span className="og-technology-chevron" aria-hidden="true" />
        </span>
      </summary>
      <div className="og-category-list">
        {group.categories.map((category) => (
          <CategoryGroup key={category.name} category={category} />
        ))}
      </div>
    </details>
  );
};

  const fullLibraryCount = categoryExtensionCount(libraryCategories);
  const nonAttackPathCount = categoryExtensionCount(nonAttackPathCategories);

  return (
    <div className="og-library">
      <LibraryHero />

      <LibraryGuide />

      <LibrarySection
        eyebrow="Attack-path projects"
        title="OpenGraph Library"
        description="Browse extensions by the technologies they collect from or model. Use the card badge to identify whether the listed project is SpecterOps-attributed or community-maintained."
        count={`${fullLibraryCount} extensions`}
      >
        <div className="og-technology-list">
          {technologyGroups.map((group, index) => (
            <TechnologyGroup key={group.name} group={group} defaultOpen={index === 0} />
          ))}
        </div>
      </LibrarySection>

      <LibrarySection
        eyebrow="Context and enrichment"
        title="Non-Attack Paths"
        description="These projects add context to BloodHound but are not primarily designed to create attack-path edges."
        count={`${nonAttackPathCount} project`}
      >
        <div className="og-category-list">
          {nonAttackPathCategories.map((category) => (
            <CategoryGroup key={category.name} category={category} />
          ))}
        </div>
      </LibrarySection>

      <LibrarySection
        eyebrow="Build and manage OpenGraph"
        title="OpenGraph Tools"
        description="Use these libraries and utilities to generate, validate, ingest, or manage OpenGraph data for BloodHound."
        count={`${openGraphTools.length} tools`}
      >
        <div className="og-card-grid">
          {openGraphTools.map((extension) => (
            <ExtensionCard key={extension.name} extension={extension} compact />
          ))}
        </div>
      </LibrarySection>

      <style jsx>{`
        .og-library {
          --og-primary: var(--color-primary, #2c2677);
          --og-primary-hover: #241f63;
          --og-primary-light: var(--color-primary-light, #5465ff);
          --og-text: #292524;
          --og-title: #292524;
          --og-muted: #57534e;
          --og-muted-soft: #78716c;
          --og-card-bg: #fff;
          --og-border: rgba(12, 10, 9, 0.1);
          --og-callout-bg: #fff7ed;
          --og-callout-border: #fed7aa;
          --og-callout-text: #9a3412;
          --og-focus-ring: rgba(44, 38, 119, 0.24);
          color: var(--og-text);
        }

        .og-library :global(a) {
          text-decoration: none;
        }

        .og-library-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 1rem;
          align-items: end;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
        }

        .og-library-hero img {
          grid-column: 1 / -1;
          width: 204px;
          height: auto;
          margin: 0 0 0.25rem;
        }

        .og-library-hero-copy h1 {
          margin: 0;
          color: var(--og-title);
          font-size: 36px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0;
        }

        .og-library-breadcrumb {
          display: inline-flex;
          margin-bottom: 0.5rem;
          color: var(--og-primary-light);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
        }

        .og-library-hero-copy p,
        .og-section-heading p,
        .og-category-heading p,
        .og-extension-vendor,
        .og-extension-description {
          color: var(--og-muted);
        }

        .og-library-hero-copy p {
          max-width: 48rem;
          margin: 0.55rem 0 0;
          font-size: 18px;
          line-height: 1.55;
        }

        .og-submit-link,
        .og-extension-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.4rem;
          border-radius: 999px;
          background: var(--og-primary);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
        }

        .og-submit-link {
          padding: 0 1.1rem;
          white-space: nowrap;
        }

        .og-submit-link:focus-visible,
        .og-extension-card:focus-visible {
          outline: 2px solid var(--og-focus-ring);
          outline-offset: 2px;
        }

        .og-library-section {
          margin: 0 0 2.4rem;
        }

        .og-library-guide {
          display: grid;
          gap: 1rem;
          margin: 1.5rem 0 2.4rem;
        }

        .og-library-guide > p {
          max-width: 58rem;
          margin: 0;
          color: var(--og-muted);
          font-size: 1rem;
          line-height: 1.55;
        }

        .og-library-guide-actions {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .og-library-legend {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.8rem;
        }

        .og-library-legend-item {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 0.75rem;
          align-items: start;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.85rem;
          background: rgba(120, 113, 108, 0.06);
        }

        .og-library-legend-item p {
          margin: 0;
          color: var(--og-muted);
          font-size: 0.925rem;
          line-height: 1.45;
        }

        .og-section-heading {
          display: flex;
          justify-content: space-between;
          gap: 1.2rem;
          align-items: end;
          margin-bottom: 1rem;
        }

        .og-section-heading h2 {
          margin: 0;
          color: var(--og-title);
          font-size: 1.5rem;
          line-height: 1.25;
          font-weight: 700;
          letter-spacing: 0;
        }

        .og-section-heading p {
          max-width: 58rem;
          margin: 0.35rem 0 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        .og-section-eyebrow {
          margin: 0 0 0.25rem;
          color: var(--og-primary);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .og-section-count {
          flex: 0 0 auto;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.6rem;
          color: var(--og-muted-soft);
          font-size: 0.875rem;
          font-weight: 500;
          background: var(--og-card-bg);
        }

        .og-card-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .og-extension-card {
          display: flex;
          min-height: 16.75rem;
          flex-direction: column;
          gap: 0.75rem;
          border: 1px solid var(--og-border);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          background: var(--og-card-bg);
          color: inherit;
          font-weight: 400;
          transition: border-color 160ms ease;
        }

        .og-extension-card-compact {
          min-height: 14.25rem;
        }

        .og-extension-card:hover {
          border-color: var(--og-primary);
        }

        .og-extension-card:hover .og-extension-action,
        .og-submit-link:hover {
          background: var(--og-primary-hover);
          color: #fff;
        }

        .og-extension-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .og-extension-card h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          letter-spacing: 0;
        }

        .og-extension-vendor {
          margin: 0.25rem 0 0;
          font-size: 0.875rem;
          line-height: 1.25;
        }

        .og-extension-description {
          margin: 0;
          line-height: 1.5;
          font-size: 1rem;
        }

        .og-extension-action {
          width: 100%;
          margin-top: auto;
          padding: 0 1rem;
        }

        .og-maintainer-badge {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 0.4rem;
          min-height: 2.75rem;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.55rem;
          background: var(--og-card-bg);
          color: var(--og-muted-soft);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .og-maintainer-badge > span:first-child {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 50%;
          color: var(--og-title);
          font-size: 0.68rem;
          line-height: 1;
        }

        .og-maintainer-so > span:first-child {
          --brand-green: #02b36c;
          --brand-light: var(--og-text);
        }

        .og-maintainer-so :global(svg),
        .og-maintainer-community :global(svg) {
          width: 0.95rem;
          height: 0.95rem;
        }

        .og-category-list {
          display: grid;
          gap: 1.2rem;
        }

        .og-technology-list {
          display: grid;
          gap: 2rem;
        }

        .og-technology-group {
          scroll-margin-top: 6rem;
          border-bottom: 1px solid var(--og-border);
          padding-bottom: 0.85rem;
        }

        .og-technology-heading {
          display: flex;
          justify-content: space-between;
          gap: 1.2rem;
          align-items: start;
          cursor: pointer;
          list-style: none;
        }

        .og-technology-heading::-webkit-details-marker {
          display: none;
        }

        .og-technology-heading h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1.18rem;
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: 0;
        }

        .og-technology-heading p {
          max-width: 48rem;
          margin: 0.25rem 0 0;
          color: var(--og-muted);
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .og-technology-heading-meta {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 0.65rem;
        }

        .og-technology-count {
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.6rem;
          color: var(--og-muted-soft);
          font-size: 0.875rem;
          font-weight: 500;
          background: var(--og-card-bg);
        }

        .og-technology-chevron {
          display: inline-flex;
          width: 0.72rem;
          height: 0.72rem;
          border-right: 2px solid var(--og-muted-soft);
          border-bottom: 2px solid var(--og-muted-soft);
          transform: rotate(45deg);
          transition: transform 160ms ease;
          margin-top: 0.35rem;
        }

        .og-technology-group[open] .og-technology-chevron {
          transform: rotate(225deg);
          margin-top: 0.7rem;
        }

        .og-technology-group > .og-category-list {
          margin-top: 1rem;
        }

        .og-category-group {
          scroll-margin-top: 6rem;
        }

        .og-category-heading {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.75rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--og-border);
        }

        .og-category-heading h3 {
          margin: 0;
          color: var(--og-title);
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          letter-spacing: 0;
        }

        .og-category-heading p {
          margin: 0.15rem 0 0;
          font-size: 0.875rem;
        }

        .og-category-icon {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border: 1px solid var(--og-border);
          border-radius: 0.5rem;
          background: var(--og-card-bg);
          color: var(--og-title);
          overflow: hidden;
        }

        .og-category-icon > span {
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0;
        }

        .og-category-icon svg {
          width: 1.55rem;
          height: 1.55rem;
          fill: currentColor;
        }

        .og-category-icon-image {
          padding: 0.45rem;
          background: #fff;
        }

        .og-category-icon-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .og-category-icon-image-wide {
          width: 4.6rem;
        }

        .og-category-icon-microsoft {
          display: grid;
          grid-template-columns: repeat(2, 0.8rem);
          grid-template-rows: repeat(2, 0.8rem);
          gap: 0.12rem;
          padding: 0;
        }

        .og-category-icon-microsoft span:nth-child(1) {
          background: #f25022;
        }

        .og-category-icon-microsoft span:nth-child(2) {
          background: #7fba00;
        }

        .og-category-icon-microsoft span:nth-child(3) {
          background: #00a4ef;
        }

        .og-category-icon-microsoft span:nth-child(4) {
          background: #ffb900;
        }

        .og-category-icon-github {
          color: #24292f;
        }

        .og-category-icon-jamf {
          position: relative;
          background: #f8fbff;
        }

        .og-category-icon-jamf span {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border-radius: 2px;
          background: #0b65d8;
        }

        .og-category-icon-jamf span:first-child {
          transform: translate(-0.25rem, -0.15rem);
        }

        .og-category-icon-jamf span:last-child {
          transform: translate(0.25rem, 0.2rem);
          opacity: 0.82;
        }

        .og-category-icon-okta {
          background: #14161a;
        }

        .og-category-icon-okta span {
          width: 1.55rem;
          height: 1.55rem;
          border-radius: 50%;
          border: 0.22rem solid #fff;
          box-shadow: 0 0 0 0.18rem rgba(255, 255, 255, 0.42) inset;
        }

        .og-category-icon-scim {
          color: #008b78;
        }

        .og-category-icon-cyberark {
          width: 4.6rem;
          color: #047a3d;
          font-size: 0.75rem;
        }

        .og-category-icon-atlassian {
          color: #0052cc;
        }

        .og-category-icon-aws {
          color: #ff9900;
        }

        .og-category-icon-gcp {
          color: #1a73e8;
        }

        .og-category-icon-kubernetes {
          color: #326ce5;
        }

        .og-category-icon-salesforce {
          color: #00a1e0;
        }

        .og-category-icon-snowflake {
          color: #29b5e8;
        }

        .og-category-icon-tailscale {
          color: #111827;
        }

        .dark .og-library {
          --og-primary: var(--color-primary, #2c2677);
          --og-primary-hover: #3b32a0;
          --og-title: #dfdfe2;
          --og-text: #d6d3d1;
          --og-muted: #a8a29e;
          --og-muted-soft: #78716c;
          --og-card-bg: var(--color-background-dark, rgb(14, 14, 15));
          --og-border: rgba(255, 255, 255, 0.1);
          --og-callout-bg: rgba(154, 52, 18, 0.18);
          --og-callout-border: rgba(251, 146, 60, 0.35);
          --og-callout-text: #fdba74;
          --og-focus-ring: rgba(165, 180, 252, 0.28);
        }

        .dark .og-library-hero,
        .dark .og-category-heading {
          border-color: var(--og-border);
        }

        .dark .og-extension-card,
        .dark .og-maintainer-badge,
        .dark .og-category-icon,
        .dark .og-section-count {
          background: var(--og-card-bg);
        }

        .dark .og-category-icon-image {
          background: #fff;
        }

        .dark .og-library-legend-item {
          background: rgba(214, 211, 209, 0.05);
        }

        .dark .og-extension-card h3,
        .dark .og-category-heading h3,
        .dark .og-technology-heading h3 {
          color: var(--og-title);
        }

        .dark .og-category-icon-okta {
          background: #030712;
        }

        @media (max-width: 1200px) {
          .og-card-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .og-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .og-library-hero,
          .og-section-heading,
          .og-technology-heading {
            align-items: start;
          }
        }

        @media (max-width: 640px) {
          .og-library-hero,
          .og-section-heading,
          .og-technology-heading {
            display: grid;
            grid-template-columns: 1fr;
          }

          .og-technology-heading-meta {
            justify-content: space-between;
            width: 100%;
          }

          .og-card-grid {
            grid-template-columns: 1fr;
          }

          .og-library-hero-copy h1 {
            font-size: 1.8rem;
          }

          .og-submit-link {
            width: 100%;
          }

          .og-library-legend {
            grid-template-columns: 1fr;
          }

          .og-extension-card {
            min-height: 0;
          }

          .og-maintainer-badge > span:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default OpenGraphLibrary;
