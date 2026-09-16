# BloodHound documentation information architecture

Use this guide when adding, moving, or reorganizing documentation pages. The public navigation is the source of truth for the site's information architecture. The navigation lives in [`docs/docs.json`](/docs/docs.json); the directory structure supports that navigation but does not replace it.

## Site structure

The site has three tabs:

- **Home** — The documentation landing page.
- **BloodHound** — Product documentation, deployment, collection, analysis, administration, integrations, and reference content.
- **API Reference** — The API reference entry point.

The **BloodHound** tab contains these top-level groups, in navigation order:

1. **Get Started with BloodHound** (`/docs/get-started/`)
   - Introduction and quickstarts for BloodHound Enterprise and Community Edition
   - Custom installation and PostgreSQL upgrades
   - Security boundaries and Tier Zero membership
2. **Install a Data Collector** (`/docs/install-data-collector/`)
   - Collector installation overview
   - SharpHound installation, upgrades, configuration, service accounts, and troubleshooting
   - AzureHound requirements, Azure configuration, installation options, and multiple collectors
3. **Collect Data** (`/docs/collect-data/`)
   - Collection overview, data quality, and collector permissions
   - BloodHound Enterprise collection, including ad hoc scans, schedules, monitoring, retention, and collection strategies
   - Community Edition collection, including SharpHound and AzureHound usage and flags
4. **OpenGraph** (`/docs/opengraph/`)
   - OpenGraph concepts and the OpenGraph library
   - BloodHound Enterprise extensions for GitHub, Jamf, Okta, and SCIM
   - Extension development, including graph theory, graph definitions, graph data, APIs, and best practices
   - OpenGraph FAQ
5. **OpenHound** (`/docs/openhound/`)
   - OpenHound overview, Enterprise and Community Edition deployment, and configuration
   - OpenHound collectors for Jamf, GitHub, and Okta
6. **Analyze Attack Path Data** (`/docs/analyze-data/`)
   - Findings and remediation, including attack paths, graph view, table view, posture, and risk acceptance
   - Search and Cypher exploration
   - Privilege Zones, including rules, labels, certification, history, and use cases
   - Analysis configuration
7. **Manage BloodHound** (`/docs/manage-bloodhound/`)
   - Authentication and authorization, including users, roles, environment-targeted access control, MFA, OIDC, and SAML
   - BloodHound Enterprise Compliance Framework resources and standards
   - BloodHound shortcuts, configuration, and SharpHound hardening
8. **API & Integrations** (`/docs/integrations/`)
   - BloodHound API usage and JSON formats
   - Cortex XSOAR, Google SecOps, Atlassian Jira, ServiceNow, and Splunk integrations
9. **On-premises BloodHound Enterprise** (`/docs/on-premises/`)
   - Architecture, system requirements, installation, and PostgreSQL upgrades
10. **Resources** (`/docs/resources/`)
    - Node and edge reference
    - Glossary
    - Community and support
    - Release notes and their year-based archive
    - Legacy content

The **API Reference** tab contains the API reference entry point at `/docs/reference/overview.mdx`.

## Choose a page location

Place a page in the group that matches the reader's primary task and the page's product boundary:

- Use **Get Started with BloodHound** for initial orientation, quickstarts, and core installation paths.
- Use **Install a Data Collector** for installing or configuring collector infrastructure.
- Use **Collect Data** for running collection, managing collection schedules, monitoring collection, and understanding collector permissions.
- Use **OpenGraph** for graph concepts, extension schemas, graph data, and extension development.
- Use **OpenHound** for OpenHound deployment, configuration, and collectors.
- Use **Analyze Attack Path Data** for investigating findings, exploring graph data, measuring posture, and managing Privilege Zones.
- Use **Manage BloodHound** for platform administration, access control, compliance, configuration, and hardening.
- Use **API & Integrations** for the BloodHound API and external product integrations.
- Use **On-premises BloodHound Enterprise** for self-hosted Enterprise deployment and operations.
- Use **Resources** for durable reference material, terminology, support, release notes, and legacy pages.

When a page could fit multiple groups, choose the location that matches the action the reader needs to complete. Link to the page from related conceptual or reference content instead of duplicating it.

## Organize page content

- Prefer one focused page over a page that mixes conceptual, procedural, and reference content.
- Organize nested pages under the same product or capability as their parent group. Use an `overview.mdx` page as the entry point when a group contains multiple pages.
- Keep installation, collection, analysis, administration, and reference content separate even when they describe the same product.
- Group edition-specific workflows clearly. Label pages and sections for BloodHound Enterprise, BloodHound Community Edition, or both.
- Use the established directory, frontmatter, component, snippet, and asset patterns from nearby pages.
- Add new pages to `/docs/docs.json` in the intended navigation group in the same change.
- Remove or move a page's navigation entry when removing or moving the page.
- Check for broken links and orphaned pages before handoff.

## Customer journey

Use the customer journey to guide content and links within the navigation. It is a content model, not a duplicate top-level navigation:

1. **Get started** — Understand BloodHound and install the appropriate edition.
2. **Understand core concepts** — Learn attack paths, Privilege Zones, OpenGraph, and related terminology.
3. **Collect data** — Install collectors, configure permissions, run collection, and manage schedules.
4. **Analyze results** — Explore the graph, investigate findings, measure posture, and accept findings.
5. **Manage the platform** — Manage users, roles, compliance, configuration, and security.
6. **Extend and reference** — Build extensions, use the API, configure integrations, and consult schemas, glossary terms, and reference pages.
