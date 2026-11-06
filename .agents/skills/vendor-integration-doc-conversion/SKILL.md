---
name: vendor-integration-doc-conversion
description: Use when converting vendor-supplied integration guides, PDFs, Word docs, or draft notes into BloodHound documentation under docs/integrations. This skill is for restructuring source material into repo-native MDX pages, matching existing integration patterns, updating navigation and overview entries, and preserving accuracy while removing vendor-specific noise.
---

# Vendor Integration Doc Conversion

Use this skill when a user wants to turn source material from a vendor or partner into BloodHound integration docs.

This is not a file-format conversion skill. The goal is to transform source material into accurate, task-oriented BloodHound docs that match the existing `docs/integrations` information architecture.

## Outcomes

By the end of the workflow, you should usually have:

- One or more MDX pages under `docs/integrations/<integration-name>/`
- Matching updates to `docs/docs.json`
- A new or updated entry in `docs/integrations/overview.mdx` that matches the copy used by Product Marketing
- Clear notes about any missing facts, placeholder assets, or follow-up work

## Default workflow

1. Inspect existing integration patterns before writing.
2. Extract or read the source material.
3. Normalize the content into BloodHound doc structure.
4. Write the MDX pages.
5. Update nav and overview.
6. Validate syntax and spot-check structure.

Do not dump vendor text into one long page unless the repo already uses that pattern for the same integration type.

## Start here

Before writing, inspect:

- `docs/integrations/overview.mdx`
- `docs/docs.json`
- Two or three nearby integration examples that match the destination pattern

Prefer the closest examples by integration shape:

- `configure` + `use`
- `install` + `use` + `troubleshoot`
- `configure` + `use` + `reference`

## Source handling

Treat the source as content to normalize, not a format to preserve.

Choose the simplest reliable extraction path for the source format:

- **Preferred path**: Use `scripts/extract_vendor_source.sh <file>` for supported formats
- **PDF**: Prefer `pdftotext -layout <file> -`
- **Word `.docx`**: Prefer `textutil -convert txt -stdout <file>` on macOS
- **Word `.docx` fallback**: If plain-text export is poor, inspect the document structure by unzipping the `.docx` package and reading `word/document.xml` or related XML parts
- **Other text-friendly formats**: Extract plain text first if possible

For all source types:

- Read the output in chunks if the file is large
- Preserve headings, lists, tables, and procedure boundaries
- Treat page numbers, repeated headers or footers, figure labels, tracked-change remnants, comment artifacts, and internal publication notes as noise unless they carry reader-visible meaning

If the helper script is available, prefer it before reaching for format-specific one-off commands.

## Required transformation rules

Apply these rules every time:

- Preserve facts, but rewrite structure and phrasing for BloodHound docs
- Remove vendor-only framing such as “in this folder we shared with you,” figure numbering, or internal publication notes
- Convert conceptual, procedural, and troubleshooting content into separate sections or pages when the source naturally supports that split
- Use task-based headings
- Add a short introduction paragraph that tells the reader what the integration does and what the page covers
- Prefer `Steps` for procedures, but group long, multi-step procedures into heading-separated sections
- Use tables for field definitions, requirements, and comparison-style content
- Add a concise **Prerequisites** section before configuration steps
- Add **Next steps** links when the integration spans multiple pages

Do not invent:

- Product capabilities
- Role requirements
- Supported actions
- UI labels
- Asset names
- API behavior

If a fact is missing or ambiguous, call it out in the final handoff or ask the user if the ambiguity materially affects the output.

## Page split heuristics

Use these defaults unless the source strongly suggests another structure:

- Create `configure.mdx` when the source includes installation, package import, instance setup, connection details, scheduling, or enablement
- Create `use.mdx` when the source explains how analysts or operators work with the imported data after setup
- Create `troubleshoot.mdx` when the source includes common errors, test failures, auth failures, or validation guidance
- Create `reference.mdx` only when the user provides a "functional specification" or if there's stable lookup content such as commands, actions, field mappings, or schemas that would clutter the primary task pages

If the source is short, a two-page split is often enough.

## Writing standards for this repo

- Match the style and terminology used by nearby integration docs
- Keep BloodHound product names and edition references consistent
- Use the enterprise pill image when the integration is enterprise-only
- Prefer direct commands and present tense
- Keep procedures linear and explicit
- Avoid raw vendor marketing language

When the source is weakly organized, rebuild it around the user journey:

1. What the integration does
2. What the reader needs first
3. How to install or configure it
4. How to verify it works
5. How to use it
6. How to troubleshoot it

## Overview and nav updates

When you add a new integration:

- Add the page group to `docs/docs.json` in the most appropriate location and in alphabetical order
- Add or update the integration card in `docs/integrations/overview.mdx` with marketing copy
- Keep the card concise and factual
- Mirror the shape and tone of existing cards and use the marketing copy provided by Product Marketing

## Validation

At minimum:

- Validate JSON syntax if you edited `docs/docs.json`
- Re-read the new MDX files for broken structure, missing frontmatter, and awkward copy-paste artifacts
- Confirm internal links match the final page paths

If local docs validation or preview commands already exist in the repo, run them when practical.

## Common failure modes

Watch for these problems:

- Copying source wording too literally
- Leaving page-number artifacts, figure callouts in prose, or references to step numbers
- Leaving Word export artifacts such as broken bullets, orphaned headings, or revision noise
- Preserving a poor vendor structure instead of adapting it
- Mixing setup steps and analyst usage into one oversized page
- Adding unsupported claims to the overview card
- Forgetting `docs/docs.json`

## Reference file

For reusable templates and a pre-publish checklist, read:

- `references/page-templates.md`

For standardized extraction, use:

- `scripts/extract_vendor_source.sh`
