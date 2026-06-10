## 1. Migrate Layout Components

- [ ] 1.1 `layout/Page.tsx` — replace `bg-sheet-parchment` with `bg-page-0`
- [ ] 1.2 `layout/Panel.tsx` and `Panel.module.css` — replace gray/sheet border colors with `border-neutral-subdued` / `border-neutral-disabled`
- [ ] 1.3 `layout/SubPanel.module.css` — replace gray divider colors with `border-neutral-subdued`
- [ ] 1.4 `layout/VerticalDivider.tsx` — replace divider color with `bg-neutral-subdued`

## 2. Migrate Header Components

- [ ] 2.1 `SheetHeader/SheetHeader.tsx` — replace `bg-sheet-red` / `text-white` header fills with `bg-destructive-surface-2 text-destructive-onsurface-2`
- [ ] 2.2 `CharacterHeader/CharacterHeader.tsx` — replace sheet-red and sheet-dark references

## 3. Migrate Ability and Stats Components

- [ ] 3.1 `AbilityBox/AbilityBox.tsx` — replace `text-gray-500` / `text-sheet-dark` / `border-sheet-*` classes
- [ ] 3.2 `AbilityScores/AbilityScores.tsx` — replace gray and sheet color classes
- [ ] 3.3 `SavingThrows/SavingThrows.tsx` — replace gray label and border colors
- [ ] 3.4 `SkillList/SkillList.tsx` — replace gray text and border colors
- [ ] 3.5 `CombatStats/CombatStats.tsx` — replace sheet-red and gray color classes
- [ ] 3.6 `CombatRow/CombatRow.tsx` — replace gray and sheet color classes

## 4. Migrate Death Saves and Hit Dice

- [ ] 4.1 `DeathSaves/DeathSaves.tsx` — replace `bg-green-500` / `border-green-600` with `bg-primary-surface-2` / `border-primary-surface-2`; replace `border-red-800` with `border-destructive-surface-2`; replace `bg-white` circle fills (keep as white)
- [ ] 4.2 `HitDice/HitDice.tsx` — replace sheet color references

## 5. Migrate Attack and Equipment Components

- [ ] 5.1 `AttackList/AttackList.tsx` — replace `text-gray-400` header labels with `text-neutral-subdued`
- [ ] 5.2 `EquipmentList/EquipmentList.tsx` — replace gray text and border colors
- [ ] 5.3 `EquipmentTraining/EquipmentTraining.tsx` — replace gray and sheet color classes
- [ ] 5.4 `EquipmentBlock/EquipmentBlock.tsx` — replace sheet color references

## 6. Migrate Content Block Components

- [ ] 6.1 `ProficiencyBlock/ProficiencyBlock.tsx` — replace gray text and border colors
- [ ] 6.2 `PersonalityBlock/PersonalityBlock.tsx` — replace gray and sheet border colors
- [ ] 6.3 `BackstoryBlock/BackstoryBlock.tsx` — replace gray and sheet color classes
- [ ] 6.4 `NotesBlock/NotesBlock.tsx` — replace gray and sheet color classes
- [ ] 6.5 `FeatureList/FeatureList.tsx` — replace gray text colors
- [ ] 6.6 `ClassFeatures/ClassFeatures.tsx` — replace gray and sheet color classes
- [ ] 6.7 `Feats/Feats.tsx` — replace gray and sheet color classes
- [ ] 6.8 `SpeciesTraits/SpeciesTraits.tsx` — replace gray and sheet color classes

## 7. Migrate Spellcasting Components

- [ ] 7.1 `SpellcastingBlock/SpellcastingHeader.tsx` — replace sheet-red and gray color classes
- [ ] 7.2 `SpellcastingBlock/SpellLevelSection.tsx` — replace gray and sheet color classes
- [ ] 7.3 `SpellcastingBlock/SpellRow.tsx` — replace gray text and border colors

## 8. Remove tokens.css

- [ ] 8.1 Delete `packages/dnd-character-sheet/src/styles/tokens.css`
- [ ] 8.2 Remove `"./dist/styles/tokens.css"` export from `packages/dnd-character-sheet/package.json`
- [ ] 8.3 Remove `@import "@ageorgedev/dnd-character-sheet/dist/styles/tokens.css"` from `apps/ageorgedev/src/styles.css`

## 9. Verify

- [ ] 9.1 Run `yarn format-and-lint` — no lint errors
- [ ] 9.2 Run `yarn build` — builds cleanly
- [ ] 9.3 Visually verify `/char-test` route — sheet renders correctly with correct colors
