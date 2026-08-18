// Generated from the OpenGraph library JSON files. Do not edit directly.
// Edit the JSON source files, then run:
// node scripts/generate-opengraph-library-data.mjs

export const libraryCategories = [
  {
    "name": "1Password",
    "group": "identity-authentication-secrets",
    "order": 20,
    "icon": {
      "type": "onepassword",
      "label": "1P"
    },
    "extensions": [
      {
        "name": "1PassHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Jared Atkinson",
            "href": "https://x.com/jaredcatkinson",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects 1Password for Business access-control data and converts vault, item, group, and user relationships into OpenGraph data for BloodHound analysis.",
        "href": "https://github.com/SpecterOps/1PassHound"
      }
    ]
  },
  {
    "name": "Amazon Web Services",
    "group": "cloud-cluster-control-planes",
    "order": 10,
    "icon": {
      "type": "aws",
      "label": "AWS"
    },
    "extensions": [
      {
        "name": "IAMhounddog",
        "maintainer": "community",
        "authors": [
          {
            "name": "Nathan Tucker",
            "href": "https://github.com/vntucker",
            "organization": "Virtue Security",
            "organizationHref": "https://www.virtuesecurity.com/"
          }
        ],
        "description": "Creates OpenGraph-compatible IAM-to-resource models for identifying privileged principals and second-order escalation opportunities in AWS environments.",
        "href": "https://github.com/VirtueSecurity/IAMhounddog"
      }
    ]
  },
  {
    "name": "Ansible",
    "group": "software-delivery-automation",
    "order": 20,
    "icon": {
      "type": "ansible",
      "label": "A"
    },
    "extensions": [
      {
        "name": "AnsibleHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Ramoreik",
            "href": "https://github.com/Ramoreik"
          },
          {
            "name": "s-lck",
            "href": "https://github.com/s-lck"
          }
        ],
        "description": "Maps Ansible AWX and Tower organization structure and permissions into a BloodHound-compatible attack-path graph.",
        "href": "https://github.com/TheSleekBoyCompany/AnsibleHound"
      }
    ]
  },
  {
    "name": "Atlassian Cloud",
    "group": "application-data-access",
    "order": 10,
    "icon": {
      "type": "atlassian",
      "label": "A"
    },
    "extensions": [
      {
        "name": "AtlassianHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Craig Wright",
            "href": "https://x.com/werdhaihai",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects foundational Jira and Confluence access data and exports it to BloodHound OpenGraph format for Atlassian Cloud and tested deployment paths.",
        "href": "https://github.com/werdhaihai/AtlassianHound"
      }
    ]
  },
  {
    "name": "Cisco Duo Security",
    "group": "identity-authentication-secrets",
    "order": 30,
    "icon": {
      "type": "cisco",
      "label": "DUO"
    },
    "extensions": [
      {
        "name": "DuoHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Jacob Julian",
            "href": "https://www.linkedin.com/in/jacobjulian/",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Extracts Duo Admin API data into OpenGraph so teams can analyze MFA relationships, application access, and enrollment coverage in BloodHound.",
        "href": "https://github.com/julian1j/DuoHound"
      }
    ]
  },
  {
    "name": "Credentials",
    "group": "identity-authentication-secrets",
    "order": 10,
    "icon": {
      "type": "key",
      "label": "KEY"
    },
    "extensions": [
      {
        "name": "AIHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "dfirdeferred",
            "href": "https://x.com/dfirdeferred",
            "organization": "Netwrix",
            "organizationHref": "https://www.netwrix.com/en/"
          }
        ],
        "description": "Exports AI credential and secret scanning results as OpenGraph JSON so BloodHound can visualize attack paths across AI tools and datastores.",
        "href": "https://github.com/netwrix/AIHound"
      },
      {
        "name": "SecretHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "JD Crandell",
            "href": "https://x.com/c0kernel",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Converts secret scanning results from tools like GitHub Secret Scanning, NoseyParker, TruffleHog, and Nemesis into BloodHound OpenGraph data.",
        "href": "https://github.com/C0KERNEL/SecretHound"
      }
    ]
  },
  {
    "name": "Cross-platform DevOps",
    "group": "software-delivery-automation",
    "order": 10,
    "icon": {
      "type": "cross-platform",
      "label": "Cross-platform"
    },
    "extensions": [
      {
        "name": "Dop2Mop",
        "maintainer": "community",
        "authors": [
          {
            "name": "Brett Hawkins",
            "href": "https://x.com/h4wkst3r",
            "organization": "Armadin",
            "organizationHref": "https://armadin.com/"
          }
        ],
        "description": "Maps attack paths from DevOps to MLOps infrastructure across GitHub, Azure DevOps, Azure ML, and AWS SageMaker.",
        "href": "https://github.com/h4wkst3r/Dop2Mop"
      }
    ]
  },
  {
    "name": "CyberArk",
    "group": "identity-authentication-secrets",
    "order": 40,
    "icon": {
      "type": "cyberark",
      "label": "CyberArk"
    },
    "extensions": [
      {
        "name": "CyberArkHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Javier Azofra",
            "href": "https://www.linkedin.com/in/azofra/",
            "organization": "Siemens Healthineers",
            "organizationHref": "https://www.siemens-healthineers.com/"
          },
          {
            "name": "Julian Garcia",
            "href": "https://www.linkedin.com/in/julian-garcia-murias/",
            "organization": "Siemens Healthineers",
            "organizationHref": "https://www.siemens-healthineers.com/"
          }
        ],
        "description": "Exports CyberArk PVWA users, groups, safes, accounts, and permissions into BloodHound-compatible OpenGraph JSON for attack-path analysis.",
        "href": "https://github.com/jazofra/CyberArkHound/tree/main"
      }
    ]
  },
  {
    "name": "FreeIPA",
    "group": "identity-authentication-secrets",
    "order": 50,
    "icon": {
      "type": "freeipa",
      "label": "IPA"
    },
    "extensions": [
      {
        "name": "IDMHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Samuel Bovy",
            "href": "https://github.com/lvruibr"
          }
        ],
        "description": "Collects FreeIPA and Red Hat Identity Management users, groups, domains, computers, HBAC rules, sudoer rights, and group memberships.",
        "href": "https://github.com/lvruibr/idmhound"
      }
    ]
  },
  {
    "name": "GitHub",
    "group": "software-delivery-automation",
    "order": 30,
    "icon": {
      "type": "github",
      "label": "GH"
    },
    "extensions": [
      {
        "name": "GitHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Jared Atkinson",
            "href": "https://x.com/jaredcatkinson",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects GitHub organization structure and permissions into a navigable OpenGraph attack-path model compatible with the SpecterOps GitHub extension.",
        "href": "https://github.com/SpecterOps/GitHound"
      },
      {
        "name": "openhound-github",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Joey Dreijer",
            "href": "https://github.com/d3vzer0",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          },
          {
            "name": "Jonas Bülow Knudsen",
            "href": "https://github.com/JonasBK",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects resources from GitHub organizations and transforms them into usable nodes and edges for BloodHound through OpenHound.",
        "href": "https://github.com/SpecterOps/openhound-github"
      },
      {
        "name": "GitHoundPy",
        "maintainer": "community",
        "authors": [
          {
            "name": "Derrick Polakoff",
            "href": "https://www.linkedin.com/in/derrick-polakoff-54a34a237",
            "organization": "CorvraLabs",
            "organizationHref": "https://github.com/CorvraLabs"
          }
        ],
        "description": "Provides a Python implementation of GitHound that aims to stay in sync with the main PowerShell collector.",
        "href": "https://github.com/CorvraLabs/GitHoundPy"
      }
    ]
  },
  {
    "name": "GitLab",
    "group": "software-delivery-automation",
    "order": 40,
    "icon": {
      "type": "gitlab",
      "label": "GL"
    },
    "extensions": [
      {
        "name": "GitLabHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Marc André Tanner",
            "href": "https://x.com/marcandretanner",
            "organization": "Compass Security",
            "organizationHref": "https://compass-security.com/"
          }
        ],
        "description": "Generates a GitLab attack-path graph covering users, groups, roles, repositories, CI/CD resources, SSO identities, OIDC trust paths, and leaked secrets.",
        "href": "https://github.com/CompassSecurity/GitLabHound"
      }
    ]
  },
  {
    "name": "Google Cloud Platform",
    "group": "cloud-cluster-control-planes",
    "order": 20,
    "icon": {
      "type": "gcp",
      "label": "GCP"
    },
    "extensions": [
      {
        "name": "GCP-Hound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Faiz Karim",
            "href": "https://in.linkedin.com/in/faiz-karim-8421bb195"
          }
        ],
        "description": "Transforms Google Cloud IAM relationships into interactive BloodHound attack graphs for security enumeration and privilege escalation discovery.",
        "href": "https://github.com/F41zK4r1m/GCP-Hound"
      },
      {
        "name": "GCPwn",
        "maintainer": "community",
        "authors": [
          {
            "name": "WebbinRoot",
            "href": "https://www.linkedin.com/in/webbinroot/",
            "organization": "NetSPI",
            "organizationHref": "https://www.netspi.com/"
          }
        ],
        "description": "Collects Google Cloud data for credential handling, service enumeration, artifact collection, and OpenGraph attack-path analysis.",
        "href": "https://github.com/NetSPI/gcpwn"
      }
    ]
  },
  {
    "name": "IBM Resource Access Control Facility (RACF)",
    "group": "endpoint-network-infrastructure-control",
    "order": 20,
    "icon": {
      "type": "mainframe",
      "label": "RACF"
    },
    "extensions": [
      {
        "name": "RacfHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Alexander Henriksson",
            "href": "https://linkedin.com/in/alexhenriksson"
          }
        ],
        "description": "Collects RACF database data over SSH for supported z/OS classes without requiring an IRRDBU00 dump.",
        "href": "https://github.com/4-L3X/racfhound"
      }
    ]
  },
  {
    "name": "Jamf Pro",
    "group": "endpoint-network-infrastructure-control",
    "order": 30,
    "icon": {
      "type": "jamf",
      "label": "J"
    },
    "extensions": [
      {
        "name": "JamfHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Lance Cain",
            "href": "https://www.linkedin.com/in/lance-cain-3ab262184",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects Jamf Pro tenant data and identifies attack paths based on object permissions, saved as JSON for BloodHound ingestion.",
        "href": "https://github.com/SpecterOps/jamfhound"
      },
      {
        "name": "openhound-jamf",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Joey Dreijer",
            "href": "https://github.com/d3vzer0",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          },
          {
            "name": "Jonas Bülow Knudsen",
            "href": "https://github.com/JonasBK",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          },
          {
            "name": "Lance Cain",
            "href": "https://www.linkedin.com/in/lance-cain-3ab262184",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects Jamf Pro resources and transforms them into usable nodes and edges for BloodHound through OpenHound.",
        "href": "https://github.com/SpecterOps/openhound-jamf"
      }
    ]
  },
  {
    "name": "Kubernetes",
    "group": "cloud-cluster-control-planes",
    "order": 30,
    "icon": {
      "type": "kubernetes",
      "label": "K8S"
    },
    "extensions": [
      {
        "name": "Bloodhound-Kube",
        "maintainer": "community",
        "authors": [
          {
            "name": "Don Cowan",
            "href": "https://www.linkedin.com/in/don-cowan/",
            "organization": "IBM X-Force Red",
            "organizationHref": "https://www.ibm.com/x-force"
          }
        ],
        "description": "Collects Kubernetes and OpenShift topology, RBAC, and common custom resources to visualize multi-step attack paths through large-scale clusters.",
        "href": "https://github.com/HackinAhab/bloodhound-kube"
      },
      {
        "name": "ClusterHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Nathan Dove",
            "href": "https://www.linkedin.com/in/nathan-dove/",
            "organization": "KPMG UK",
            "organizationHref": "https://kpmg.com/uk/en.html"
          },
          {
            "name": "Josh Hickling",
            "href": "https://www.linkedin.com/in/joshua-hickling/",
            "organization": "KPMG UK",
            "organizationHref": "https://kpmg.com/uk/en.html"
          }
        ],
        "description": "Collects cluster topology and RBAC configuration with kubectl and outputs OpenGraph JSON for Kubernetes attack-path analysis.",
        "href": "https://github.com/dovesec/ClusterHound"
      }
    ]
  },
  {
    "name": "Microsoft Active Directory",
    "group": "identity-authentication-secrets",
    "order": 60,
    "icon": {
      "type": "microsoft",
      "label": "AD"
    },
    "extensions": [
      {
        "name": "ADAttributeHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Martin Sohn Christensen",
            "href": "https://x.com/martinsohndk",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Exports selected Active Directory custom attributes as OpenGraph node properties so BloodHound can enrich or create nodes with additional directory context.",
        "href": "https://github.com/martinsohn/ADAttributeHound"
      },
      {
        "name": "ManagerOfHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Martin Sohn Christensen",
            "href": "https://x.com/martinsohndk",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects manager-subordinate relationships from Active Directory and exports them as custom ManagerOf edges for BloodHound ingestion.",
        "href": "https://github.com/martinsohn/ManagerOfHound"
      },
      {
        "name": "GhostHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "João Victor Botelho Gonçalves",
            "href": "https://www.linkedin.com/in/joao-victor-botelho/"
          }
        ],
        "description": "Enumerates Active Directory tombstones and reanimation rights, then emits OpenGraph data that highlights deleted-object restoration attack paths.",
        "href": "https://github.com/JVBotelho/ghosthound"
      },
      {
        "name": "ProfileHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Chris Haller",
            "href": "https://www.linkedin.com/in/christopher-haller/",
            "organization": "Omada Technologies",
            "organizationHref": "https://omadatechnologies.com/"
          }
        ],
        "description": "Finds user profiles on domain machines and creates HasUserProfile edges that help operators decide which systems to target for credential access.",
        "href": "https://github.com/m4lwhere/profilehound"
      },
      {
        "name": "WinSSHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Robin Unglaub",
            "href": "https://www.linkedin.com/in/robin-unglaub/",
            "organization": "ProSec GmbH",
            "organizationHref": "https://www.prosec-networks.com/"
          }
        ],
        "description": "Maps lateral movement paths through misconfigured native and third-party SSH servers in Active Directory environments.",
        "href": "https://github.com/1r0BIT/WinSSHound"
      }
    ]
  },
  {
    "name": "Microsoft Entra ID",
    "group": "identity-authentication-secrets",
    "order": 70,
    "icon": {
      "type": "microsoft",
      "label": "ID"
    },
    "extensions": [
      {
        "name": "EntraAuthPolicyHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Michael Grafnetter",
            "href": "https://x.com/mgrafnetter",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Demonstrates collection of Entra ID permissions related to Temporary Access Passes and passkeys, then exports the results as BloodHound OpenGraph data.",
        "href": "https://github.com/MichaelGrafnetter/EntraAuthPolicyHound"
      },
      {
        "name": "EntraSSSOHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Daniel Heinsen",
            "href": "https://x.com/hotnops",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Models Entra ID Seamless SSO trust paths that can allow Active Directory computers to affect synced Entra ID users.",
        "href": "https://github.com/SpecterOps/EntraSSSOHound"
      }
    ]
  },
  {
    "name": "Microsoft Exchange",
    "group": "application-data-access",
    "order": 20,
    "icon": {
      "type": "microsoft",
      "label": "EX"
    },
    "extensions": [
      {
        "name": "ExchangeHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Filip Wozniak",
            "href": "https://github.com/FilipPwn"
          }
        ],
        "description": "Models Exchange on-premises objects and relationships, including mailbox delegation, folder access, transport rules, and Exchange RBAC assignments.",
        "href": "https://github.com/FilipPwn/exchangehound"
      }
    ]
  },
  {
    "name": "Microsoft SQL Server",
    "group": "application-data-access",
    "order": 30,
    "icon": {
      "type": "microsoft",
      "label": "SQL"
    },
    "extensions": [
      {
        "name": "MSSQLHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Chris Thompson",
            "href": "https://x.com/_Mayyhem",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects BloodHound OpenGraph-compatible data from one or more MSSQL servers and packages the output for ingestion.",
        "href": "https://github.com/SpecterOps/MSSQLHound"
      }
    ]
  },
  {
    "name": "Microsoft System Center",
    "group": "endpoint-network-infrastructure-control",
    "order": 40,
    "icon": {
      "type": "microsoft",
      "label": "SC"
    },
    "extensions": [
      {
        "name": "ConfigManBearPig",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Chris Thompson",
            "href": "https://x.com/_Mayyhem",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Adds Microsoft Configuration Manager and SCCM attack-path data to BloodHound through a PowerShell OpenGraph collector.",
        "href": "https://github.com/SpecterOps/ConfigManBearPig"
      },
      {
        "name": "SCCM_SQL_Collector",
        "maintainer": "community",
        "authors": [
          {
            "name": "Dave Cossa",
            "href": "https://x.com/G0ldenGunSec"
          }
        ],
        "description": "Collects SCCM attack paths from an SCCM site database using a proof-of-concept SQL collection workflow.",
        "href": "https://github.com/G0ldenGunSec/SCCM_SQL_Collector"
      },
      {
        "name": "SCOMHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Garrett Foster",
            "href": "https://x.com/unsigned_sh0rt",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Enumerates System Center Operations Manager infrastructure from Active Directory and emits BloodHound OpenGraph data.",
        "href": "https://github.com/SpecterOps/SCOMHound"
      }
    ]
  },
  {
    "name": "Microsoft Windows",
    "group": "endpoint-network-infrastructure-control",
    "order": 50,
    "icon": {
      "type": "windows",
      "label": "WIN"
    },
    "extensions": [
      {
        "name": "PrivHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Arun Nair",
            "href": "https://x.com/dazzyddos"
          }
        ],
        "description": "Models Windows local privilege escalation vectors as multi-hop attack paths that can overlay existing SharpHound Active Directory data.",
        "href": "https://github.com/dazzyddos/PrivHound"
      },
      {
        "name": "ShareHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Remi Gascou",
            "href": "https://x.com/podalirius_",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Maps network shares, permissions, and paths at scale to help identify attack paths to network shares.",
        "href": "https://github.com/p0dalirius/sharehound"
      },
      {
        "name": "TaskHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Robin 'r0BIT' Unglaub",
            "href": "https://www.linkedin.com/in/robin-unglaub/",
            "organization": "ProSec GmbH",
            "organizationHref": "https://www.prosec-networks.com"
          }
        ],
        "description": "Hunts for Windows scheduled tasks that run with privileged accounts and stored credentials, then exports findings for BloodHound.",
        "href": "https://github.com/1r0BIT/TaskHound"
      }
    ]
  },
  {
    "name": "MITRE ATT&CK",
    "group": "exposure-threat-context",
    "order": 20,
    "icon": {
      "type": "mitre",
      "label": "ATT&CK"
    },
    "extensions": [
      {
        "name": "BloodSOCer",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Mat Saulnier",
            "href": "https://x.com/ScoubiMtl",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Aggregates threat intelligence from MITRE ATT&CK, Sigma rules, and Atomic Red Team into OpenGraph data for BloodHound visualization.",
        "href": "https://github.com/Scoubi/BloodSOCer"
      }
    ]
  },
  {
    "name": "Network",
    "group": "exposure-threat-context",
    "order": 10,
    "icon": {
      "type": "network",
      "label": "NET"
    },
    "extensions": [
      {
        "name": "NetworkHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Mor David",
            "href": "https://x.com/m0rd4vid",
            "organization": "mordavid.com",
            "organizationHref": "https://www.mordavid.com/"
          }
        ],
        "description": "Discovers computer objects, resolves hostnames, scans ports and HTTP services, identifies shadow IT, and builds OpenGraph network topology data.",
        "href": "https://github.com/mordavid/NetworkHound"
      }
    ]
  },
  {
    "name": "Okta",
    "group": "identity-authentication-secrets",
    "order": 80,
    "icon": {
      "type": "okta",
      "label": "O"
    },
    "extensions": [
      {
        "name": "OktaHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Michael Grafnetter",
            "href": "https://www.linkedin.com/in/grafnetter/",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects Okta users, groups, applications, roles, and related entities for analysis with the SpecterOps Okta OpenGraph extension.",
        "href": "https://github.com/SpecterOps/OktaHound"
      },
      {
        "name": "openhound-okta",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Joey Dreijer",
            "href": "https://github.com/d3vzer0",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          },
          {
            "name": "Jonas Bülow Knudsen",
            "href": "https://github.com/JonasBK",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects Okta resources and transforms them into usable nodes and edges for BloodHound through OpenHound.",
        "href": "https://github.com/SpecterOps/openhound-okta"
      }
    ]
  },
  {
    "name": "Oracle Cloud Infrastructure",
    "group": "cloud-cluster-control-planes",
    "order": 40,
    "icon": {
      "type": "oracle",
      "label": "OCI"
    },
    "extensions": [
      {
        "name": "OCInferno",
        "maintainer": "community",
        "authors": [
          {
            "name": "WebbinRoot",
            "href": "https://www.linkedin.com/in/webbinroot/",
            "organization": "NetSPI",
            "organizationHref": "https://www.netspi.com/"
          }
        ],
        "description": "Collects OCI data for credential handling, service enumeration, artifact download, and OpenGraph privilege-escalation path analysis.",
        "href": "https://github.com/NetSPI/ocinferno"
      }
    ]
  },
  {
    "name": "PingOne",
    "group": "identity-authentication-secrets",
    "order": 90,
    "icon": {
      "type": "ping",
      "label": "P"
    },
    "extensions": [
      {
        "name": "PingOneHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Andy Robbins",
            "href": "https://www.linkedin.com/in/robbinsandy/",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects PingOne identity provider data needed to identify, analyze, execute, and audit PingOne attack paths and object-level permissions.",
        "href": "https://github.com/andyrobbins/PingOneHound"
      }
    ]
  },
  {
    "name": "runZero",
    "group": "exposure-threat-context",
    "order": 30,
    "icon": {
      "type": "runzero",
      "label": "rZ"
    },
    "extensions": [
      {
        "name": "runZeroHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "HD Moore",
            "href": "https://infosec.exchange/@hdm",
            "organization": "runZero",
            "organizationHref": "https://www.runzero.com/"
          }
        ],
        "description": "Brings runZero Exposure Management data into BloodHound through OpenGraph.",
        "href": "https://github.com/runZeroInc/runZeroHound"
      }
    ]
  },
  {
    "name": "Salesforce",
    "group": "application-data-access",
    "order": 40,
    "icon": {
      "type": "salesforce",
      "label": "SF"
    },
    "extensions": [
      {
        "name": "ForceHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Weylon Solis",
            "href": "https://www.linkedin.com/in/weylon-solis",
            "organization": "NetSPI",
            "organizationHref": "https://www.netspi.com/"
          }
        ],
        "description": "Maps Salesforce identity, permission, and access-control structures into an OpenGraph attack-path graph for BloodHound Community Edition.",
        "href": "https://github.com/NetSPI/ForceHound"
      },
      {
        "name": "SFHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Kaden 'kaib3r' Butt",
            "href": "https://www.linkedin.com/in/kaden-b-a428b9219/"
          }
        ],
        "description": "Enumerates Salesforce users, profiles, permission sets, roles, groups, queues, connected apps, and object or field permissions.",
        "href": "https://github.com/Khadinxc/sfhound"
      }
    ]
  },
  {
    "name": "Snowflake",
    "group": "application-data-access",
    "order": 50,
    "icon": {
      "type": "snowflake",
      "label": "SN"
    },
    "extensions": [
      {
        "name": "SnowHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Jared Atkinson",
            "href": "https://x.com/jaredcatkinson",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Maps Snowflake users, databases, roles, warehouses, integrations, and related permissions for BloodHound attack-path analysis.",
        "href": "https://github.com/SpecterOps/SnowHound"
      }
    ]
  },
  {
    "name": "SSH",
    "group": "endpoint-network-infrastructure-control",
    "order": 10,
    "icon": {
      "type": "terminal",
      "label": "SSH"
    },
    "extensions": [
      {
        "name": "GoLinHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Lukas Klein",
            "href": "https://www.linkedin.com/in/klein-lukas/"
          }
        ],
        "description": "Discovers SSH authentication and Linux-host attack paths, including local privilege escalation, SSH key and certificate authentication, and identity connections.",
        "href": "https://github.com/RantaSec/golinhound"
      }
    ]
  },
  {
    "name": "Tailscale",
    "group": "endpoint-network-infrastructure-control",
    "order": 60,
    "icon": {
      "type": "tailscale",
      "label": "TS"
    },
    "extensions": [
      {
        "name": "TailscaleHound",
        "maintainer": "specterops",
        "authors": [
          {
            "name": "Andrew Gomez",
            "href": "https://github.com/KingOfTheNOPs",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          },
          {
            "name": "Andrew Luke",
            "href": "https://github.com/Sw4mpf0x",
            "organization": "SpecterOps",
            "organizationHref": "https://specterops.io"
          }
        ],
        "description": "Collects tailnet users, devices, groups, tags, ACLs, grants, SSH rules, routes, app connectors, services, invites, and webhooks.",
        "href": "https://github.com/KingOfTheNOPs/TailscaleHound"
      }
    ]
  },
  {
    "name": "VMware vCenter Server",
    "group": "endpoint-network-infrastructure-control",
    "order": 70,
    "icon": {
      "type": "vmware",
      "label": "vC"
    },
    "extensions": [
      {
        "name": "vCenterHound",
        "maintainer": "community",
        "authors": [
          {
            "name": "Mor David",
            "href": "https://x.com/m0rd4vid",
            "organization": "mordavid.com",
            "organizationHref": "https://www.mordavid.com/"
          }
        ],
        "description": "Collects vCenter infrastructure entities, permissions, roles, users, groups, and assignments into a BloodHound-compatible JSON graph.",
        "href": "https://github.com/MorDavid/vCenterHound"
      }
    ]
  }
];

