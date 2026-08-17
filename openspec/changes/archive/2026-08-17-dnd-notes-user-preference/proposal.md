## Why

The Notes panel visibility on character sheets is currently gated by `notesRows > 0` — a visual configuration field — which means users can't toggle it on/off at runtime without editing character data. Moving this to a user preference aligns it with the existing toggle pattern and gives users direct control from the Customise dropdown.

## What Changes

- Add `showNotes: boolean` to `SheetUserPreferences` in `dnd-character-sheet` package, defaulting to `true`
- `StandardCharacterSheet` reads `userPreferences.showNotes` instead of checking `notesRows > 0` to decide whether to render `NotesPanel`
- Remove `notesRows` from `VisualAdjustments` entirely — row count is now a hardcoded default (`10`) inside `NotesPanel`, not a configurable layout field
- One character (`dnd-characters/index.ts`) uses `notesRows: 0` to hide notes — migrate that to `showNotes: false` on the route's static data or context
- `UserPrefsContext` in `game-tools` adds `showNotes` to defaults and persistence
- `DndHeaderActions` adds a "Notes" checkbox item to the Customise dropdown, placed **outside** the "Beginner Help" group (either before it, or in its own separate section)

## Capabilities

### New Capabilities

- none

### Modified Capabilities

- `user-prefs`: Add `showNotes` preference — new boolean field, new default scenario, new dropdown item outside Beginner Help group
- `visual-adjustments-context`: Remove `notesRows` field entirely — **BREAKING** for any callers passing `notesRows` in `visualAdjustments`

## Impact

- `packages/dnd-character-sheet/src/components/SheetUserPreferences.ts` — add `showNotes` field
- `packages/dnd-character-sheet/src/components/StandardCharacterSheet/StandardCharacterSheet.tsx` — remove `notesRows` destructure; gate `NotesPanel` on `userPreferences?.showNotes`
- `packages/dnd-character-sheet/src/components/NotesPanel/NotesPanel.tsx` — stop reading `notesRows` from context; hardcode `lineCount={10}`
- `packages/dnd-character-sheet/src/components/VisualAdjustmentsContext.ts` — remove `notesRows` from `FullVisualAdjustments` and `DEFAULT_VISUAL_ADUSTMENTS`
- `apps/game-tools/src/data/dnd-characters/index.ts` — remove `notesRows: 0`; migrate that character to pass `showNotes: false` via user prefs or route static data
- `apps/game-tools/src/context/UserPrefsContext.tsx` — add `showNotes: true` to defaults
- `apps/game-tools/src/components/DndHeaderActions.tsx` — add Notes checkbox outside Beginner Help group
- `packages/dnd-character-sheet/src/components/SpellcastingBlock/SpellList.test.tsx` — remove `notesRows` from test fixture
