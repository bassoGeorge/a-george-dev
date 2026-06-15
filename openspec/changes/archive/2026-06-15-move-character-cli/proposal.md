## Why

The character-cli wizard lives in a separate repo (`dnd-tooling`) disconnected from the monorepo that hosts the `dnd-character-sheet` package it writes to. Consolidating it here gives it proper Turborepo workspace integration and co-locates all D&D tooling in one place.

## What Changes

- Add `apps/dnd-cli` — an Ink/React terminal wizard app (migrated from `dnd-tooling/packages/character-cli`)
- Package name: `@ageorgedev/dnd-cli`, with a `dev` script (`tsx src/index.tsx`), no build step
- Update `CHARACTERS_DIR` path in `index.tsx` to target `packages/dnd-character-sheet/src/characters/` correctly from the new location
- Pin all dependency versions to match existing monorepo patterns (TypeScript 5.8.3, React 19, etc.)
- Generated `.data.ts` files keep relative import (`"../types/character"`) — they land in the character-sheet package and resolve correctly from there

## Capabilities

### New Capabilities

- `character-cli`: Interactive terminal wizard for creating D&D character data files, generating `.data.ts` files into `packages/dnd-character-sheet/src/characters/`

### Modified Capabilities

<!-- none -->

## Impact

- **New app**: `apps/dnd-cli` added to Yarn workspaces
- **`packages/dnd-character-sheet`**: Receives generated character files (no code changes to the package itself)
- **Turborepo**: No `build` pipeline entry needed; `dev` script is standalone
- **Dependencies**: `ink`, `tsx` added as new dependencies to the monorepo (not used elsewhere)
