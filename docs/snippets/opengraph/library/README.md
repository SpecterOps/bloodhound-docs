# OpenGraph Marketplace data

The Marketplace component renders catalog entries exported from the application code. `data/data.generated.jsx` is generated; do not edit it directly.

## Sync the catalogs

Check out the BloodHound and bloodhound-enterprise repositories as siblings of this repository, then run:

```bash
just sync-opengraph-marketplace
```

The command imports the catalogs at:

- `../BloodHound/cmd/ui/src/views/Marketplace/marketplaceCatalog.ts`
- `../bloodhound-enterprise/cmd/ui/src/views/Marketplace/marketplaceCatalog.ts`

It copies each referenced logo from that repository's `cmd/ui/public/` directory and regenerates `data/data.generated.jsx`. The sync requires Node.js with built-in TypeScript type stripping support. If the repositories are checked out elsewhere, pass `bh_root` and `bhe_root` to the Just recipe:

```bash
just sync-opengraph-marketplace bh_root=/path/to/BloodHound bhe_root=/path/to/bloodhound-enterprise
```

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
