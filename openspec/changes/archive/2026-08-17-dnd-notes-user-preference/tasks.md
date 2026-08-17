## 1. Package: dnd-character-sheet — remove notesRows

- [x] 1.1 Remove `notesRows` from `FullVisualAdjustments`, `VisualAdjustments`, and `DEFAULT_VISUAL_ADUSTMENTS` in `packages/dnd-character-sheet/src/components/VisualAdjustmentsContext.ts`
- [x] 1.2 Update `NotesPanel` to hardcode `lineCount={10}` instead of reading `notesRows` from context (`packages/dnd-character-sheet/src/components/NotesPanel/NotesPanel.tsx`)
- [x] 1.3 Remove `notesRows` destructure from `StandardCharacterSheet`; remove the `notesRows > 0` guard (`packages/dnd-character-sheet/src/components/StandardCharacterSheet/StandardCharacterSheet.tsx`)
- [x] 1.4 Remove `notesRows: 10` from the test fixture in `packages/dnd-character-sheet/src/components/SpellcastingBlock/SpellList.test.tsx`

## 2. Package: dnd-character-sheet — add showNotes preference

- [x] 2.1 Add `showNotes?: boolean` to `SheetUserPreferences` type in `packages/dnd-character-sheet/src/components/SheetUserPreferences.ts`
- [x] 2.2 Gate `NotesPanel` on `userPreferences?.showNotes` in `StandardCharacterSheet`

## 3. App: game-tools — migrate notesRows: 0 call site

- [x] 3.1 Remove `notesRows: 0` from `apps/game-tools/src/data/dnd-characters/index.ts` and express the same intent via the character's route or static data using `showNotes: false`

## 4. App: game-tools — context and dropdown

- [x] 4.1 Add `showNotes: true` to `DEFAULT_USER_PREFS` in `apps/game-tools/src/context/UserPrefsContext.tsx`
- [x] 4.2 Add a "Notes" `DropdownMenuCheckboxItem` (bound to `prefs.showNotes`) in `DndHeaderActions`, placed before the "Beginner Help" label with a separator between them
