## Why

TTRPG tooling is accumulating in `apps/ageorgedev` (character sheets, game data) where it doesn't belong. A dedicated app gives these tools a proper home under a `/dnd` namespace with room to grow without cluttering the personal site.

## What Changes

- New Turborepo app `apps/game-tools` (`@ageorgedev/game-tools`) using the same TanStack Start + Tailwind v4 + theming stack as `apps/ageorgedev`, running on port 3001
- Route `/dnd/characters/example` renders the `ExampleSheet` from `@ageorgedev/dnd-character-sheet`, no-layout (print-friendly)
- `_noLayout/char-test.tsx` deleted from `apps/ageorgedev`
- `@ageorgedev/dnd-character-sheet` dependency removed from `apps/ageorgedev`
- `@source` directive for `dnd-character-sheet/src` removed from `apps/ageorgedev/src/styles.css`
- Deployed as a separate Vercel project (domain TBD)

## Capabilities

### New Capabilities

- `game-tools-app`: Scaffolded TanStack Start app with Tailwind v4, design-system theming, file-based routing, and full monorepo wiring (workspace package, Turborepo pipeline, tsconfig, vite config)
- `dnd-character-viewer`: No-layout route at `/dnd/characters/example` that renders a DnD character sheet — print-friendly, sourced from `@ageorgedev/dnd-character-sheet`

### Modified Capabilities

- `ageorgedev-app`: Remove `char-test` route, remove `@ageorgedev/dnd-character-sheet` dependency and its `@source` entry from styles.css

## Impact

- New `apps/game-tools/` directory
- `apps/ageorgedev/src/routes/_noLayout/char-test.tsx` deleted
- `apps/ageorgedev/package.json` loses `@ageorgedev/dnd-character-sheet`
- `apps/ageorgedev/src/styles.css` loses `@source "../../../packages/dnd-character-sheet/src"`
- Turborepo `turbo.json` and root workspace globs already cover `apps/*` — no pipeline changes needed
- No breaking changes to shared packages
