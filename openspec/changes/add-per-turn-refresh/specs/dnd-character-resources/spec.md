## ADDED Requirements

### Requirement: Refresh supports a per-turn variant
`Refresh` SHALL accept `{ kind: 'per-turn' }` as a valid variant. A `per-turn` refresh signals that the resource refreshes every turn and is therefore not tracked by the player between actions.

#### Scenario: Per-turn refresh type-checks on Feature.resource
- **WHEN** a `Feature.resource` is authored with `refresh: { kind: 'per-turn' }`
- **THEN** TypeScript accepts it without narrowing errors

### Requirement: computeResources includes per-turn resources
`computeResources` SHALL include resources with `refresh.kind === 'per-turn'` in its returned `ComputedResource[]`, subject to the same count/die resolution and filtering rules as other resources.

#### Scenario: Per-turn resource with class-level-steps count resolves
- **WHEN** a character has a per-turn resource with `count: { kind: 'class-level-steps', class: 'Rogue', steps: { 1: 1, 3: 2, 5: 3 } }` and Rogue level 3
- **THEN** the resource appears in the returned `ComputedResource[]` with `count: 2`

#### Scenario: Per-turn resource with class-level-steps die resolves
- **WHEN** a character has a per-turn resource with `die: { kind: 'class-level-steps', class: 'Monk', steps: { 1: 'd6', 5: 'd8' } }` and Monk level 5
- **THEN** the resource appears in the returned `ComputedResource[]` with `die: 'd8'`

#### Scenario: Unresolvable per-turn resource is filtered with a warning
- **WHEN** a per-turn resource references a class the character does not have
- **THEN** `console.warn` is emitted and the resource is omitted from the returned `ComputedResource[]`

### Requirement: Resources panel filters out per-turn resources
The Resources panel SHALL not render a row for any `ComputedResource` whose `refresh.kind === 'per-turn'`. All other rendering behavior for non-per-turn resources SHALL be unchanged.

#### Scenario: Per-turn resource does not render as a row
- **WHEN** the Resources panel receives a `ComputedResource` with `refresh: { kind: 'per-turn' }`
- **THEN** no counter row for that resource appears in the panel

#### Scenario: Non-per-turn resources render unchanged when a per-turn resource is present
- **WHEN** a character has both a per-turn resource and a short-rest resource
- **THEN** the short-rest resource renders as a normal counter row

### Requirement: EJS locals include per-turn resources
The EJS `resources` locals object exposed by `enrichCharacterData` SHALL include per-turn resources keyed by their `id`, alongside rest-refreshing resources.

#### Scenario: EJS description references a per-turn resource's count and die
- **WHEN** a feature description contains `<%= resources.sneakAttack.count %><%= resources.sneakAttack.die %>` and the character's Sneak Attack resource resolves to `count: 2, die: 'd6'`
- **THEN** the rendered description contains the literal string `2d6`

#### Scenario: EJS lookup for per-turn resource by id succeeds
- **WHEN** a per-turn resource has `id: 'martialArts'` and the description references `resources.martialArts.die`
- **THEN** the lookup resolves to the computed die value