export const libraryGroups = [
  {
    "id": "identity-authentication-secrets",
    "name": "Identity, Authentication, and Secrets",
    "description": "Identity, authentication, impersonation, credential, and authentication-control paths.",
    "order": 10
  },
  {
    "id": "cloud-cluster-control-planes",
    "name": "Cloud and Cluster Control Planes",
    "description": "IAM, RBAC, privilege-escalation, and resource-control paths across clouds and clusters.",
    "order": 20
  },
  {
    "id": "endpoint-network-infrastructure-control",
    "name": "Endpoint, Network, and Infrastructure Control",
    "description": "Administrative, remote-access, configuration, and lateral-movement paths through infrastructure.",
    "order": 30
  },
  {
    "id": "software-delivery-automation",
    "name": "Software Delivery and Automation",
    "description": "Source-code, pipeline, automation, and deployment paths that affect downstream workloads.",
    "order": 40
  },
  {
    "id": "application-data-access",
    "name": "Application and Data Access",
    "description": "Access and delegated-control paths through business applications, mail systems, and data platforms.",
    "order": 50
  },
  {
    "id": "exposure-threat-context",
    "name": "Exposure and Threat Context",
    "description": "Reachability, asset-exposure, and threat-intelligence context for identifying and prioritizing paths.",
    "order": 60
  }
];

