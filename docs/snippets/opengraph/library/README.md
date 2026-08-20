# OpenGraph library data

The BloodHound Marketplace page is rendered from JSON source files in this directory. Update those source files, then regenerate the JSX bridge that Mintlify imports.

## Files

- `grid.jsx`: Renders the Marketplace page and maps icon types to cached vendor favicon assets.
- `data/data.generated.jsx`: Generated data bridge imported by `docs/opengraph/library.mdx`.
- `data/extensions/*.json`: Community extension categories grouped by vendor or technology.
- `data/enterprise.json`: BloodHound Enterprise extension cards.
- `data/integrations.json`: Integration cards.
- `data/tools.json`: OpenGraph tool cards.

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
1. Add the icon type to `vendorIconMap` in `grid.jsx`.
    - If the entry uses a shared FontAwesome icon, add the icon type to the built-in icon map in `grid.jsx`.
1. Regenerate the JSX data bridge:

    ```bash
    just generate-opengraph-library
    ```

1. Review the generated changes in `data/data.generated.jsx`.
1. Refresh cached vendor favicons when a vendor site changes:

    ```bash
    just fetch-opengraph-library-favicons
    ```

1. Validate the source files and generated bridge:

    ```bash
    just check-opengraph-library
    ```

## Sorting and visibility

The generator sorts community categories, community entries within each category, enterprise extensions, integrations, and tools alphabetically by `name`.

The Community Extensions section renders all entries in `data/extensions/`, regardless of `maintainer` value.

## Validation

The generator validates the local data contract before writing `data/data.generated.jsx`.

Validation checks include:

- Required fields for categories, extension cards, integration cards, and tool cards.
- `maintainer` values for community extension and tool entries.
- Author names and author URL syntax.
- Internal `href` values that resolve to local docs pages.
- External `href` URL syntax. The generator does not check whether external URLs are reachable.
- Icon `type` and `label` values.
- Favicon assets referenced by `vendorIconMap` in `grid.jsx`.
- Duplicate category names, entry names, and entry `href` values.
- Stale generated data when you run `just check-opengraph-library`.
