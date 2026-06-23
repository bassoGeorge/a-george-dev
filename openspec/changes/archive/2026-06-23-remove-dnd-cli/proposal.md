## Why

The `dnd-cli` Ink terminal wizard was built to scaffold character `.data.ts` files but has gone stale and won't see further use. Removing it reduces monorepo maintenance surface with no loss of active functionality.

## What Changes

- **BREAKING** Delete `apps/dnd-cli` and all its source files
- Delete the orphaned OpenSpec spec at `openspec/specs/character-cli/spec.md`
- Remove all references to `dnd-cli` from `CLAUDE.md`
- Character `.data.ts` files will be authored manually going forward

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

_(none — this is a pure removal with no requirement changes to existing capabilities)_

## Impact

- `apps/dnd-cli` — deleted entirely (~803 lines across 9 files)
- `openspec/specs/character-cli/spec.md` — deleted (orphaned spec)
- `CLAUDE.md` — updated to remove dnd-cli command and app entry
- `packages/dnd-character-sheet/src/characters/example-wizard.data.ts` — retained as a working example character
- No other apps or packages import from `@ageorgedev/dnd-cli`, so no dependency updates required
