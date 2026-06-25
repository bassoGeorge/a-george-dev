## Why

`SpellList` contains a hardcoded `totalRows = 30` and `Inventory` has a hardcoded `lineCount={10}` on `HandWrittenNotes` — both are eyeballed layout-fill values that break when spell entries wrap to multiple lines or inventory content varies. The sheet layout owner (`StandardCharacterSheet`) is the right place to tune these, not the leaf components.

## What Changes

- Add an optional `visualAdjustments` prop to `StandardCharacterSheet` with shape `{ spellRows?: number; inventoryRows?: number }`, defaulting to `{ spellRows: 30, inventoryRows: 10 }`
- Introduce a `VisualAdjustmentsContext` that `StandardCharacterSheet` populates and `SpellList` / `Inventory` read from
- Remove the hardcoded `totalRows = 30` from `SpellList` — read from context instead
- Remove the hardcoded `lineCount={10}` from `HandWrittenNotes` in `Inventory` — read from context instead
- The 3 magic item attunement slots in `Inventory` remain hardcoded (D&D rules constant, not a layout value)

## Capabilities

### New Capabilities

- `visual-adjustments-context`: A React context that carries layout tuning values (`spellRows`, `inventoryRows`) from `StandardCharacterSheet` down to leaf components without prop threading

### Modified Capabilities

<!-- No existing spec-level behavior changes -->

## Impact

- `packages/dnd-character-sheet/src/components/StandardCharacterSheet/StandardCharacterSheet.tsx` — new optional prop, context provider
- `packages/dnd-character-sheet/src/components/SpellcastingBlock/SpellList.tsx` — reads `spellRows` from context
- `packages/dnd-character-sheet/src/components/Inventory/Inventory.tsx` — reads `inventoryRows` from context, passes to `HandWrittenNotes`
- `SpellcastingBlock.tsx` — no changes needed (context bypasses it)
- No breaking changes; all existing usages continue working with defaults
