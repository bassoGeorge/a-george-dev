## 1. Create VisualAdjustmentsContext

- [x] 1.1 Create `packages/dnd-character-sheet/src/components/VisualAdjustmentsContext.ts` exporting the context with defaults `{ spellRows: 30, inventoryRows: 10 }` and a `useVisualAdjustments` hook

## 2. Update StandardCharacterSheet

- [x] 2.1 Add optional `visualAdjustments?: { spellRows?: number; inventoryRows?: number }` prop to `StandardCharacterSheet`
- [x] 2.2 Wrap children with `VisualAdjustmentsContext.Provider`, merging prop values with defaults

## 3. Update SpellList

- [x] 3.1 Replace `const totalRows = 30` with `const { spellRows } = useVisualAdjustments()` and use `spellRows` for the empty row calculation

## 4. Update Inventory

- [x] 4.1 Replace hardcoded `lineCount={10}` on `HandWrittenNotes` with `inventoryRows` from `useVisualAdjustments()`
