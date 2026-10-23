---
name: update-openapi-spec
description: Update the BloodHound REST API reference from a release-specific OpenAPI specification.
---

# Update the BloodHound REST API reference

Use this skill when updating the BloodHound REST API reference in the bloodhound-docs repository for a product release.

The OpenAPI specification is the source of truth for API endpoint pages. Mintlify generates those pages automatically from docs/openapi.json; do not create or maintain an individual .mdx file for each path and operation.

The source branch is release-specific. You must have an explicit target stage branch or version before fetching the specification. If the user does not provide one, ask which branch to fetch and wait for the answer before running the `just` recipe. Do not infer a branch from the current documentation version, date, or repository state.

## Workflow

1. Confirm the target stage branch or version before fetching the specification.
1. Fetch the release-specific OpenAPI specification.
1. Compare it with the specification on the main branch.
1. Review endpoint, tag, and schema changes.
1. Confirm the runtime OpenAPI configuration and overlays still apply.
1. Validate the documentation build and inspect a local rendered site.
1. Review the complete diff and update related non-API documentation when needed.

## Fetch the updated specification

Run the just recipe from the root of the bloodhound-docs repository. The recipe fetches the specification from the version-specific stage branch in the BloodHound community code repository.

The recipe accepts the version suffix and constructs the branch as `stage/{{ VERSION }}`. For example, a requested branch of `stage/v9.8.0` requires the recipe argument `v9.8.0`:

```bash
just update-openapi v9.8.0
```

If the user provides a full branch name such as `stage/v9.8.0`, remove only the `stage/` prefix when passing the argument. If the user provides no target branch or version, prompt for it before executing this recipe.

Before fetching, verify that the expanded command targets the requested branch. The resulting URL should match:

```text
https://raw.githubusercontent.com/SpecterOps/BloodHound/stage/<version>/packages/go/openapi/doc/openapi.json
```

This command overwrites `docs/openapi.json`. Keep the server URL as `/` in the source specification.

The API Reference configuration applies `docs/overlays/replace-servers.yaml` when Mintlify builds the site. That overlay replaces `/` with `https://your-tenant.bloodhoundenterprise.io` so generated request examples use the expected API server. Do not edit the server URL in `docs/openapi.json` for a release and do not update endpoint pages individually.

## Compare and review changes

Use `oasdiff` to compare the updated specification with the version on the main branch. Install oasdiff if it is not already available.

Print a summary:

```bash
oasdiff summary <(git show main:docs/openapi.json) docs/openapi.json
```

Write a changelog to a temporary location for detailed review, the pull request description, and release-note planning. Do not leave a generated changelog in the repository unless the user requests it:

```bash
oasdiff changelog <(git show main:docs/openapi.json) docs/openapi.json > /tmp/bloodhound-openapi-change.log
```

Review the output for:

- New, removed, or renamed paths.
- New, removed, or changed operations on existing paths.
- Changes to operation summaries, descriptions, tags, or deprecation status.
- Changes to the Community and Enterprise tags that affect availability badges.
- Changes to parameters, request bodies, response bodies, and schemas.

Parameters, request bodies, responses, and schemas render automatically from the updated specification. Check related guides and procedures outside the API Reference when those changes affect documented workflows.

## Understand the runtime API reference

The API Reference uses the object form of the openapi property in docs/docs.json. The configuration should keep the overview page as a normal page and let Mintlify generate endpoint pages from the specification:

```json
{
  "tab": "API Reference",
  "openapi": {
    "source": "openapi.json",
    "directory": "reference",
    "overlays": [
      "overlays/replace-servers.yaml",
      "overlays/add-product-badges.yaml"
    ]
  },
  "groups": [
    {
      "group": "Get Started",
      "pages": ["reference/overview"]
    }
  ]
}
```

