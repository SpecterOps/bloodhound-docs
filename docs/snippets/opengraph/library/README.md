# OpenGraph library data

The BloodHound Marketplace page is rendered from JSON source files in this directory. Update those source files, then regenerate the JSX bridge that Mintlify imports.

## Files

- `grid.jsx`: Renders the Marketplace page.
- `data/data.generated.jsx`: Generated data bridge imported by `docs/opengraph/library.mdx`.
- `data/extensions/*.json`: Community extension categories grouped by vendor or technology.
- `data/enterprise.json`: BloodHound Enterprise extension cards.
- `data/integrations.json`: Integration cards.
- `data/tools.json`: OpenGraph tool cards.
- `data/vendor-icons.json`: Vendor icon type mappings for cached favicon assets.
- `../../../assets/icons/vendor-favicons/`: Cached vendor favicon assets used by `data/vendor-icons.json`.
- `../../../../scripts/generate-opengraph-library-data.mjs`: Validates source data and regenerates `data/data.generated.jsx`.
- `../../../../scripts/fetch-opengraph-vendor-favicons.mjs`: Fetches and refreshes cached vendor favicon assets.

## Add or update an entry

1. Edit the relevant JSON source file.
1. For a new community vendor or technology, add a new file in `data/extensions/`.
1. Add or update the entry fields:
    - `name`: Card title.
    - `description`: One-sentence summary shown on the card.
    - `href`: Internal docs path or external repository URL.
    - `maintainer`: Use `specterops` or `community` for community extension and tool entries.
    - `authors`: List author names and optional links for community extension and tool entries.
    - `icon`: Set `type` and `label` for category, enterprise extension, and integration card icons.
    - `vendorName`: Optional vendor label for enterprise, integration, and tool cards.
    - `action`: Optional button text. The renderer defaults to `View on GitHub`.
1. If the entry uses a new vendor icon type, add the favicon asset to `docs/assets/icons/vendor-favicons/`.
    - Use square favicon assets. The Marketplace renders all vendor icons with the same dimensions.
1. Add the icon type to `data/vendor-icons.json`.
    - If the entry uses a shared FontAwesome icon, add the icon type to the built-in icon map in `grid.jsx` and to `builtInIconTypes` in `scripts/generate-opengraph-library-data.mjs`.
    - The generator validates icon types before writing `data/data.generated.jsx`. If you update only `grid.jsx`, `validateIcon` fails because the generator does not recognize the built-in icon type.
1. Regenerate the JSX data bridge:

    ```bash
    just generate-opengraph-library
    ```

1. Review the generated changes in `data/data.generated.jsx`.
1. Validate the source files and generated bridge:

    ```bash
    just check-opengraph-library
    ```

## Refresh vendor favicons

Use `just fetch-opengraph-library-favicons` when you add a new vendor icon source or when a vendor changes its favicon.

```bash
just fetch-opengraph-library-favicons
```

The recipe runs `scripts/fetch-opengraph-vendor-favicons.mjs`. The script fetches favicon assets for the vendor list defined in the script, verifies each fetched file against `data/vendor-icons.json`, writes the files to `docs/assets/icons/vendor-favicons/`, and prints the source URL used for each saved asset.

The script first tries an explicit `faviconUrl` when one is configured for a vendor, otherwise it tries `/favicon.ico` for the vendor site. If that request fails, it checks the site HTML for icon links and uses the best available icon candidate. When the image format changes, update `data/vendor-icons.json` before replacing cached assets.

After refreshing favicons, review the icon changes and run:

```bash
just check-opengraph-library
```

## Sorting and visibility

The generator sorts community categories, community entries within each category, enterprise extensions, integrations, and tools alphabetically by `name`.

Every entry in `data/extensions/` is rendered. The `maintainer` value selects the section: `specterops` entries appear under "SpecterOps employee-created Extensions", and all other entries appear under "Community-Created Extensions".

## Validation

The generator validates the local data contract before writing `data/data.generated.jsx`.

Validation checks include:

- Required fields for categories, extension cards, integration cards, and tool cards.
- `maintainer` values for community extension and tool entries.
- Author names and author URL syntax.
- Internal `href` values that resolve to local docs pages.
- External `href` URL syntax. The generator does not check whether external URLs are reachable.
- Icon `type` and `label` values.
- Built-in icon types listed in `scripts/generate-opengraph-library-data.mjs`.
- Favicon assets referenced by `data/vendor-icons.json`.
- Duplicate category names, entry names, and entry `href` values.
- Stale generated data when you run `just check-opengraph-library`.
