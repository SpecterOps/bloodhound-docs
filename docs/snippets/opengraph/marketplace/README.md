# OpenGraph Marketplace component and data

The `OpenGraphMarketplace` component renders catalog entries exported from the application code. `data/data.generated.jsx` is generated; do not edit it directly.

See [`AGENTS.md`](AGENTS.md) for the catalog sync workflow.

## Component data contract

The generated catalog normalizes both application catalogs into these fields:

- `edition`: `CE` or `Enterprise`.
- `type`: `extension` or `integration`.
- `section`: section title used by the docs page.
- `categoryLabel`: card label shown immediately above the action button (`Enterprise Extension`, `Community Extension`, or `Integration`).
- `name`, `author`, `publisher`, `availability`, `badge`, and `badgeColor`: listing metadata from the app catalog.
- `description`, `href`, and `linkLabel`: card content and action.
- `logo`: docs-local asset path for the copied application logo.

The component uses this shared shape for rendering and filtering. If either application's catalog shape changes, update the normalizer in `scripts/sync-opengraph-marketplace.mjs` and rerun the sync.
