## ADDED Requirements

### Requirement: Weapon mastery eligibility is determined by class or feat
The `dnd-character-sheet` package SHALL expose a `hasWeaponMastery(character: Character): boolean` predicate from `lib/character-class-constants.ts`, exported from the package root. A character SHALL be eligible for weapon mastery when either condition holds:

- at least one entry in `character.classes` names a class in `WEAPON_MASTERY_CLASSES`, or
- at least one entry in `character.feats` has the name `Weapon Master`.

`WEAPON_MASTERY_CLASSES` SHALL contain exactly `Barbarian`, `Fighter`, `Paladin`, `Ranger`, and `Rogue`, and SHALL be exported from the package root.

No class level threshold SHALL be applied, since all five classes grant Weapon Mastery at level 1. The predicate SHALL NOT consider `character.attacks`, `character.features`, or `character.speciesTraits`.

#### Scenario: Single eligible class
- **WHEN** `hasWeaponMastery` is called with a character whose only class is Fighter
- **THEN** it returns `true`

#### Scenario: Every eligible class qualifies
- **WHEN** `hasWeaponMastery` is called with single-class characters of Barbarian, Fighter, Paladin, Ranger and Rogue in turn
- **THEN** it returns `true` in every case

#### Scenario: Ineligible class
- **WHEN** `hasWeaponMastery` is called with a character whose only class is Wizard and who has no feats
- **THEN** it returns `false`

#### Scenario: Level 1 in an eligible class is sufficient
- **WHEN** `hasWeaponMastery` is called with a character who has a single level in Ranger
- **THEN** it returns `true`

#### Scenario: Multiclass with one eligible class
- **WHEN** `hasWeaponMastery` is called with a character who is Monk 2 / Fighter 3
- **THEN** it returns `true`

#### Scenario: Multiclass with no eligible class
- **WHEN** `hasWeaponMastery` is called with a character who is Sorcerer 4 / Warlock 3 and has no feats
- **THEN** it returns `false`

#### Scenario: Weapon Master feat on an otherwise ineligible character
- **WHEN** `hasWeaponMastery` is called with a Wizard whose `feats` contains a feature named `Weapon Master`
- **THEN** it returns `true`

#### Scenario: Feat name match is exact and case-sensitive
- **WHEN** `hasWeaponMastery` is called with a Wizard whose `feats` contains a feature named `Weapon master`
- **THEN** it returns `false`

#### Scenario: Unrelated feats do not grant eligibility
- **WHEN** `hasWeaponMastery` is called with a Wizard whose `feats` contains only `Alert` and `Skilled`
- **THEN** it returns `false`

#### Scenario: Attack annotations do not grant eligibility
- **WHEN** `hasWeaponMastery` is called with a Sorcerer whose attacks include a weapon with `masteryProperty: 'Slow'`
- **THEN** it returns `false`

#### Scenario: Character with no feats array
- **WHEN** `hasWeaponMastery` is called with an ineligible-class character whose `feats` is `undefined`
- **THEN** it returns `false` without throwing

### Requirement: Shared Weapon Master feat constant
`game-tools` SHALL define a shared `WEAPON_MASTER` feature constant in `apps/game-tools/src/data/dnd-characters/common/common-feats.ts` with the name `Weapon Master`, so that character data references the constant rather than hand-typing the feat name. The constant SHALL be a description-only feature with no `effects`.

#### Scenario: Constant is exported for character data
- **WHEN** a character file imports `WEAPON_MASTER` from the common feats module and places it in `feats`
- **THEN** `hasWeaponMastery` returns `true` for that character

#### Scenario: Constant name matches the predicate
- **WHEN** `WEAPON_MASTER.name` is read
- **THEN** it is exactly `Weapon Master`

### Requirement: AttackList Mastery column is gated on eligibility
`AttackList` SHALL render the Mastery column header and a Mastery cell for every attack row when `hasWeaponMastery(character)` is `true`, and SHALL render neither when it is `false`. The column SHALL NOT depend on whether any attack has a `masteryProperty`, and SHALL NOT depend on any user preference.

