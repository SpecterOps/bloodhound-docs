# Documentation validation checklist

Run `mint` commands from the `docs/` directory after changing documentation. Run `npm run lint:docs` from the repository root, after `npm install` (requires Node 26, matching `.github/workflows/lint.yaml`). Use the smallest relevant set for the change, and report anything you could not run.

| Change | Required checks |
| --- | --- |
| Any documentation change | `mint validate`, `mint broken-links` |
| Markdown/MDX content or lint config changes | `npm run lint:docs` (from the repository root) |
| Images, UI instructions, navigation, or layout | `mint a11y` |
| Layout or navigation changes | `mint dev` for a local preview |
| Project-specific workflow | Check the repository `justfile` and run the applicable recipe |

Before handoff, also inspect the diff for:

- Correct frontmatter, headings, links, image paths, imports, and Mintlify syntax
- Correct Enterprise and Community Edition labeling
- Reused nearby patterns and updated navigation for new, removed, or moved pages
- Meaningful alt text and redacted screenshot data
