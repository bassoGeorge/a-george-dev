## ADDED Requirements

### Requirement: EJS renders expression templates in descriptions
The package SHALL use EJS to render template strings in feature, feat, and species trait descriptions. Templates SHALL support full JavaScript expressions, not just property lookups.

#### Scenario: Simple property lookup
- **WHEN** a description contains `<%= level.Cleric %>`
- **THEN** the rendered output contains the character's Cleric class level as a number

#### Scenario: Arithmetic expression
- **WHEN** a description contains `<%= level.total * 10 %>`
- **THEN** the rendered output contains the result of multiplying total character level by 10

#### Scenario: Conditional expression
- **WHEN** a description contains `<% if (level.total >= 5) { %>upgraded text<% } %>`
- **THEN** the rendered output includes "upgraded text" only when total level is 5 or greater

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
