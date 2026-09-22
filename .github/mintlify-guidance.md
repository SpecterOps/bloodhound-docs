# Mintlify guidance

Use this guide when adding or changing Mintlify components or page layout.

- For built-in Mintlify components, treat the [Mintlify components source repository](https://github.com/mintlify/components) as the source of truth for component names, properties, nesting, and behavior.
- If the source repository and local examples do not resolve a question, consult the [Mintlify documentation](https://www.mintlify.com/docs).
- Use only components supported by the installed Mintlify version and established repository examples. Do not invent component names, properties, or nesting.
- Use a component only when it improves comprehension, organization, or task completion.

## Use repository components

- Treat components defined in `/docs/snippets/**/*.jsx` and reusable MDX snippets under `/docs/snippets/**/*.mdx` as repository-owned components, not Mintlify built-ins.
- Before using a repository component, inspect its implementation and at least one existing call site. Confirm its import path, props, children, output, accessibility behavior, and any browser-side state or storage behavior.
- Reuse an existing repository component when it fits the task. Do not replace it with a built-in component or create a duplicate without a clear reason.
- Do not invent props or behavior for a repository component. If its implementation and call sites disagree, resolve the discrepancy before documenting or extending it.
- When creating or editing a JSX Mintlify snippet, follow the existing arrow-function and export patterns in nearby snippets.

## Use built-in components

- Use typed callouts such as `<Note>`, `<Warning>`, `<Info>`, `<Tip>`, `<Check>`, and `<Danger>`, or use `<Callout>` for custom icons and colors. Use only properties supported by the selected component.
- Use `<Steps>` with child `<Step title="...">` components for sequential tasks. Split procedures longer than 10 steps into logical groups with separate `<Steps>` blocks.
- Use `<Tabs>` with child `<Tab title="...">` components for genuinely alternative workflows, platform versions, or language examples. Do not hide required sequential actions in tabs.
- Use `<Accordion>` and `<AccordionGroup>` for optional details and progressive disclosure, not for essential steps.
- Use `<Card>` with `<Columns>` for related linked content in a responsive layout. Follow nearby patterns when editing older pages unless intentionally migrating them.
- Use `<Tooltip>` for brief definitions or supporting context without interrupting the main flow. Link to the full explanation when one exists.
- Use `<Mermaid>` when a relationship, flow, or sequence is easier to understand visually than in prose.
