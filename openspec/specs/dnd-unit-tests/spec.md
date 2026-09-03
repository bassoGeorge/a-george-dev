## Purpose

Vitest coverage for the character-sheet package's derived-stat calculations, formatting helpers, and character-brief/EJS enrichment logic.

## Requirements

### Requirement: abilityModifier returns correct modifier for any ability score
The system SHALL convert D&D ability scores to modifiers using `Math.floor((score - 10) / 2)`, covering the full valid range.

#### Scenario: Boundary and representative scores produce correct modifiers
- **WHEN** `abilityModifier` is called with scores: 1, 3, 10, 11, 15, 20
- **THEN** it returns -5, -4, 0, 0, +2, +5 respectively (multiple expects in one test)

### Requirement: proficiencyBonus returns correct bonus for each level tier
The system SHALL return the correct proficiency bonus for all five D&D 5e level tiers.

#### Scenario: All tier boundaries produce correct bonuses
- **WHEN** `proficiencyBonus` is called with levels 1, 4, 5, 8, 9, 12, 13, 16, 17, 20
- **THEN** it returns +2 for 1–4, +3 for 5–8, +4 for 9–12, +5 for 13–16, +6 for 17–20 (multiple expects in one test)

### Requirement: calculateStats applies static-skill-additions statMod
The system SHALL add flat bonuses to specified skills when a feature has a `'static-skill-additions'` statMod.

#### Scenario: Feature with static skill addition increases the target skill bonus
- **WHEN** `calculateStats` is called with a character whose feature has `statMod.type === 'static-skill-additions'` adding +3 to Perception
- **THEN** the resulting `skills.Perception` value is 3 higher than the base ability modifier

### Requirement: calculateStats applies skill-function statMod
The system SHALL invoke the provided function to compute skill bonuses when a feature has a `'skill-function'` statMod.

#### Scenario: Feature with skill-function overrides the skill calculation
- **WHEN** `calculateStats` is called with a character whose feature has `statMod.type === 'skill-function'` returning a fixed value for Stealth
- **THEN** the resulting `skills.Stealth` value matches the value returned by the function

### Requirement: calculateStats applies generic-derived statMod
The system SHALL invoke the provided function to mutate the entire `DerivedStats` object when a feature has a `'generic-derived'` statMod.

#### Scenario: Feature with generic-derived modifies derived stats freely
- **WHEN** `calculateStats` is called with a character whose feature has `statMod.type === 'generic-derived'` that sets initiative to 99
- **THEN** the resulting `initiative` value is 99

### Requirement: formatMod and formatModIgnoreZero format modifiers correctly
The system SHALL format positive modifiers with a leading `+`, negative with `-`, and zero as `+0` (formatMod) or empty string (formatModIgnoreZero).

#### Scenario: Both formatters handle positive, negative, and zero inputs
- **WHEN** `formatMod` is called with -3, 0, 5 and `formatModIgnoreZero` is called with -3, 0, 5
- **THEN** `formatMod` returns "-3", "+0", "+5" and `formatModIgnoreZero` returns "-3", "", "+5"

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
### Requirement: enrichCharacterData interpolates DerivedStats tokens in feature descriptions
The system SHALL process EJS tokens in feature description strings, replacing stat references with computed values, while leaving non-template fields unchanged.

#### Scenario: Feature description with EJS token is interpolated using derived stats
- **WHEN** `enrichCharacterData` is called with a character whose feature description contains `<%= proficiencyBonus %>`
- **THEN** the returned character's feature description contains the numeric proficiency bonus value, not the raw EJS token

#### Scenario: Non-template character fields are not mutated
- **WHEN** `enrichCharacterData` is called with a character
- **THEN** fields like ability scores and character name are unchanged in the returned value

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
