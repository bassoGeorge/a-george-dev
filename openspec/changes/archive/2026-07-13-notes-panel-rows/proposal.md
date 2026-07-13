## Why

The `NotesPanel` has a hardcoded line count of 10, with no way to adjust per character. Some characters (particularly spellcasters whose spell list overflows the page) don't need a notes panel at all, while others benefit from more or fewer lines. Extending `VisualAdjustments` with a `notesRows` field gives per-character control, consistent with how `spellRows` and `inventoryRows` already work.

## What Changes

- Add `notesRows: number` to `VisualAdjustments` (default `10`, matching current hardcoded value)
- `NotesPanel` reads `notesRows` from `VisualAdjustmentsContext` instead of using a hardcoded value
- When `notesRows` is `0`, `NotesPanel` is not rendered at all

## Capabilities

### New Capabilities

_(none — this is purely an extension of an existing capability)_

### Modified Capabilities

- `visual-adjustments-context`: New `notesRows` field added; `StandardCharacterSheet` defaults it to `10`. `NotesPanel` reads from context. `notesRows: 0` suppresses the panel.

## Impact

- `packages/dnd-character-sheet/src/components/VisualAdjustmentsContext.ts` — new field
- `packages/dnd-character-sheet/src/components/NotesPanel/NotesPanel.tsx` — reads from context
- `packages/dnd-character-sheet/src/components/StandardCharacterSheet/StandardCharacterSheet.tsx` — conditional render when `notesRows === 0`
- Character data files can now pass `notesRows: 0` to suppress the panel (e.g. Talia)