An attack with a `masteryProperty` SHALL continue to render its mastery name and `DiamondCheck` marker. An attack without one SHALL render an empty Mastery cell, providing write-in space for a mastery the character may later choose.

#### Scenario: Eligible character with annotated attacks
- **WHEN** a Fighter has an attack with `masteryProperty: 'Vex'`
- **THEN** a "Mastery" column header is rendered and the row shows `Vex`

#### Scenario: Eligible character with no annotated attacks
- **WHEN** a Fighter has attacks and none has a `masteryProperty`
- **THEN** a "Mastery" column header is rendered and each attack row shows an empty Mastery cell

#### Scenario: Ineligible character with an annotated attack
- **WHEN** a Wizard has an attack with `masteryProperty: 'Slow'`
- **THEN** no "Mastery" column header is rendered

#### Scenario: Ineligible character with no annotated attacks
- **WHEN** a Wizard has attacks and none has a `masteryProperty`
- **THEN** no "Mastery" column header is rendered

#### Scenario: Trailing empty row matches the column count
- **WHEN** the Mastery column is rendered
- **THEN** the trailing empty row also renders a Mastery cell so column counts align

### Requirement: WeaponMasteries panel lists all eight mastery properties
The `WeaponMasteries` component SHALL render all eight weapon mastery properties — `Cleave`, `Graze`, `Nick`, `Push`, `Sap`, `Slow`, `Topple`, `Vex` — each with its description, sorted alphabetically by name. Ordering SHALL be produced by sorting rather than by relying on the declaration order of the descriptions record.

The component SHALL NOT read `character.attacks` and SHALL NOT filter its content by the character's attacks. It SHALL NOT return `null`; visibility is owned by `StandardCharacterSheet`.

#### Scenario: All eight masteries rendered
- **WHEN** `WeaponMasteries` renders
- **THEN** all eight mastery names appear, each with its description text

#### Scenario: Alphabetical ordering
- **WHEN** `WeaponMasteries` renders
- **THEN** the mastery names appear in the order Cleave, Graze, Nick, Push, Sap, Slow, Topple, Vex

#### Scenario: Content is independent of the character's attacks
- **WHEN** `WeaponMasteries` renders for a character whose attacks carry no `masteryProperty`
- **THEN** all eight masteries are still rendered

#### Scenario: Panel title is present
- **WHEN** `WeaponMasteries` renders
- **THEN** the heading "Weapon Mastery Properties" is present

### Requirement: Character brief exposes weapon mastery eligibility
`getCharacterBrief` SHALL include a `hasWeaponMastery: boolean` field computed via the `hasWeaponMastery` predicate, providing a serialisable eligibility signal for consumers that cannot access the full `Character` object.

#### Scenario: Eligible character
- **WHEN** `getCharacterBrief` is called with a Rogue
- **THEN** the returned `hasWeaponMastery` is `true`

#### Scenario: Ineligible character
- **WHEN** `getCharacterBrief` is called with a Wizard who has no feats
- **THEN** the returned `hasWeaponMastery` is `false`

#### Scenario: Field is serialisable
- **WHEN** the returned brief is passed through `JSON.stringify`
- **THEN** `hasWeaponMastery` survives as a boolean

### Requirement: Example fixture carries no invalid mastery annotation
The `exampleWizard` fixture in the `dnd-character-sheet` package SHALL NOT declare a `masteryProperty` on any attack, since a Sorcerer/Warlock is not eligible for weapon mastery and the annotation would assert something the eligibility rule denies.

#### Scenario: Fixture has no mastery annotations
- **WHEN** `exampleWizard` is inspected
- **THEN** no attack has a `masteryProperty`

#### Scenario: Example sheet renders no Mastery column
- **WHEN** `ExampleSheet` renders
- **THEN** no "Mastery" column header is present
