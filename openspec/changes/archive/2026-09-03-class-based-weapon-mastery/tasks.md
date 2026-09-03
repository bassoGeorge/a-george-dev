## 1. Eligibility rule in the package

- [x] 1.1 Add `WEAPON_MASTERY_CLASSES` to `packages/dnd-character-sheet/src/lib/character-class-constants.ts`, containing Barbarian, Fighter, Paladin, Ranger and Rogue, alongside the existing `HIT_DICE_TABLE`
- [x] 1.2 Add `WEAPON_MASTER_FEAT_NAME = 'Weapon Master'` and the `hasWeaponMastery(character: Character): boolean` predicate to the same file — eligible class OR exact-name feat in `feats`, no level threshold, no reference to `attacks`
- [x] 1.3 Export `WEAPON_MASTERY_CLASSES` and `hasWeaponMastery` from `packages/dnd-character-sheet/src/index.ts`
- [x] 1.4 Write unit tests for the predicate: each of the five eligible classes, an ineligible class, Monk/Fighter multiclass, Sorcerer/Warlock multiclass, exact feat match, wrong-case feat name, `feats` undefined, and a `masteryProperty` attack on an ineligible character

## 2. Character brief

- [x] 2.1 Add `hasWeaponMastery: boolean` to the object returned by `getCharacterBrief` in `packages/dnd-character-sheet/src/lib/character-brief.ts`, computed via the predicate
- [x] 2.2 Extend `character-brief.test.ts` with eligible-class, feat-granted and ineligible cases

## 3. AttackList column

- [x] 3.1 Replace `const showMasteries = character.attacks.some(...)` in `AttackList.tsx` with `hasWeaponMastery(character)`
- [x] 3.2 Confirm an eligible character with an unannotated attack renders an empty Mastery cell rather than skipping the cell, so column counts stay aligned across rows and the trailing `EmptyRow`
- [x] 3.3 Rewrite the two mastery tests in `AttackList.test.tsx` onto class-based fixtures, and add cases for eligible-without-annotations, ineligible-with-annotation, and feat-granted eligibility

## 4. WeaponMasteries panel

- [x] 4.1 Rewrite `WeaponMasteries.tsx` to render `Object.keys(Descriptions).sort()`, removing `useCharacter()`, `useMemo`, the ramda `filter`/`map`/`uniq` imports and the empty-list `return null` guard
- [x] 4.2 Create `WeaponMasteries.test.tsx` (no test file exists today) asserting all eight masteries with descriptions, alphabetical ordering, and that it renders without a `CharacterSheet` provider

## 5. Sheet-level gating

- [x] 5.1 Gate `<WeaponMasteries />` in `StandardCharacterSheet.tsx` on `hasWeaponMastery(data) && userPreferences?.showWeaponMasteries`
- [x] 5.2 Rewrite the three `showWeaponMasteries` tests in `StandardCharacterSheet.test.tsx` onto class-based fixtures, covering eligible+on, eligible+off, eligible+omitted, ineligible+on, and eligible-without-annotated-attacks

## 6. App plumbing

- [x] 6.1 Add a `WEAPON_MASTER` description-only feature constant named `Weapon Master` to `apps/game-tools/src/data/dnd-characters/common/common-feats.ts`
- [x] 6.2 Publish `hasWeaponMastery` from `pack.brief` in the `beforeLoad` return of `apps/game-tools/src/routes/_public/dnd/characters/$slug.{-$level}.tsx`, keeping the context serialisable
- [x] 6.3 Read `hasWeaponMastery` from `characterSheetRouteMatch.context` in `DndHeaderActions.tsx` and omit the "Weapon Masteries" checkbox item entirely when it is `false` — hidden, not disabled
- [x] 6.4 Extend `DndHeaderActions.test.tsx` with item-shown-when-eligible and item-hidden-when-ineligible cases, and confirm "Notes", "Actions in Combat" and the "Beginner Help" label still render for an ineligible character

## 7. Data cleanup

- [x] 7.1 Remove `masteryProperty: 'Slow'` from the Quarterstaff attack in `packages/dnd-character-sheet/src/characters/example-wizard.data.ts`

## 8. Verification

- [x] 8.1 Run the full unit test suite and confirm it passes
- [x] 8.2 Run typecheck across the workspace and confirm the new exports and the widened brief type resolve
- [x] 8.3 Run `yarn format-and-lint:fix` at the repo root
- [x] 8.4 Manually check one eligible character (Gonvar, Fighter) and one ineligible character (Elnorin, Sorcerer): column present/absent, dropdown item present/absent, and the panel listing all eight masteries when toggled on
- [x] 8.5 Confirm that enabling the preference on an eligible character, navigating to an ineligible one and returning leaves the preference intact in `localStorage`
