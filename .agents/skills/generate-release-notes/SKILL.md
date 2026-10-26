---
name: release-notes-automation
description: Generate BloodHound product release notes from Jira exports, verify changes against local repositories, and update the release summary and navigation.
---

# Release Notes Automation

Use this workflow to turn Jira release exports into detailed BloodHound release notes and a concise summary. Follow the conventions in `docs/resources/release-notes/AGENTS.md` and the repository's documentation instructions.

## Inputs

The user provides:

- **jira_csv**: Jira export path
- **release_date**: Release date in `YYYY-MM-DD` format
- **versions**: Exact versions for BloodHound, OpenHound, SharpHound, and AzureHound; use `No release` for products without a release

Use the date and versions the user supplied. Do not infer a version or change the release date.

## Workflow

### 1. Parse and account for Jira issues

Read the export without changing it. Try UTF-8 with BOM (`utf-8-sig`) first; if decoding fails, try Windows-1252. Preserve duplicate CSV headers and combine non-empty values from repeated fields such as `Components` rather than silently dropping columns.

The core fields are **Issue key**, **Issue Type**, and **Summary**. Use **Description**, **Parent key**, **Parent summary**, **Custom field (Completed Fix Notes)**, **Custom field (Development)**, and any product, component, release-needed, or behavior fields when present. Exports vary: do not require a `Labels` column or halt just because optional fields are absent. If a core field is missing, or the release scope cannot be determined, stop and ask for the missing information.

If a release-needed field exists, include issues marked for release notes. Otherwise use the export's release scope and the user's instructions. Check for duplicate issue keys and account for every in-scope issue before drafting. Keep an internal issue ledger with each key, parent, likely product and edition, candidate repository and commit, verification evidence, and final disposition. Every in-scope key must appear in the notes or be explicitly flagged for manual review.

### 2. Map issues to shipped changes

Use the issue's development links, component, summary, and description to identify candidate repositories. The export's labels and components may be missing or incomplete, so corroborate product ownership from the matching implementation and commit.

| Product or behavior | Local repository |
| --- | --- |
| BloodHound Community Edition | `BloodHound` |
| BloodHound Enterprise | `bloodhound-enterprise` |
| Graph and query engine changes | `dawgs` |
| SharpHound | `SharpHound` |
| SharpHound Enterprise-specific behavior | `sharphound-enterprise` |
| AzureHound | `AzureHound` |
| OpenHound core | `OpenHound` |
| OpenHound GitHub collector | `openhound-github` |
| OpenHound Jamf collector | `openhound-jamf` |
| OpenHound Okta collector | `openhound-okta` |

For each issue:

1. Inspect a supplied PR or commit link, if available, and confirm it was merged.
2. Search the likely local repositories for the Jira key with `git log --all --grep="<ISSUE-KEY>" --oneline`. If no match appears, search commit subjects and changed code using summary terms. A key may be referenced only by a dependency bump or may appear in a relevant dependency repository such as DAWGS.
3. Confirm that the change is present in the release target: check the relevant tag or release branch and commit ancestry when available. A match on an unmerged feature branch is not evidence that the change shipped. If the release tag is not present locally, use the closest relevant release branch or merged history and record that limitation for handoff.
4. Inspect the relevant diff and current implementation. Use code, schemas, API definitions, tests, and configuration to confirm behavior and exact names. Existing docs provide context but do not replace implementation evidence.
5. Determine whether the change applies to Community Edition, Enterprise, or both. A commit in a shared repository does not by itself prove feature availability in both editions.

If no evidence confirms that an issue shipped, do not present it as a verified release change. Flag it for manual review and keep any proposed wording limited to what the Jira record actually says.

### 3. Group and classify updates

- Combine issues with the same non-empty **Parent key** into one update. Use the parent summary as context and include every child Jira key in the update's MDX comment, for example `{/*BED-1234, BED-1235*/}`.
- Keep issues with different parents separate unless they clearly describe the same customer-facing change. Do not merge unrelated work just to shorten the page.
- Prefer **Completed Fix Notes** for the change description when present, then verify those notes against the implementation. Use the Jira description and required behaviors as supporting context.
- Treat Jira issue type as a clue, not the release-note category. Classify the shipped behavior: new capability as **New Feature**, improvement or maintenance as **Enhancement**, and corrected faulty behavior as **Fixed Issues**. A Story can be a fix; a Bug label alone does not establish what shipped.
- Use product labels and component tags that match the implementation and established release-note conventions. Use the Enterprise edition pill for Enterprise-only items and avoid implying an Enterprise capability is available in Community Edition.
- Prefer exact terminology and property names from code. Describe only behavior supported by evidence; for example, collecting an identifier does not establish that the product also creates a relationship from it.

### 4. Write detailed release notes

Create `docs/resources/release-notes/[release_date].mdx`. Follow nearby release pages and the examples in `docs/resources/release-notes/AGENTS.md`.

Include the date and four product versions in the standard release table, writing `No release` where appropriate. Use Mintlify `<Update>` components, Jira keys in MDX comments, concise user-focused descriptions, valid tags, and root-relative links. Fixed issues should be grouped by product and organized under component headings.

Order updates by type: **Breaking Change**, **New Feature**, **Enhancement**, then **Fixed Issues**. Within each type, put changes shared by Community and Enterprise before Enterprise-only changes. Rank by user impact, grouping related components when impact is comparable. Use a `<Warning>` for breaking changes.

### 5. Update the summary and navigation

Update `docs/resources/release-notes/summary.mdx` after the detailed page exists. Add the new release at the top with the version table and a concise overview. Use the summary pattern that fits the release size; include links to the most impactful features and enhancements, and link to the detailed fixed-issues list rather than duplicating it.

Update `docs/docs.json` in the same change. Keep the latest two detailed release pages at the top level of release-note navigation and move older pages into the appropriate archive group. Keep older release sections in `summary.mdx`.

## Validation and handoff

- Confirm every in-scope Jira key is represented or flagged, and that grouped updates include all child keys.
- Check version strings, edition labels, MDX syntax, summary anchors, internal links, and `docs.json` navigation.
- Confirm the detailed page exists before editing the summary.
- Follow the repository [validation checklist](../../validation.md) for the smallest relevant non-interactive documentation checks. Run them from `docs/`; do not start a local preview as part of this workflow. Report existing findings or checks that could not run.
- In the handoff, link the changed files and call out any unverified issues, release-target limitations, or validation failures. When not obvious, identify the product edition, target version or release channel, and documentation branch.

## Reference examples

- Detailed release notes: `docs/resources/release-notes/2026-10-07.mdx`
- Release summary: `docs/resources/release-notes/summary.mdx`
- Release-note conventions: `docs/resources/release-notes/AGENTS.md`
