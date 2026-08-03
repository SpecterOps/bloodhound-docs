# Repository Guidelines

## Project Structure & Module Organization

Documentation source lives in `docs/`. Pages are MDX files grouped by user task, such as `docs/get-started/`, `docs/collect-data/`, and `docs/manage-bloodhound/`. Register new pages in `docs/docs.json`; a page that is not in navigation will not appear in the sidebar. Store downloadable examples and page media in `docs/assets/` or `docs/images/`. Root-level `img/` contains repository branding. Validation utilities live in `scripts/`, and reusable task commands are defined in `justfile`.

## Build, Test, and Development Commands

- `npm i -g mintlify` installs the documentation CLI (Node.js 19 or newer is required).
- `cd docs && mintlify dev` starts the local preview. Review every changed page and navigation entry before submitting.
- `just check-edges ../BloodHound` compares edge-reference pages with a sibling BloodHound source checkout and writes manifests under `scripts/output/`.
- `just update-openapi <version>` refreshes `docs/openapi.json` from the specified BloodHound stage version; use it only for an intentional API-spec update.

There is no standalone unit-test suite or coverage threshold. A clean local render, correct links, and successful relevant validation are the acceptance checks.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, final newline, spaces, and four-space indentation for Markdown, MDX, and Python. Name MDX files with lowercase kebab-case (for example, `create-collector.mdx`). Begin pages with YAML frontmatter containing at least `title`; add `description` when useful. Use present tense, active voice, task-oriented headings, and progressive disclosure. For product-specific pages, include the appropriate Enterprise/Community audience badge described in `Contributing-To-Docs.md`. Prefer root-relative internal links such as `/collect-data/overview`.

## Testing Guidelines

Preview content with Mintlify and check headings, code blocks, tables, images, and mobile-friendly layout. When adding a page, verify its path in `docs/docs.json`. For changes under `docs/resources/edges/`, run `just check-edges` and investigate every missing or extra edge.

## Commit & Pull Request Guidelines

Recent history mixes ticket-prefixed subjects with Conventional Commit subjects; follow the documented convention where possible, such as `docs: add collector setup` or `fix: correct OpenHound command`. Keep commits small, descriptive, and signed. Open an issue before starting a pull request, branch from current `main`, and link the issue in the PR description. Summarize affected pages and validation performed; include screenshots for visual or layout changes. Address review feedback and complete the CLA check before merge.
