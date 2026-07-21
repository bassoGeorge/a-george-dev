## 1. Character sheet spec file

- [x] 1.1 Create `apps/game-tools-e2e/tests/character-sheets.spec.ts` with the `CHARACTERS` fixture array (`claw`/caster, `elnorin-lunarrest`/caster, `gonvar-feathertide`/non-caster)
- [x] 1.2 Add a looped test asserting the character name heading and a "Class Features" section heading are visible for each fixture character
- [x] 1.3 Add a looped assertion: for casters, the "Download spellbook PDF" link is visible and its `href` resolves with HTTP 200 via `page.request.get`
- [x] 1.4 Add a looped assertion: for the non-caster (Gonvar Feathertide), the "Download spellbook PDF" link is not present
- [x] 1.5 Add a shared `SHEET_SECTION_HEADINGS` list ("Class Features", "Passive Perception", "Proficiency Bonus", "Weapons & Damage Cantrips") and assert all are visible for each fixture character
- [x] 1.6 Assert the "Print character sheet" button is visible for each fixture character

## 2. Smoke spec updates

- [x] 2.1 Remove the now-redundant standalone "claw character sheet renders" test from `apps/game-tools-e2e/tests/smoke.spec.ts`
- [x] 2.2 Extend the character list page test in `smoke.spec.ts` to assert "Claw", "Elnorin Lunarrest", and "Gonvar Feathertide" all appear as roster card names

## 3. Verification

- [x] 3.1 Run `yarn turbo e2e --filter=@ageorgedev/game-tools-e2e` (or the package's e2e script) locally against the dev server and confirm all tests pass
- [x] 3.2 Run `yarn format-and-lint:fix` to ensure the new/edited spec files pass Biome
