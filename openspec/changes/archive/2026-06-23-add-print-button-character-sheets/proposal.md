## Why

Viewing individual D&D character sheets in game-tools requires manually triggering the browser print dialog — there's no affordance in the UI. Adding a Print button to the header makes the existing print layout (already tuned to 2-page A4) discoverable and one-click.

## What Changes

- A new pathless layout route `_sheet.tsx` is introduced under `characters/`, scoping individual character sheet pages into their own route subtree
- Existing character files (`example.tsx`, `omarin-kenate.tsx`) are moved into the `_sheet/` subdirectory (URLs unchanged)
- The shared header in `_public.tsx` gains a context-aware Print button that appears only when a `_sheet` child route is active, using `useChildMatches()`
- The Print button calls `window.print()` and is hidden during printing via `print:hidden`

## Capabilities

### New Capabilities

- `character-sheet-print`: Print button in the game-tools header that is visible only on individual character sheet pages and triggers the browser print dialog

### Modified Capabilities

<!-- none -->

## Impact

- **Files modified**: `apps/game-tools/src/routes/_public.tsx`
- **Files added**: `apps/game-tools/src/routes/_public/dnd/characters/_sheet.tsx`
- **Files moved**: `example.tsx` and `omarin-kenate.tsx` into `_sheet/` subdirectory (TanStack Router route tree regenerated automatically)
- **No new dependencies**
- **No URL changes**
- **No breaking changes**
