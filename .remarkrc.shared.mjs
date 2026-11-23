// Plugins shared by the root lint config and any nested overrides (e.g.
// docs/snippets/.remarkrc.mjs). Keep rules that depend on full-page context
// (like remark-lint-first-heading-level) out of this shared list so nested
// configs can opt in or out of them explicitly.
export const basePlugins = [
  "remark-mdx",
  "remark-frontmatter",
  "remark-lint",
  ["remark-lint-heading-style", "atx"],
  "remark-lint-no-heading-content-indent",
  ["remark-lint-list-item-indent", "one"],
  "remark-lint-list-item-content-indent",
  ["remark-lint-ordered-list-marker-style", "."],
  ["remark-lint-ordered-list-marker-value", "one"],
  ["remark-lint-unordered-list-marker-style", "consistent"],
  ["remark-lint-code-block-style", "fenced"],
  ["remark-lint-fenced-code-flag", { allowEmpty: false }],
  ["remark-lint-fenced-code-marker", "`"],
  "remark-lint-no-duplicate-definitions",
  "remark-lint-no-unused-definitions",
  ["remark-lint-no-undefined-references", { allow: ["BHE only", "CE only"] }],
];
