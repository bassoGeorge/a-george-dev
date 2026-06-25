## ADDED Requirements

### Requirement: StandardCharacterSheet accepts visualAdjustments prop
`StandardCharacterSheet` SHALL accept an optional `visualAdjustments` prop of shape `{ spellRows?: number; inventoryRows?: number }`. When not provided, it SHALL default to `{ spellRows: 30, inventoryRows: 10 }`.

#### Scenario: No prop provided
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments`
- **THEN** `spellRows` defaults to `30` and `inventoryRows` defaults to `10`

#### Scenario: Partial prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 25 }}`
- **THEN** `spellRows` is `25` and `inventoryRows` defaults to `10`

#### Scenario: Full prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 22, inventoryRows: 8 }}`
- **THEN** `spellRows` is `22` and `inventoryRows` is `8`

### Requirement: VisualAdjustmentsContext is provided by StandardCharacterSheet
`StandardCharacterSheet` SHALL create a `VisualAdjustmentsContext` and provide it to all descendant components. The context SHALL carry the resolved `spellRows` and `inventoryRows` values.

#### Scenario: Context available to descendants
- **WHEN** `SpellList` or `Inventory` renders inside `StandardCharacterSheet`
- **THEN** they SHALL read layout values from `VisualAdjustmentsContext` without requiring props passed through intermediate components

### Requirement: SpellList reads spellRows from context
`SpellList` SHALL replace the hardcoded `totalRows = 30` with the `spellRows` value from `VisualAdjustmentsContext`. The number of empty rows rendered SHALL equal `spellRows` minus the number of populated spell rows.

#### Scenario: Context value used for empty row count
- **WHEN** a character has 10 spells and `spellRows` is `25`
- **THEN** `SpellList` renders `15` empty rows

#### Scenario: Default context value preserves existing behaviour
- **WHEN** `spellRows` is the default `30` and a character has 10 spells
- **THEN** `SpellList` renders `20` empty rows (same as before this change)

### Requirement: Inventory reads inventoryRows from context
`Inventory` SHALL replace the hardcoded `lineCount={10}` on `HandWrittenNotes` with the `inventoryRows` value from `VisualAdjustmentsContext`.

#### Scenario: Context value used for note line count
- **WHEN** `inventoryRows` is `8`
- **THEN** `HandWrittenNotes` renders with `lineCount={8}`

#### Scenario: Default context value preserves existing behaviour
- **WHEN** `inventoryRows` is the default `10`
- **THEN** `HandWrittenNotes` renders with `lineCount={10}` (same as before this change)

### Requirement: Context has safe defaults outside StandardCharacterSheet
`VisualAdjustmentsContext` SHALL define default values (`spellRows: 30`, `inventoryRows: 10`) so that `SpellList` and `Inventory` remain functional if rendered outside of `StandardCharacterSheet`.

#### Scenario: Components used standalone
- **WHEN** `SpellList` or `Inventory` is rendered without a `VisualAdjustmentsContext` provider
- **THEN** they SHALL use the context defaults and render without errors