export const openGraphTools = [
  {
    "name": "OpenHound",
    "maintainer": "specterops",
    "authors": [
      {
        "name": "Joey Dreijer",
        "href": "https://github.com/d3vzer0",
        "organization": "SpecterOps",
        "organizationHref": "https://specterops.io"
      },
      {
        "name": "Emmanuel Robles",
        "href": "https://github.com/emmanuelrobles",
        "organization": "SpecterOps",
        "organizationHref": "https://specterops.io"
      }
    ],
    "description": "Provides a standardized collect-first, convert-later framework for building OpenGraph collectors and converters.",
    "href": "https://github.com/SpecterOps/OpenHound"
  },
  {
    "name": "bhopengraph",
    "maintainer": "specterops",
    "authors": [
      {
        "name": "Remi Gascou",
        "href": "https://x.com/podalirius_",
        "organization": "SpecterOps",
        "organizationHref": "https://specterops.io"
      }
    ],
    "description": "Provides Python classes for creating and managing graph structures that conform to BloodHound OpenGraph schema expectations.",
    "href": "https://github.com/p0dalirius/bhopengraph"
  },
  {
    "name": "BloodHoundOperator",
    "maintainer": "specterops",
    "authors": [
      {
        "name": "SadProcessor",
        "href": "https://x.com/sadprocessor",
        "organization": "SpecterOps",
        "organizationHref": "https://specterops.io"
      }
    ],
    "description": "Provides a PowerShell client for BloodHound Community Edition and BloodHound Enterprise.",
    "href": "https://github.com/SadProcessor/BloodHoundOperator"
  },
  {
    "name": "BloodHound OpenGraph Helper Library",
    "maintainer": "community",
    "authors": [
      {
        "name": "Luke Roberts",
        "href": "https://x.com/rookuu_"
      }
    ],
    "description": "Provides a Python library for creating BloodHound OpenGraph JSON data that conforms to the OpenGraph data payload schema.",
    "href": "https://github.com/rookuu/bloodhound-opengraph"
  },
  {
    "name": "gopengraph",
    "maintainer": "specterops",
    "authors": [
      {
        "name": "Remi Gascou",
        "href": "https://x.com/podalirius_",
        "organization": "SpecterOps",
        "organizationHref": "https://specterops.io"
      }
    ],
    "description": "Provides Go types and helpers for creating and managing graph structures that are compatible with BloodHound OpenGraph.",
    "href": "https://github.com/TheManticoreProject/gopengraph"
  },
  {
    "name": "flashingestor",
    "maintainer": "community",
    "authors": [
      {
        "name": "Artur Marzano",
        "href": "https://github.com/Macmod"
      }
    ],
    "description": "Provides a fast, customizable, BloodHound CE-compatible data ingestor with a terminal user interface and progress tracking.",
    "href": "https://github.com/Macmod/flashingestor"
  },
  {
    "name": "HoundTrainer",
    "maintainer": "community",
    "authors": [
      {
        "name": "Tom O'Neill",
        "href": "https://github.com/toneillcodes"
      }
    ],
    "description": "Automates custom node type and Cypher query management in BloodHound through JSON schema handling and API interactions.",
    "href": "https://github.com/toneillcodes/HoundTrainer"
  },
  {
    "name": "ScrappyDoo",
    "maintainer": "specterops",
    "authors": [
      {
        "name": "Hunter Orrantia",
        "href": "https://www.linkedin.com/in/horrantia",
        "organization": "SpecterOps",
        "organizationHref": "https://specterops.io"
      }
    ],
    "description": "Provides a self-hosted web app for generating BloodHound OpenGraph-compatible JSON.",
    "href": "https://github.com/c0rdyc3ps/ScrappyDoo"
  }
];
