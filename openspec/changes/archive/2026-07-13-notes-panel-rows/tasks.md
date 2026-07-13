## 1. Extend VisualAdjustmentsContext

- [x] 1.1 Add `notesRows: number` to `FullVisualAdjustments` type in `VisualAdjustmentsContext.ts`
- [x] 1.2 Set default value `notesRows: 10` in `DEFAULT_VISUAL_ADUSTMENTS`

## 2. Update NotesPanel

- [x] 2.1 Read `notesRows` from `useVisualAdjustments()` in `NotesPanel` and pass it as `lineCount` to `HandWrittenNotes`

## 3. Suppress NotesPanel in StandardCharacterSheet

- [x] 3.1 In `StandardCharacterSheet`, conditionally render `NotesPanel` only when `notesRows > 0`

## 4. Enable on Talia

- [x] 4.1 Add `notesRows: 0` to Talia's `visualAdjustments` in `index.ts`
