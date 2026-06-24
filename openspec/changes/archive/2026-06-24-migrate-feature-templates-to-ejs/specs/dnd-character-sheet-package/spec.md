## MODIFIED Requirements

### Requirement: Feature text supports EJS template substitution
The package SHALL enrich feature, feat, and species trait descriptions at render time using EJS templating. Templates have access to character level data (`<%= level.total %>`, `<%= level.<ClassName> %>`) and support full JavaScript expressions, conditionals, and loops.

#### Scenario: Feature description with level placeholder
- **WHEN** a feature's `description` contains `<%= level.total %>`
- **THEN** the rendered description shows the character's total level as a number

#### Scenario: Feature description with class-level placeholder
- **WHEN** a feature's `description` contains `<%= level.Monk %>`
- **THEN** the rendered description shows the character's Monk class level

#### Scenario: Feature description with arithmetic expression
- **WHEN** a feature's `description` contains `<%= level.total * 10 %>`
- **THEN** the rendered description shows the computed numeric result

## REMOVED Requirements

### Requirement: Feature text supports Mustache template substitution
**Reason**: Replaced by EJS template rendering, which supports full JavaScript expressions that Mustache cannot evaluate.
**Migration**: Replace `{{variable}}` syntax with `<%= variable %>` in all description strings.
