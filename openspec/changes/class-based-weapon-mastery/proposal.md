## Why

Weapon mastery is currently shown whenever a character happens to have an attack annotated with a `masteryProperty`. That is backwards: mastery is a **rules entitlement** granted by class or feat, not a consequence of how a weapon was authored in data. The result is that a Sorcerer/Warlock (`exampleWizard`) displays mastery UI it has no right to, while an eligible Fighter whose weapons are not yet annotated sees nothing at all.

## What Changes

- Introduce a single eligibility rule: a character has weapon mastery when they have **at least one level in Barbarian, Fighter, Paladin, Ranger, or Rogue**, or have the **"Weapon Master"** feat. Class level is not gated — all five classes grant mastery at level 1, so mere presence in `classes[]` is sufficient, and multiclassing into one qualifies.
- Add `WEAPON_MASTERY_CLASSES` and a `hasWeaponMastery(character)` predicate to `lib/character-class-constants.ts`, alongside the existing `HIT_DICE_TABLE`. Both are exported from the package root.
- **BREAKING (behavioural):** `AttackList` shows the Mastery column based on eligibility instead of `attacks.some(a => a.masteryProperty)`. An eligible character with unannotated weapons now gets an empty write-in column; an ineligible character with an annotated weapon no longer gets a column.
- **BREAKING (behavioural):** `WeaponMasteries` renders **all eight** mastery properties in alphabetical order, rather than only those found on the character's attacks. It no longer reads `character.attacks`, no longer needs `useCharacter()`, and drops its empty-list guard.
- `StandardCharacterSheet` renders `WeaponMasteries` only when the character is eligible **and** `userPreferences.showWeaponMasteries` is true.
- `getCharacterBrief` gains a `hasWeaponMastery: boolean` field, giving the app a serialisable eligibility signal.
- The character sheet route publishes `hasWeaponMastery` through `beforeLoad` context so `DndHeaderActions` — which renders outside the `CharacterSheet` provider and cannot call `useCharacter()` — can **hide** the "Weapon Masteries" checkbox for ineligible characters.
- Add a shared `WEAPON_MASTER` feat constant to `common-feats.ts` so the feat name is never hand-typed.
- Remove the rules-incorrect `masteryProperty: 'Slow'` from the `exampleWizard` fixture.

### Non-goals

- No change to the `WeaponMasteries` panel layout. It grows from 1–4 entries to a fixed 8, which roughly triples its height (and stacks to 8 paragraphs under `max-tablet`). Reorganising the beginner-help sections is deliberately deferred.
- No per-character override field on `Character`. Class and feat are the sole sources of truth; an override can be added later if a homebrew case appears.
- No modelling of *how many* masteries a class knows (Fighter 3, Barbarian 2, etc.).

## Capabilities

### New Capabilities

- `weapon-mastery-eligibility`: Defines who is entitled to weapon mastery (eligible classes, the "Weapon Master" feat), the `hasWeaponMastery` predicate and its exported constants, the `AttackList` Mastery column rule, and the all-eight-alphabetical content of the `WeaponMasteries` panel.

### Modified Capabilities

- `user-prefs`: `WeaponMasteries` now requires eligibility **and** the `showWeaponMasteries` preference; the dropdown checkbox is hidden entirely for ineligible characters; the stored preference is never written back on the basis of eligibility.
- `dnd-component-tests`: the *"AttackList shows mastery column conditionally"* requirement is restated in terms of eligibility rather than `masteryProperty`.
- `dnd-unit-tests`: the `getCharacterBrief` requirement is extended to cover the new `hasWeaponMastery` field.

## Impact

**Package `@ageorgedev/dnd-character-sheet`**

- `src/lib/character-class-constants.ts` — new `WEAPON_MASTERY_CLASSES`, `WEAPON_MASTER_FEAT_NAME`, `hasWeaponMastery()`
- `src/lib/character-brief.ts` — new `hasWeaponMastery` field
- `src/components/AttackList/AttackList.tsx` — column gate
- `src/components/game-infos/WeaponMasteries.tsx` — static all-eight list, hooks removed
- `src/components/StandardCharacterSheet/StandardCharacterSheet.tsx` — eligibility && pref
- `src/characters/example-wizard.data.ts` — strip `masteryProperty`
- `src/index.ts` — export the new constants and predicate

**App `game-tools`**

- `src/routes/_public/dnd/characters/$slug.{-$level}.tsx` — publish `hasWeaponMastery` in `beforeLoad` context
- `src/components/DndHeaderActions.tsx` — conditionally render the checkbox item
- `src/data/dnd-characters/common/common-feats.ts` — new `WEAPON_MASTER` constant

**Tests**

- Rewritten: `AttackList.test.tsx` (2), `StandardCharacterSheet.test.tsx` (3)
- Extended: `character-brief.test.ts`, `DndHeaderActions.test.tsx`
- New: predicate unit tests, first-ever `WeaponMasteries` test

**Not affected**

- `UserPrefsContext` — shape, defaults and persistence are unchanged
- `apps/game-tools-e2e/tests/smoke.spec.ts` — its "Weapon Masteries" assertion targets Claw (Rogue, eligible) and is currently `test.skip`
- Existing characters Splitter (Barbarian), Claw (Rogue), Gonvar (Fighter) and Omarin Kenate (Monk/**Fighter**) all remain eligible