Do not run the Mintlify OpenAPI scraper for this workflow. Do not create, update, delete, or add navigation entries for individual endpoint `.mdx` pages. Keep `reference/overview.mdx` and update it only when the API overview content changes.

### Server URL overlay

`docs/overlays/replace-servers.yaml` changes the server URL only in the transformed document that Mintlify renders. The source `docs/openapi.json` remains release-specific and keeps its relative `/` server URL.

### Product badge overlay

The product badge overlay adds `x-mint.content` to generated operations based on the operation’s tags array:

- Community and Enterprise: use the BloodHound Enterprise and CE badge.
- Enterprise without Community: use the BloodHound Enterprise badge.

Maintain this logic in the product badge overlay, not in individual endpoint pages. If a release introduces a new edition-tag combination, update the overlay deliberately and verify the new combination locally.

The overlay is applied by the `openapi.overlays` list in `docs/docs.json`. Keep the overlay paths synchronized with the files in `docs/overlays/`; do not copy the transformed x-mint fields into `docs/openapi.json`. Use the filenames configured by the repository; the product badge overlay is currently `overlays/add-product-badges.yaml`.

## Update documentation configuration only when needed

Normally, an OpenAPI update requires no changes to docs/docs.json. Update the configuration only when the API Reference structure or overlay configuration changes.

If the release adds or changes endpoint tags, update the OpenAPI source or product badge overlay as appropriate. Do not add generated endpoint paths to docs.json.

## Validate the result

Validation is more than running mint validate. Complete all of the following before completing the update.

### Compare the specifications

Run both `oasdiff` commands above and review the summary and changelog. Confirm that every intended API change appears and that no unrelated change entered `docs/openapi.json`.

Also verify the source file directly:

```bash
jq empty docs/openapi.json
jq -e '.servers[0].url == "/"' docs/openapi.json
```

### Validate the Mintlify build

Run Mintlify validation from the `docs/` directory, where `docs.json` exists:

```bash
cd docs
mint validate
``` 

This verifies the documentation configuration, OpenAPI specification, and referenced overlays. Resolve all warnings and errors.

If validation fails with an `EPERM` error while Mintlify cleans a cache under `~/.mintlify`, retry with the permissions required to manage that Mintlify cache. Treat cache permissions separately from documentation validation errors.

### Build and inspect the local site

Start the local Mintlify preview from the `docs/` directory:

```bash
cd docs
mint dev
```

Use the local site to inspect the API Reference in a browser when a browser is available. Confirm that:

- The API Reference tab and overview page render.
- The generated sidebar groups match the OpenAPI tags and expected product structure.
- Representative Enterprise-and-CE endpoints display the combined badge.
- Representative Enterprise-only endpoints display the Enterprise badge.
- Endpoint summaries, descriptions, parameters, request bodies, responses, and examples render without errors.
- The generated endpoint pages use the expected `/reference` URL namespace.
- The server URL in the request builder reflects the server overlay.
- The terminal running the local preview reports no build or rendering errors.

If no browser is available, use HTTP requests against the local preview as a fallback. Check the overview and representative generated endpoint URLs, and inspect the returned HTML for the server overlay, product badges, endpoint summaries, and changed request or response details. Report that visual browser inspection was unavailable.

Treat preview-runtime messages such as `Error processing schema: impossible schema combination` as findings even when `mint validate` passes. Inspect affected representative pages, determine whether they render, and report any unresolved runtime warning rather than claiming a clean preview.

Stop the local preview after inspection.

## Final review

Before completing the update:

- Confirm that `docs/openapi.json` contains the intended release specification and still uses `/` for its source server URL.
- Confirm that the `docs.json` OpenAPI configuration references the required overlays.
- Confirm that no individual endpoint `.mdx` files or endpoint navigation entries were generated.
- Review the complete diff for unintended changes.
- Run `git status --short` and `git diff --check`; confirm that generated temporary review files are not left in the repository.
- Include the relevant `oasdiff` findings and validation results in the pull request description.
