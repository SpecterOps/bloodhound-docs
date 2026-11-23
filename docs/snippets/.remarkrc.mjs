import { basePlugins } from "../../.remarkrc.shared.mjs";

// Snippets are embedded fragments reused across pages at varying heading
// depths, so they don't follow the "page starts at H2" rule enforced for
// full pages by the root .remarkrc.mjs. All other lint rules still apply.
export default {
  plugins: [...basePlugins],
};
