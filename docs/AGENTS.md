# Documentation instructions

These instructions apply to BloodHound Community Edition and BloodHound Enterprise documentation under `docs/`.

## Apply these instructions

- Follow the instruction hierarchy established by the execution environment and apply the most specific applicable `AGENTS.md`.
- From the repository root, read [`.github/style-guide.md`](/.github/style-guide.md) when writing or substantially editing a page.
- From the repository root, read [`.github/info-architecture.md`](/.github/info-architecture.md) when adding, moving, or reorganizing pages.
- From the repository root, read [`.github/mintlify-guidance.md`](/.github/mintlify-guidance.md) when adding or changing Mintlify components.
- Use the validation checklist in [`.github/validation.md`](/.github/validation.md) before handing off documentation changes. Report any required checks that you could not run.

## Verify product behavior

Before documenting substantive product behavior—such as UI behavior, commands, configuration, APIs, permissions, compatibility, limits, or version-specific behavior—identify the documentation target and inspect the matching local implementation repository when it is available. Record the target edition, product version or release channel, and documentation branch in the hand-off notes when they are not obvious.

Relevant repositories include BloodHound Community Edition, BloodHound Enterprise, SharpHound, AzureHound, OpenHound, and the applicable OpenHound collector repository.

- Confirm that the repository, branch, and version match the documentation target.
- Use source code, configuration schemas, API definitions, CLI help, tests, and current examples as evidence. Use existing documentation for context, but do not treat it as the sole source for product behavior when matching implementation evidence is available.
- If the matching implementation is unavailable, record that limitation and the authoritative alternative source in the issue, pull request, or handoff notes rather than adding internal source-review details to the customer-facing page.
- If implementation and documentation disagree, determine whether the difference is version- or branch-specific. Preserve known versioned behavior and call out unresolved discrepancies.

## Preserve accuracy and product boundaries

- Write factual, concise documentation for professional cybersecurity practitioners. Do not invent product behavior, versions, issue IDs, links, screenshots, permissions, or configuration values.
- Identify whether each page, feature, command, permission, or procedure applies to BloodHound Enterprise, BloodHound Community Edition, or both. For product pages, use the established edition pill asset at the top of the page; label edition-specific sections explicitly when a page covers both editions.
- Never imply that an Enterprise-only capability is available in Community Edition, or that a Community Edition workflow applies unchanged to Enterprise.
- When editions require different workflows, separate and label them clearly.
- Use [`/docs/resources/glossary/overview.mdx`](/docs/resources/glossary/overview.mdx) as the source of truth for BloodHound terminology, definitions, capitalization, and product-specific usage. If implementation evidence conflicts with the glossary, verify the current product behavior and update or flag the glossary separately.

## Page requirements

- Include `title` and `description` frontmatter on every new MDX page. Keep titles at or below 50 characters and descriptions at or below 160 characters.
- Separate conceptual, procedural, and reference content. For task pages, lead with the reader's goal, expected outcome, and prerequisites. For conceptual and reference pages, lead with the purpose and context and include prerequisites only when they are relevant.
- Use `<Steps>` for sequential procedures.
- Start body sections at H2 because the frontmatter title renders as the H1.
- Update `docs/docs.json` when adding, removing, or moving a page.
- Inspect nearby pages and reuse established content, component, and asset patterns.

## Validate changes

See `.github/validation.md` for the validation checklist. Run the smallest relevant set of checks from the `docs/` directory and report anything you could not run.
