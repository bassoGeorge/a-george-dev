## MODIFIED Requirements

### Requirement: getCharacterBrief extracts name, level, species, classes, and description
The system SHALL return a summary object with the character's name, total level (summed across all classes), species, an array of class names (in `character.classes` order), a description, and a `hasWeaponMastery` boolean.

The description SHALL use `character.customDescription` verbatim when set. When unset, the description SHALL default to the character's species followed by the subclass of each class that has one (classes without a subclass are omitted from the description, since class names are surfaced separately via the `classes` field).

`hasWeaponMastery` SHALL be computed via the `hasWeaponMastery` predicate, so that the brief carries a serialisable weapon mastery eligibility signal for consumers that cannot access the full `Character` object.

#### Scenario: Single-class and multi-class characters produce correct level totals
- **WHEN** `getCharacterBrief` is called with a level-5 single-class character and a multi-class character with 4 levels in one class and 3 in another
- **THEN** it returns total level 5 and 7 respectively, with the correct name in each case

#### Scenario: classes field lists class names only
- **WHEN** `getCharacterBrief` is called with a character with classes Fighter and Rogue
- **THEN** the returned `classes` field is `["Fighter", "Rogue"]`

#### Scenario: Default description omits classes without a subclass
- **WHEN** a character has no `customDescription`, is species "Half-Elf", and has classes Fighter (subclass "Battlemaster") and Rogue (no subclass)
- **THEN** the returned `description` is `"Half-Elf · Battlemaster"` (Rogue is omitted, having no subclass)

#### Scenario: Custom description override is preserved
- **WHEN** a character has `customDescription` set
- **THEN** the returned `description` is that value verbatim, regardless of species or classes

#### Scenario: hasWeaponMastery true for an eligible class
- **WHEN** `getCharacterBrief` is called with a Rogue
- **THEN** the returned `hasWeaponMastery` is `true`

#### Scenario: hasWeaponMastery true via the Weapon Master feat
- **WHEN** `getCharacterBrief` is called with a Wizard whose `feats` contains a feature named `Weapon Master`
- **THEN** the returned `hasWeaponMastery` is `true`

#### Scenario: hasWeaponMastery false for an ineligible character
- **WHEN** `getCharacterBrief` is called with a Wizard who has no feats
- **THEN** the returned `hasWeaponMastery` is `false`

## ADDED Requirements

### Requirement: hasWeaponMastery predicate is covered by unit tests
The `dnd-character-sheet` package SHALL include Vitest unit tests for `hasWeaponMastery` and `WEAPON_MASTERY_CLASSES` in `lib/`, exercising the rule without rendering any component.

#### Scenario: Each eligible class covered
- **WHEN** the predicate tests run
- **THEN** each of Barbarian, Fighter, Paladin, Ranger and Rogue is asserted to return `true` as a single-class character

#### Scenario: Ineligible classes covered
- **WHEN** the predicate tests run
- **THEN** at least one ineligible class (for example Wizard) is asserted to return `false`

#### Scenario: Multiclass cases covered
- **WHEN** the predicate tests run
- **THEN** a Monk/Fighter multiclass returns `true` and a Sorcerer/Warlock multiclass returns `false`

#### Scenario: Feat cases covered
- **WHEN** the predicate tests run
- **THEN** an exact `Weapon Master` feat returns `true`, a differently-cased name returns `false`, and an absent `feats` array returns `false` without throwing

#### Scenario: Attack annotations asserted irrelevant
- **WHEN** the predicate tests run
- **THEN** a character with a `masteryProperty` attack but no eligible class or feat is asserted to return `false`
