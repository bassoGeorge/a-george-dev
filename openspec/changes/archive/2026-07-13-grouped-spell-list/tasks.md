## 1. Extend VisualAdjustmentsContext

- [x] 1.1 Add `spellListMode: 'table' | 'grouped'` to `FullVisualAdjustments` type in `VisualAdjustmentsContext.ts`
- [x] 1.2 Set default value `spellListMode: 'table'` in `DEFAULT_VISUAL_ADUSTMENTS`

## 2. Build GroupedSpellList component

- [x] 2.1 Create `GroupedSpellList.tsx` alongside `SpellList.tsx` — scaffold the component reading from `useCharacter()` and `useVisualAdjustments()`
- [x] 2.2 Implement level grouping — group `spellcasting.spells` by `level`, sort groups ascending, sort within each group (`alwaysPrepared` first, then alphabetically)
- [x] 2.3 Implement level section headers — "Cantrips" for level 0, "Level N" for others
- [x] 2.4 Implement 3-column grid layout for each level section
- [x] 2.5 Implement spell cell — prepared indicator (CircleCheck / "AP" / nothing for cantrips), spell name, free-use circles, CRM letters
- [x] 2.6 Implement inline notes and alternativeAbility below spell name in subdued smaller text
- [x] 2.7 Implement CRM display — truthy letters only, comma-separated

## 3. Wire up SpellcastingBlock

- [x] 3.1 In `SpellcastingBlock.tsx`, read `spellListMode` from `useVisualAdjustments()` and render `GroupedSpellList` when `'grouped'`, `SpellList` otherwise

## 4. Enable on Talia

- [x] 4.1 Pass `visualAdjustments={{ spellListMode: 'grouped' }}` to Talia's character sheet route
