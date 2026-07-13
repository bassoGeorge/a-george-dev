## MODIFIED Requirements

### Requirement: StandardCharacterSheet accepts visualAdjustments prop
`StandardCharacterSheet` SHALL accept an optional `visualAdjustments` prop of shape `{ spellRows?: number; inventoryRows?: number; spellListMode?: 'table' | 'grouped' }`. When not provided, it SHALL default to `{ spellRows: 30, inventoryRows: 10, spellListMode: 'table' }`.

#### Scenario: No prop provided
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments`
- **THEN** `spellRows` defaults to `30`, `inventoryRows` defaults to `10`, and `spellListMode` defaults to `'table'`

#### Scenario: Partial prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 25 }}`
- **THEN** `spellRows` is `25`, `inventoryRows` defaults to `10`, and `spellListMode` defaults to `'table'`

#### Scenario: Full prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 22, inventoryRows: 8 }}`
- **THEN** `spellRows` is `22` and `inventoryRows` is `8`

#### Scenario: spellListMode grouped
- **WHEN** `visualAdjustments={{ spellListMode: 'grouped' }}` is passed
- **THEN** `useVisualAdjustments()` returns `spellListMode: 'grouped'` in all descendant components

### Requirement: VisualAdjustments includes spellListMode
`FullVisualAdjustments` SHALL include a `spellListMode: 'table' | 'grouped'` property. The default value SHALL be `'table'`. `VisualAdjustments` (the partial type) SHALL expose it as optional.

#### Scenario: Default value
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments` or with `visualAdjustments` that omits `spellListMode`
- **THEN** `spellListMode` resolves to `'table'`

#### Scenario: Explicit grouped
- **WHEN** `visualAdjustments={{ spellListMode: 'grouped' }}` is passed
- **THEN** `useVisualAdjustments()` returns `spellListMode: 'grouped'`
