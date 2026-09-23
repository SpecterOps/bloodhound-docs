# BloodHound release notes

This document describes the style, format, and conventions we use to create BloodHound release notes.

## Summary

- Each release gets an H2 heading with the release date
  - For each H2, include a table that summarizes the version numbers for BloodHound, OpenHound, SharpHound, and AzureHound for that release
  - If a product did not ship in that release, use `No release` instead of removing the column
- Use the summary page as a scannable landing page, not a duplicate of the detailed release notes
- Use different summary patterns based on release size
  - For larger releases, follow the current pattern of a short summary paragraph, optional key highlights bullets, H3 headings for new features, enhancements, and fixed issues, and summary tables for new features and enhancements
  - For smaller patch releases, use a shorter paragraph-and-bullets pattern and avoid forcing full summary tables when they add little value
- For fixed issues on the summary page, prefer linking to the detailed release notes for the full list instead of duplicating every fixed issue in the summary

## Navigation and archive management

- Manage release-note navigation entries in `docs/docs.json`, not in `summary.mdx`
- Keep only the latest and previous detailed release-note pages surfaced at the top level of the release-notes navigation
- Move older detailed release-note pages into the appropriate archive groups in `docs/docs.json`
- When you add a new detailed release-note file, update `docs/docs.json` in the same change so navigation stays current

### Example

Use the following files as examples of how the summary and detailed release notes pages should be structured and formatted:

- [Summary page example](/Users/jmatthews/git/bloodhound-docs/docs/resources/release-notes/summary.mdx)

## Detailed release notes

For each release, we provide detailed release notes that include:

- A table with the version numbers for BloodHound, OpenHound, SharpHound, and AzureHound for that release similar to the summary page
- A list of updates for that release, organized by release type and component (for example Administration, Posture, API, and Data Collection)
- A description of each update and any relevant links to documentation or resources
- Each update uses Mintlify's `<Update>` component to provide a consistent format and structure for all updates
- Most `<Update>` entries include the following properties:
  - `label`: the affected product (for example BloodHound, OpenHound, SharpHound, or AzureHound)
  - `description`: the update type (for example New Feature, Enhancement, General Availability, or Breaking Change)
  - `tags`: the affected component (for example Administration, Posture, API, or Data Collection)
  - A concise title for the update preceded by the Jira issue key commented out for internal tracking purposes (for example `BED-1234`)
  - A brief description of the update, its impact, and why users should care (1-2 sentences)
  - Links to relevant documentation or resources for more information about the update
  - A screenshot or GIF demonstrating the update in action when it materially improves understanding
- Fixed-issue sections are the main exception to the pattern above
  - Group fixed issues by product when possible
  - Use `tags={["Fixed Issues"]}` on the `<Update>` block
  - Organize issue groups with component headings inside the body
- Use the enterprise pill image for enterprise-only updates on new pages
- Use a `<Warning>` callout for breaking changes
- Ordering of updates within each release type should be based on the impact to users, with more impactful updates listed first
- Use a deterministic sort order that applies stakeholder constraints in priority order: group by update type first, then split by applicability (shared first, enterprise-only second), then rank by reader impact or value. This keeps the notes scannable, consistent, and defensible release over release.
- Use visuals only when they materially improve understanding of a workflow, visual state change, graph interaction, or collector experience

See the [detailed release notes for the 2026-03-23 release](/Users/jmatthews/git/bloodhound-docs/docs/resources/release-notes/2026-03-23.mdx) and the [2026-06-16 release](/Users/jmatthews/git/bloodhound-docs/docs/resources/release-notes/2026-06-16.mdx) for examples of how to format and structure detailed release notes using the `<Update>` component.

### Ordering updates in detailed release notes

Order all `<Update>` entries using the following precedence rules:

1. If the release includes a major milestone announcement such as General Availability, that entry may appear first.
2. Otherwise, group by update type first: New Feature -> Enhancement -> Breaking Change -> Fixed Issues.
3. Within each update type, place updates that apply to both Community and Enterprise first.
4. Keep Enterprise-only updates grouped together and place that group after shared updates for the same update type.
5. Within each applicability group, prioritize by reader impact or value in this order:
  - Security and compliance risk reduction
  - Breadth of workflow or product-surface impact
  - Operator efficiency and time savings
  - Quality-of-life and visual polish
6. If impact is effectively tied, keep related component tags grouped together for scanability.
7. For fixed issues, keep per-product grouping and order issue subsections by impact (for example API/Auth and data correctness before UI polish).

### Anatomy of a detailed release notes entry

#### New Features

```mdx
<Update label="Product" description="New Feature" tags={["Component"]}>
  {/*BED-6818*/}
  ## Concise title

  Call-to-action style description of the feature and its impact. Keep it brief (1-2 sentences) and focused on the value to users.

  Example: See at a glance how many users, groups, and computers are included in each of your Privilege Zone rules with the new Count by Kind feature in the Total Count panel.

  More detailed description of the feature, its impact, and any relevant context. This is where you can provide more information about the update, such as why the change was made, how it improves the user experience, or any other relevant details that users might find helpful.

  Example: The new Count by Kind feature in the Total Count panel of the BloodHound UI allows you to see a breakdown of how many users, groups, and computers are included in each of your Privilege Zone rules. This enhancement provides greater visibility into the composition of your Privilege Zones, making it easier to understand and manage the objects that are included in each zone. With this information at your fingertips, you can make more informed decisions about how to organize and prioritize your Privilege Zones effectively.
</Update>
```

#### Enhancements

```mdx
<Update label="Product" description="Enhancement" tags={["Component"]}>
  {/*BED-1234*/}
  ## Concise title

  Call-to-action of the enhancement and its impact. Keep it brief (1-2 sentences) and focused on the value to users.

  Example: Navigate Privilege Zones with confidence using the new "Rules" terminology instead of "Selectors."

  More detailed description of the enhancement, its impact, and any relevant context. This is where you can provide more information about the update, such as why the change was made, how it improves the user experience, or any other relevant details that users might find helpful.

  Example: We updated the terminology in the BloodHound UI from "Selectors" to "Rules" to provide clearer and more intuitive language for navigating Privilege Zones. This change helps users understand that these are the rules that define which objects are included in each Privilege Zone, making it easier to manage and organize your zones effectively.

</Update>
```

#### Fixed Issues

```mdx
<Update label="Product" tags={["Fixed Issues"]}>
  ## Component

  {/*BED-1234*/} A concise description of the issue that was fixed and its impact. Focus on the value to users and any relevant context.

  Example: Resolved an issue where certificates used for SSL inspection prevented AzureHound from communicating via TLS.
</Update>
```
