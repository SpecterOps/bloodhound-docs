# Repository instructions

These instructions apply across the repository. More specific `AGENTS.md` files add rules for the directories they contain.

## Instruction hierarchy

- Follow the instruction hierarchy established by the execution environment and apply the most specific applicable `AGENTS.md` file.
- Treat nested `AGENTS.md` files as scoped additions. Do not copy parent instructions into them; document only the rules that are specific to that subtree.
- Use `.agents/` for supporting guidance that is referenced by an applicable `AGENTS.md`. A `.agents/` directory does not create an instruction scope by itself.

## Documentation work

When working under `docs/`, read [`docs/AGENTS.md`](docs/AGENTS.md) and the supporting guidance it identifies. The documentation instruction map is:

| Work | Guidance |
| --- | --- |
| Writing or substantially editing pages | [`.agents/style-guide.md`](.agents/style-guide.md) |
| Adding, moving, or reorganizing pages | [`.agents/info-architecture.md`](.agents/info-architecture.md) |
| Adding or changing Mintlify components or layout | [`.agents/mintlify-guidance.md`](.agents/mintlify-guidance.md) |
| Validating documentation changes | [`.agents/validation.md`](.agents/validation.md) |

Keep the root `AGENTS.md` focused on repository-wide guidance and this routing map. Put documentation-specific rules in `docs/AGENTS.md` or a more specific nested file.
