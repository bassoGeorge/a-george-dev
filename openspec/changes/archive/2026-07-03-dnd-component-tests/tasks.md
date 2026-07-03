## 1. Package Setup

- [x] 1.1 Add `@testing-library/react@16.3.2`, `@testing-library/jest-dom@6.9.1`, and `@ageorgedev/testing-config@workspace:*` to `packages/dnd-character-sheet/package.json` devDependencies
- [x] 1.2 Update `packages/dnd-character-sheet/vitest.config.ts` include glob from `src/**/*.test.ts` to `src/**/*.test.{ts,tsx}`
- [x] 1.3 Run `yarn install` to resolve new dependencies

## 2. CharacterSheet Context Test

- [x] 2.1 Create `packages/dnd-character-sheet/src/components/CharacterSheet.test.tsx`
- [x] 2.2 Write a minimal `makeCharacter()` fixture helper that satisfies the `Character` type with safe defaults
- [x] 2.3 Write test: render `CharacterSheet` with fixture, read context via a test child component, assert `derived.abilityModifiers`, `derived.proficiencyBonus`, and `derived.skills` are defined

## 3. AttackList Tests

- [x] 3.1 Create `packages/dnd-character-sheet/src/components/AttackList/AttackList.test.tsx`
- [x] 3.2 Write test: no attacks → renders nothing
- [x] 3.3 Write test: `weapon` kind → correct bonus = `abilityMod + profBonus + attackBonusMod`
- [x] 3.4 Write test: `weapon` kind with `notProficient: true` → profBonus excluded
- [x] 3.5 Write test: `spell-with-attack` → displays `derived.spellAttackBonus`
- [x] 3.6 Write test: `spell-with-save` → displays `"<ABILITY> save, DC <n>"` string
- [x] 3.7 Write test: mastery column appears when any attack has `masteryProperty`
- [x] 3.8 Write test: mastery column absent when no attack has `masteryProperty`
- [x] 3.9 Write test: `disableModifier: true` → modifier not appended to damage string

## 4. SpellList Tests

- [x] 4.1 Create `packages/dnd-character-sheet/src/components/SpellcastingBlock/SpellList.test.tsx`
- [x] 4.2 Write test: spells sorted ascending by level
- [x] 4.3 Write test: `alwaysPrepared` spell appears before regular spell at same level
- [x] 4.4 Write test: alphabetical order within same level and prep status
- [x] 4.5 Write test: `alwaysPrepared` spell shows "AP" in prep column
- [x] 4.6 Write test: cantrip (level 0) shows empty prep cell
- [x] 4.7 Write test: `castingTime: "action"` → displays "Action"
- [x] 4.8 Write test: `castingTime: "bonus action"` → displays "Bonus"
- [x] 4.9 Write test: spell with `alternativeAbility` → shows ability short name, to-hit, and DC

## 5. AbilityBox Tests

- [x] 5.1 Create `packages/dnd-character-sheet/src/components/AbilityBox/AbilityBox.test.tsx`
- [x] 5.2 Write test: ability score and formatted modifier are rendered
- [x] 5.3 Write test: ability in `savingThrowProficiencies` → saving throw row is checked
- [x] 5.4 Write test: ability not in `savingThrowProficiencies` → saving throw row is unchecked
- [x] 5.5 Write test: skill in `skillProficiencies` → checkbox in checked state
- [x] 5.6 Write test: skill in `skillExpertise` → checkbox in 'special' state
- [x] 5.7 Write test: skill with no proficiency → modifier column shows whitespace, not a number

## 6. Verification

- [x] 6.1 Run `yarn turbo test --filter=@ageorgedev/dnd-character-sheet` and confirm all new tests pass
- [x] 6.2 Run `yarn format-and-lint` from the repo root and fix any issues
