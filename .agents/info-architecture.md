# BloodHound documentation information architecture

Use this guide when adding, moving, or reorganizing documentation pages. The public navigation in [`docs/docs.json`](../docs/docs.json) is the single source of truth for the site's information architecture. This guide explains how to make placement decisions; it is not a second copy of the navigation tree.

## Choose a page location

Place a page in the group that matches the reader's primary task and the page's product boundary:

| Navigation group | Use for |
| --- | --- |
| Get Started with BloodHound | Initial orientation, quickstarts, core installation paths, security boundaries, and Tier Zero membership |
| Install a Data Collector | Installing or configuring collector infrastructure |
| Collect Data | Running collection, managing schedules, monitoring collection, and collector permissions |
| OpenGraph | Graph concepts, extension schemas, graph data, and extension development |
| OpenHound | OpenHound deployment, configuration, and collectors |
| Analyze Attack Path Data | Investigating findings, exploring graph data, measuring posture, and managing Privilege Zones |
| Manage BloodHound | Platform administration, access control, compliance, configuration, and hardening |
| API & Integrations | The BloodHound API and external product integrations |
| On-premises BloodHound Enterprise | Self-hosted Enterprise deployment and operations |
| Resources | Durable reference material, terminology, support, release notes, and legacy pages |

When a page could fit multiple groups, choose the location that matches the action the reader needs to complete. Link to the page from related conceptual or reference content instead of duplicating it.

## Organize page content

- Prefer one focused page over a page that mixes conceptual, procedural, and reference content.
- Organize nested pages under the same product or capability as their parent group. Use an `overview.mdx` page as the entry point when a group contains multiple pages.
- Keep installation, collection, analysis, administration, and reference content separate even when they describe the same product.
- Group edition-specific workflows clearly. Label pages and sections for BloodHound Enterprise, BloodHound Community Edition, or both.
- Use the established directory, frontmatter, component, and asset patterns from nearby pages.
- Add new pages to `docs/docs.json` in the intended navigation group in the same change.
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
