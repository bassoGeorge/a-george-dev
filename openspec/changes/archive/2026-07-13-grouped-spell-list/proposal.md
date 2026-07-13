## Why

The current table-based spell list works well for wizards and warlocks with a small, fixed spell list, but breaks down for clerics who have a large pool of spells to choose from each day. A cleric like Talia has 25+ spells across multiple levels, making the table hard to scan when choosing what to prepare.

## What Changes

- Add `spellListMode: 'table' | 'grouped'` to `VisualAdjustments` (default `'table'`), allowing per-character opt-in to the new view
- Introduce a new `GroupedSpellList` component that renders spells grouped by level in a 3-column grid
- `SpellcastingBlock` switches between `SpellList` and `GroupedSpellList` based on the context value

## Capabilities

### New Capabilities

- `grouped-spell-list`: A level-grouped, 3-column spell list view for spell-heavy casters. Each cell shows: prepared checkbox (or "AP" for always-prepared, nothing for cantrips), spell name with inline notes/altAbility in subdued text, free uses with trackable circles, and CRM as truthy comma-separated letters only.

### Modified Capabilities

- `visual-adjustments`: New `spellListMode` field added to the `VisualAdjustments` type and `DEFAULT_VISUAL_ADJUSTMENTS` constant.

## Impact

- `packages/dnd-character-sheet/src/components/VisualAdjustmentsContext.ts` — new field
- `packages/dnd-character-sheet/src/components/SpellcastingBlock/SpellcastingBlock.tsx` — conditional render
- New file: `packages/dnd-character-sheet/src/components/SpellcastingBlock/GroupedSpellList.tsx`
- Character data files (e.g. `talia-orien.ts`) pass `spellListMode: 'grouped'` via `visualAdjustments`
