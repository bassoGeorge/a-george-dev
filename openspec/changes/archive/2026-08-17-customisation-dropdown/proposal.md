## Why

The character sheet has optional reference panels (Actions in Combat, Weapon Masteries) that are useful for newer players but add visual noise for experienced ones. Currently these panels are hardcoded to show only for non-spellcasting characters, with no user control. A persistent customisation dropdown gives users the ability to opt into reference material on demand, globally across all sheets.

## What Changes

- Add a `UserPrefsContext` to `apps/game-tools` backed by `localStorage`, holding per-panel visibility toggles
- Wrap `GlobalProviders` with the new `UserPrefsProvider` so the context is available to both the header and character sheet
- Add a "Customise" dropdown button to `DndHeaderActions` using the design system's `DropdownMenu` with `DropdownMenuCheckboxItem` entries
- `ActionsInCombat` and `WeaponMasteries` in `StandardCharacterSheet` render based on the new user prefs rather than the existing `!data.spellcasting` guard (which is removed)

## Capabilities

### New Capabilities

- `user-prefs`: Per-panel visibility toggles persisted to `localStorage`, with a provider + hook for reading/writing from anywhere in the app

### Modified Capabilities

<!-- none -->

## Impact

- `apps/game-tools/src/components/GlobalProviders.tsx` — new provider added
- `apps/game-tools/src/components/DndHeaderActions.tsx` — customise dropdown added
- `packages/dnd-character-sheet/src/components/StandardCharacterSheet/StandardCharacterSheet.tsx` — reads new context, spellcasting guard removed from ActionsInCombat and WeaponMasteries
- New file: `apps/game-tools/src/context/UserPrefsContext.tsx`
- No API or dependency changes
