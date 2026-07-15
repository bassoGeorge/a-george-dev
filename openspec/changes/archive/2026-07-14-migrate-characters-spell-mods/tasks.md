## 1. Verify CSV coverage and pre-flight

- [x] 1.1 Confirm all spells used across claw, elnorin, omarin, saora, zoynari-2, and zoynari-3 exist in `spells-2024.csv` (all currently present — no CSV additions needed)
- [x] 1.2 Run `yarn turbo generate:spells:check --filter=@ageorgedev/dnd-character-sheet` to confirm generated file is in sync with CSV before starting

## 2. Migrate claw.ts

All 6 spells are in SPELL. Three cantrips can use plain `SPELL.<Key>`. Three level-1 spells need `withSpellMods` for `alwaysPrepared`. Note: Mage Hand is cast as a Bonus Action via Mage Hand Legerdemain — use `withSpellMods(SPELL.MageHand, { notes: 'Cast as Bonus Action via Mage Hand Legerdemain' })`.

- [x] 2.1 Add `SPELL` and `withSpellMods` to the imports from `@ageorgedev/dnd-character-sheet`
- [x] 2.2 Replace inline spell literals with `SPELL.MindSliver`, `SPELL.MinorIllusion`, and `withSpellMods(SPELL.MageHand, { notes: ... })`
- [x] 2.3 Replace level-1 spells with `withSpellMods(SPELL.CharmPerson, { alwaysPrepared: true })`, `withSpellMods(SPELL.MagicMissile, { alwaysPrepared: true })`, `withSpellMods(SPELL.FogCloud, { alwaysPrepared: true })`
- [x] 2.4 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors

## 3. Migrate elnorin-lunarrest.ts

All 17 spells are in SPELL. Key mappings: `Protection from Evil & Good` → `SPELL.ProtectionFromEvilAndGood`, `Mage Armour` → `SPELL.MageArmor`. Spells needing `withSpellMods`: Healing Word (freeUses: 1, alwaysPrepared: true), Aid/Alarm/LesserRestoration/ProtectionFromEvilAndGood (alwaysPrepared: true). Detect Magic is also a ritual.

- [x] 3.1 Add `SPELL` and `withSpellMods` to the imports from `@ageorgedev/dnd-character-sheet`
- [x] 3.2 Replace the 6 cantrips with plain `SPELL.<Key>` references (Light, Prestidigitation, ShockingGrasp, SorcerousBurst, Guidance, Thaumaturgy)
- [x] 3.3 Replace Clockwork Soul always-prepared spells with `withSpellMods` (Aid, Alarm, LesserRestoration, ProtectionFromEvilAndGood)
- [x] 3.4 Replace Healing Word with `withSpellMods(SPELL.HealingWord, { alwaysPrepared: true, freeUses: 1, notes: '2d4+3 Healing' })`
- [x] 3.5 Replace remaining level-1/2 spells with plain `SPELL.<Key>` (BurningHands, DetectMagic, Shield, WitchBolt, MageArmor, Shatter)
- [x] 3.6 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors

## 4. Migrate omarin-kenate.ts

Only 2 spells (from Drow Elven Lineage). Both need `alwaysPrepared: true` and `freeUses: 1`.

- [x] 4.1 Add `SPELL` and `withSpellMods` to the imports from `@ageorgedev/dnd-character-sheet`
- [x] 4.2 Replace Faerie Fire with `withSpellMods(SPELL.FaerieFire, { alwaysPrepared: true, freeUses: 1 })`
- [x] 4.3 Replace Darkness with `withSpellMods(SPELL.Darkness, { alwaysPrepared: true, freeUses: 1, notes: '15ft Sphere' })`
- [x] 4.4 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors

## 5. Migrate saora-embervale.ts

All 8 spells are in SPELL. Key mappings: `Enlarge / Reduce` → `SPELL.EnlargeReduce`. No alwaysPrepared or freeUses needed.

- [x] 5.1 Add `SPELL` to the imports from `@ageorgedev/dnd-character-sheet`
- [x] 5.2 Replace the 2 cantrips with `SPELL.ViciousMockery` and `SPELL.MinorIllusion`
- [x] 5.3 Replace the 6 prepared spells with plain `SPELL.<Key>` references (CharmPerson, ColorSpray, DissonantWhispers, HealingWord, EnlargeReduce, MirrorImage)
- [x] 5.4 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors

## 6. Migrate zoynari-2.ts

All 9 spells are in SPELL. Key mappings: `Shield of Faith` → `SPELL.ShieldOfFaith`. No alwaysPrepared or freeUses used — Cure Wounds and Healing Word have notes.

- [x] 6.1 Add `SPELL` and `withSpellMods` to the imports from `@ageorgedev/dnd-character-sheet`
- [x] 6.2 Replace the 4 cantrips with plain `SPELL.<Key>` (Guidance, SacredFlame, Thaumaturgy, TollTheDead)
- [x] 6.3 Replace prepared spells: plain SPELL for Bless and ShieldOfFaith; `withSpellMods` for CureWounds and HealingWord to preserve the notes
- [x] 6.4 Replace GuidingBolt with plain `SPELL.GuidingBolt`
- [x] 6.5 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors

## 7. Migrate zoynari-3.ts

Extends zoynari-2 via spread. After step 6, zoynari-2's spell array already uses SPELL. The 5 additional spells (BurningHands, FaerieFire, ScorchingRay, SeeInvisibility, LocateObject) all exist in SPELL. BurningHands, FaerieFire, ScorchingRay, SeeInvisibility are `alwaysPrepared`.

- [x] 7.1 Add `SPELL` and `withSpellMods` to the imports from `@ageorgedev/dnd-character-sheet`
- [x] 7.2 Replace 4 alwaysPrepared spells with `withSpellMods(SPELL.<Key>, { alwaysPrepared: true })`
- [x] 7.3 Replace LocateObject with plain `SPELL.LocateObject`
- [x] 7.4 Run `yarn turbo build --filter=@ageorgedev/game-tools` — verify no type errors

## 8. Final verification

- [x] 8.1 Run `yarn turbo generate:spells:check --filter=@ageorgedev/dnd-character-sheet` — confirm CSV and generated file are in sync
- [x] 8.2 Run `yarn test` to confirm all tests pass
- [ ] 8.3 Start game-tools dev server and visually verify spell lists render correctly for each character
