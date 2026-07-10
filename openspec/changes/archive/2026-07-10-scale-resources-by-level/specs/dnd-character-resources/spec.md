## ADDED Requirements

### Requirement: Resources are computed as a first-class pipeline pass
The `CharacterSheet` component SHALL compute resources via a pure `computeResources(character, stats)` function exported from `lib/calculate-resources.ts`, and SHALL expose the resulting `ComputedResource[]` on the character context alongside `character` and `derived`.

#### Scenario: Resources panel consumes computed resources from context
- **WHEN** `Resources.tsx` renders inside `CharacterSheet`
- **THEN** it reads the computed resources from `useCharacter()` and does not itself invoke resource-computation helpers

#### Scenario: computeResources is a pure function
- **WHEN** `computeResources(character, stats)` is called with the same inputs twice
- **THEN** it returns equivalent `ComputedResource[]` output with no side effects other than `console.warn` on data errors

### Requirement: ComputedResource shape separates raw values from display strings
Each `ComputedResource` SHALL expose raw values: `{ id: string; name: string; count: number; die?: string; display: 'dots' | 'numeric'; refresh: Refresh }`. Display-only formatting (e.g., turning `refresh` into `[1/Short Rest, all on Long Rest]`) SHALL occur at render time in `Resources.tsx`, not inside `computeResources`.

#### Scenario: refresh is a raw descriptor in ComputedResource
- **WHEN** `computeResources` returns a resource with `refresh: { kind: 'short-and-long-rest', numberOfRefreshesOnShortRest: 1 }`
- **THEN** the returned object's `refresh` field is the descriptor object, not a formatted string

#### Scenario: Panel formats refresh at render
- **WHEN** the Resources panel renders a `ComputedResource`
- **THEN** it calls the panel-local `getRefreshText(refresh)` helper to produce the display string

### Requirement: Resources aggregated across features, speciesTraits, and feats
`computeResources` SHALL collect resources from `character.features`, `character.speciesTraits`, and `character.feats`, preserving the current aggregation behavior of `pullAllResourcesFromFeatures`.

#### Scenario: Species trait resource appears in output
- **WHEN** a character has a `speciesTraits` entry with a `resource`
- **THEN** the resource appears in `computeResources`'s output

#### Scenario: Feat resource appears in output
- **WHEN** a character has a `feats` entry with a `resource`
- **THEN** the resource appears in `computeResources`'s output

### Requirement: Feature.resource declares an explicit id
Every `Feature.resource` SHALL declare a required `id: string`. The `id` is the stable lookup key used by EJS descriptions and is independent of the human-readable `name`.

#### Scenario: Missing id fails type checking
- **WHEN** a `Feature.resource` is authored without an `id` field
- **THEN** TypeScript reports a compilation error

#### Scenario: id survives display renames
- **WHEN** a resource's `name` changes but `id` remains the same
- **THEN** any EJS template referencing `resources.<id>` continues to resolve

### Requirement: ResourceCount supports class-level-steps variant
`ResourceCount` SHALL support a `class-level-steps` variant with shape `{ kind: 'class-level-steps'; class: string; steps: Record<number, number>; display?: 'dots' | 'numeric' }`. Resolution rule: for a character at class level L, the resolved count is `steps[k]` where `k` is the largest key in `steps` such that `k ≤ L`.

#### Scenario: Exact key match
- **WHEN** a Fighter is level 7 and `steps` is `{ 3: 4, 7: 5, 15: 6 }`
- **THEN** the resolved count is 5

#### Scenario: Between keys
- **WHEN** a Fighter is level 10 and `steps` is `{ 3: 4, 7: 5, 15: 6 }`
- **THEN** the resolved count is 5

#### Scenario: Above highest key
- **WHEN** a Fighter is level 20 and `steps` is `{ 3: 4, 7: 5, 15: 6 }`
- **THEN** the resolved count is 6

#### Scenario: Below lowest key warns and filters
- **WHEN** a Fighter is level 1 and `steps` is `{ 3: 4, 7: 5, 15: 6 }`
- **THEN** `console.warn` is emitted and the resource is omitted from the output

#### Scenario: Out-of-order step keys resolve correctly
- **WHEN** `steps` is authored as `{ 15: 6, 3: 4, 7: 5 }` and the character is level 8
- **THEN** the resolved count is 5

#### Scenario: Class not on character warns and filters
- **WHEN** the character does not have the referenced class
- **THEN** `console.warn` is emitted and the resource is omitted from the output

### Requirement: Feature.resource supports an optional die progression
`Feature.resource` SHALL support an optional `die` field with type `{ kind: 'fixed'; value: string } | { kind: 'class-level-steps'; class: string; steps: Record<number, string> }`. The `class-level-steps` variant follows the same "highest key ≤ level wins" resolution rule as counts.

#### Scenario: Fixed die resolves to its value
- **WHEN** `die` is `{ kind: 'fixed', value: 'd8' }`
- **THEN** the ComputedResource's `die` is `'d8'`

#### Scenario: Class-level-steps die progression resolves at level
- **WHEN** a Bard is level 10 and `die` is `{ kind: 'class-level-steps', class: 'Bard', steps: { 1: 'd6', 5: 'd8', 10: 'd10', 15: 'd12' } }`
- **THEN** the ComputedResource's `die` is `'d10'`

#### Scenario: Unresolvable die warns and filters the resource
- **WHEN** the die's `class-level-steps` cannot resolve (class not on character or below lowest step)
- **THEN** `console.warn` is emitted and the resource is omitted from the output

#### Scenario: Absent die leaves ComputedResource.die undefined
- **WHEN** a resource has no `die` field
- **THEN** the ComputedResource's `die` is undefined

### Requirement: Resources panel renders die as suffix on the resource name
When a `ComputedResource` has a `die` value, the Resources panel SHALL render the resource's name with the die in parentheses appended, formatted as `<name> (<die>)`. The count/checkmarks and refresh columns SHALL remain unchanged from the die-less rendering.

#### Scenario: Name suffix appears when die is present
- **WHEN** a `ComputedResource` has `name: 'Superiority Dice'` and `die: 'd8'`
- **THEN** the panel row's name text is `Superiority Dice (d8)`

#### Scenario: No suffix when die is absent
- **WHEN** a `ComputedResource` has `name: 'Sorcery Points'` and no `die`
- **THEN** the panel row's name text is `Sorcery Points`
