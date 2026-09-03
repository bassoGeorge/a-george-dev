## MODIFIED Requirements

### Requirement: AttackList shows mastery column conditionally
AttackList SHALL show a Mastery column only when the character is eligible for weapon mastery, as determined by `hasWeaponMastery(character)`. The column SHALL NOT be derived from whether any attack has a `masteryProperty`, and SHALL NOT depend on any user preference.

#### Scenario: Mastery column present
- **WHEN** the character has a level in an eligible class (for example Fighter)
- **THEN** a "Mastery" column header is rendered

#### Scenario: Mastery column absent
- **WHEN** the character has no eligible class and no `Weapon Master` feat
- **THEN** no "Mastery" column header is rendered

#### Scenario: Mastery column present without annotated attacks
- **WHEN** the character is a Fighter and no attack has a `masteryProperty`
- **THEN** a "Mastery" column header is rendered and each attack row has an empty Mastery cell

#### Scenario: Mastery column absent despite an annotated attack
- **WHEN** the character is a Wizard and an attack has `masteryProperty: 'Slow'`
- **THEN** no "Mastery" column header is rendered

#### Scenario: Mastery column present via the Weapon Master feat
- **WHEN** the character is a Wizard whose `feats` contains a feature named `Weapon Master`
- **THEN** a "Mastery" column header is rendered

#### Scenario: Mastery value still rendered for annotated attacks
- **WHEN** an eligible character has an attack with `masteryProperty: 'Vex'`
- **THEN** the row displays `Vex` alongside its `DiamondCheck` marker

## ADDED Requirements

### Requirement: WeaponMasteries panel is covered by component tests
The `dnd-character-sheet` package SHALL include a Vitest component test file for `WeaponMasteries`, which currently has none. The tests SHALL assert the panel's full content and ordering, independently of any character data.

#### Scenario: All eight masteries asserted
- **WHEN** the `WeaponMasteries` test renders the component
- **THEN** it asserts that all eight mastery names and their descriptions are present

#### Scenario: Alphabetical order asserted
- **WHEN** the `WeaponMasteries` test renders the component
- **THEN** it asserts the rendered order is Cleave, Graze, Nick, Push, Sap, Slow, Topple, Vex

#### Scenario: No character dependency
- **WHEN** the `WeaponMasteries` test renders the component
- **THEN** it renders without a `CharacterSheet` provider, since the component no longer calls `useCharacter()`
