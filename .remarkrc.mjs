import { basePlugins } from "./.remarkrc.shared.mjs";

export default {
  // Full pages must start at H2 (the Mintlify page title fills H1).
  // Nested fragments like docs/snippets/ override this rule locally
  // because they're embedded under an existing heading and legitimately
  // start below H2.
  plugins: [...basePlugins, ["remark-lint-first-heading-level", 2]],
};
