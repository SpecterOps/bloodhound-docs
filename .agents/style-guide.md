# BloodHound documentation writing style

Use this guide with `docs/AGENTS.md` when writing or substantially editing documentation.

## Structure and progression

- Write task-based page titles and concise, sentence-case headings. Avoid gerunds and question headings.
- Introduce the reader's goal, define unfamiliar terms, and explain why the task matters before giving instructions.
- Put the most important information first and use progressive disclosure.
- Include prerequisites before procedures and the expected result after critical steps.
- Keep each section focused on one objective. Break up dense prose with lists, tables, code, images, tabs, or diagrams when they improve comprehension.
- Add troubleshooting guidance for known failure modes and recovery steps.

## Voice and clarity

- Write in present tense, active voice, and second person.
- Use direct, accessible language. Prefer “Select **Settings**” over “You can click **Settings**.”
- Be directive and concise. Avoid marketing language, filler, and unnecessary jargon.
- Define unfamiliar terms and abbreviations on first use, linking to a fuller explanation when one exists.
- Use parallel structure in headings and lists.

## Headings, links, and lists

- Start body sections at H2 because the metadata title renders as H1.
- Use descriptive inline anchor text and root-relative links for pages within the documentation site. Never use “click here.”
- Verify links point to the correct page and section.
- Use numbered lists for ordered actions and bullets for unordered guidance.
- Keep lists concise and task-focused. Avoid terminal punctuation on fragments; use periods for complete sentences.

## UI, code, and permissions

- Match UI labels and capitalization exactly. Format UI labels as bold, such as **Settings**; include the element type only when it adds clarity.
- Format commands, literal values, roles, permissions, configuration keys, API fields, and schema fields with backticks.
- Use fenced code blocks for multi-line commands or code. Show the minimal working example and expected output when it helps the reader verify success.
- Document required roles and permissions near their first use.
- Avoid ambiguous placeholders and wildcard imports. Use explicit values or clearly named placeholders.

## Images and accessibility

- Redact sensitive data from screenshots and use demo-safe profiles.
- Use consistent image capture settings for zoom, theme, and window chrome.
- Add callouts or annotations only when they clarify the relevant UI region.
- Provide meaningful alt text for informative images and mark decorative images appropriately.
- Never use color alone to communicate meaning; pair it with text, icons, or another accessible indicator.
- Optimize file sizes and store assets in the repository's established locations.

## Icons and terminology

- Use icons sparingly and only when their meaning is clear from the surrounding text.
- Use the icon library and patterns established by the repository. Verify unfamiliar icons before using them.
- Organize content around the customer workflow: get started; understand core concepts; collect data; analyze results; manage the platform; extend and reference.
- Use “BloodHound Enterprise” and “BloodHound Community Edition” consistently. Use “BloodHound CE” only where the surrounding context makes the abbreviation clear.
