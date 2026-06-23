## REMOVED Requirements

### Requirement: CLI wizard runs from monorepo
**Reason**: The dnd-cli application is being removed as it is no longer useful.
**Migration**: Character `.data.ts` files must be authored manually. Use `packages/dnd-character-sheet/src/characters/example-wizard.data.ts` as a reference template.

### Requirement: Generated files land in dnd-character-sheet
**Reason**: The dnd-cli application is being removed.
**Migration**: Write `.data.ts` files directly into `packages/dnd-character-sheet/src/characters/` by hand.

### Requirement: Generated file uses correct import path
**Reason**: The dnd-cli application is being removed.
**Migration**: When hand-authoring character files, use `import type { Character } from "../lib/models/character"` and reference `example-wizard.data.ts` for the correct structure.

### Requirement: Package follows monorepo conventions
**Reason**: The dnd-cli application is being removed.
**Migration**: N/A — the package will no longer exist in the workspace.
