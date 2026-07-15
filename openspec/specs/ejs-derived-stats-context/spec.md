## Purpose

Exposes computed resource counts and dice, keyed by id, to EJS description templates alongside the existing derived-stats locals.

## Requirements

### Requirement: EJS context exposes computed resources keyed by id
In addition to the spread of `DerivedStats`, the EJS render context SHALL include a `resources` object keyed by each `ComputedResource`'s `id`, so feature/feat/species-trait description templates can reference computed count and die values.

#### Scenario: Resource count is accessible in a description
- **WHEN** a description template references `<%= resources.superiorityDice.count %>` and the character has a resource with `id: 'superiorityDice'` resolved to count 5
- **THEN** the rendered output contains `5`

#### Scenario: Resource die is accessible in a description
- **WHEN** a description template references `<%= resources.bardicInspiration.die %>` and the character has a resource with `id: 'bardicInspiration'` resolved to die `d10`
- **THEN** the rendered output contains `d10`

#### Scenario: Missing resource id is undefined
- **WHEN** a description template references `<%= resources.nonexistent %>` and no resource with that id exists
- **THEN** EJS renders it as an empty string (standard EJS behavior for undefined values)

#### Scenario: Existing DerivedStats locals continue to work
- **WHEN** a description template references `<%= proficiencyBonus %>` alongside `<%= resources.someId.count %>`
- **THEN** both interpolate correctly in the same template
