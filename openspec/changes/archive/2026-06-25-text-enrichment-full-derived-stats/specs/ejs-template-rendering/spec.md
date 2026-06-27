## MODIFIED Requirements

### Requirement: EJS template context exposes level data
The EJS render context SHALL provide a `level` object with `total` (sum of all class levels) and one key per class name equal to that class's level. The `level` object SHALL be sourced from `DerivedStats.level` (computed in `calculateStats`), not constructed independently in `enrichCharacterData`.

#### Scenario: Total level is accessible
- **WHEN** a description template references `level.total`
- **THEN** it resolves to the sum of all the character's class levels

#### Scenario: Class-specific level is accessible
- **WHEN** a description template references `level.<ClassName>` (e.g. `level.Monk`)
- **THEN** it resolves to the character's level in that class

#### Scenario: Missing class key evaluates to undefined
- **WHEN** a description template references a class the character does not have (e.g. `level.Wizard` on a Cleric)
- **THEN** the expression evaluates to `undefined` and EJS renders it as an empty string without throwing
