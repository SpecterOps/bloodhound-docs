# OpenGraph Marketplace catalog instructions

When changing Marketplace catalog data or the docs component:

- Treat `data/data.generated.jsx` and `docs/assets/opengraph-marketplace/` as generated outputs. Do not edit them directly.
- Read the catalogs from the local BloodHound and bloodhound-enterprise repositories. By default, checkouts should be siblings of the docs repository.
- Run `just sync-opengraph-marketplace` after changing the source catalogs or the catalog normalizer. The script copies referenced logos from each code repository and regenerates the docs catalog module.
- If the code repositories are elsewhere, pass their paths: `just sync-opengraph-marketplace bh_root=/path/to/BloodHound bhe_root=/path/to/bloodhound-enterprise`.
- The sync imports the TypeScript catalogs directly, so run it with Node.js that supports built-in TypeScript type stripping.
- Keep the docs data contract documented in `README.md`. If the app catalog shape changes, update `scripts/sync-opengraph-marketplace.mjs` to normalize it for the component.
