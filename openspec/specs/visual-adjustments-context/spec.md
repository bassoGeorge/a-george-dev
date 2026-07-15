## Purpose

A `VisualAdjustmentsContext` that lets per-character layout tuning (spell/inventory/notes row counts, spell list mode, combined species/feats panel) flow to descendant components without prop drilling.

## Requirements

### Requirement: StandardCharacterSheet accepts visualAdjustments prop
`StandardCharacterSheet` SHALL accept an optional `visualAdjustments` prop of shape `{ spellRows?: number; inventoryRows?: number; notesRows?: number; spellListMode?: 'table' | 'grouped' }`. When not provided, it SHALL default to `{ spellRows: 30, inventoryRows: 10, notesRows: 10, spellListMode: 'table' }`.

#### Scenario: No prop provided
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments`
- **THEN** `spellRows` defaults to `30`, `inventoryRows` defaults to `10`, `notesRows` defaults to `10`, and `spellListMode` defaults to `'table'`

#### Scenario: Partial prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 25 }}`
- **THEN** `spellRows` is `25`, `inventoryRows` defaults to `10`, `notesRows` defaults to `10`, and `spellListMode` defaults to `'table'`

#### Scenario: Full prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 22, inventoryRows: 8 }}`
- **THEN** `spellRows` is `22` and `inventoryRows` is `8`

#### Scenario: spellListMode grouped
- **WHEN** `visualAdjustments={{ spellListMode: 'grouped' }}` is passed
- **THEN** `useVisualAdjustments()` returns `spellListMode: 'grouped'` in all descendant components

#### Scenario: notesRows explicitly set
- **WHEN** `visualAdjustments={{ notesRows: 5 }}` is passed
- **THEN** `useVisualAdjustments()` returns `notesRows: 5` in all descendant components

### Requirement: VisualAdjustmentsContext is provided by StandardCharacterSheet
`StandardCharacterSheet` SHALL create a `VisualAdjustmentsContext` and provide it to all descendant components. The context SHALL carry the resolved `spellRows`, `inventoryRows`, `notesRows`, and `spellListMode` values.

#### Scenario: Context available to descendants
- **WHEN** `SpellList`, `GroupedSpellList`, `Inventory`, or `NotesPanel` renders inside `StandardCharacterSheet`
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
`VisualAdjustmentsContext` SHALL define default values (`spellRows: 30`, `inventoryRows: 10`, `notesRows: 10`, `spellListMode: 'table'`) so that `SpellList`, `GroupedSpellList`, `Inventory`, and `NotesPanel` remain functional if rendered outside of `StandardCharacterSheet`.

#### Scenario: Components used standalone
- **WHEN** `SpellList`, `GroupedSpellList`, `Inventory`, or `NotesPanel` is rendered without a `VisualAdjustmentsContext` provider
- **THEN** they SHALL use the context defaults and render without errors

### Requirement: VisualAdjustments includes speciesAndFeatsCombinedPanel
`FullVisualAdjustments` SHALL include a `speciesAndFeatsCombinedPanel: boolean` property. The default value SHALL be `false`. `VisualAdjustments` (the partial type) SHALL expose it as optional.

#### Scenario: Default value
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments` or with `visualAdjustments` that omits `speciesAndFeatsCombinedPanel`
- **THEN** `speciesAndFeatsCombinedPanel` resolves to `false`

#### Scenario: Explicit true
- **WHEN** `visualAdjustments={{ speciesAndFeatsCombinedPanel: true }}` is passed
- **THEN** `useVisualAdjustments()` returns `speciesAndFeatsCombinedPanel: true` in all descendant components

### Requirement: VisualAdjustments includes spellListMode
`FullVisualAdjustments` SHALL include a `spellListMode: 'table' | 'grouped'` property. The default value SHALL be `'table'`. `VisualAdjustments` (the partial type) SHALL expose it as optional.

#### Scenario: Default value
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments` or with `visualAdjustments` that omits `spellListMode`
- **THEN** `spellListMode` resolves to `'table'`

#### Scenario: Explicit grouped
- **WHEN** `visualAdjustments={{ spellListMode: 'grouped' }}` is passed
- **THEN** `useVisualAdjustments()` returns `spellListMode: 'grouped'`

### Requirement: VisualAdjustments includes notesRows
`FullVisualAdjustments` SHALL include a `notesRows: number` property. The default value SHALL be `10`. `VisualAdjustments` (the partial type) SHALL expose it as optional.

#### Scenario: Default value
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments` or with `visualAdjustments` that omits `notesRows`
- **THEN** `notesRows` resolves to `10`

#### Scenario: Custom value
- **WHEN** `visualAdjustments={{ notesRows: 15 }}` is passed
- **THEN** `useVisualAdjustments()` returns `notesRows: 15`

### Requirement: NotesPanel reads notesRows from context
`NotesPanel` SHALL read `notesRows` from `VisualAdjustmentsContext` and pass it as `lineCount` to `HandWrittenNotes`, replacing the hardcoded value of `10`.

#### Scenario: Context value used for line count
- **WHEN** `notesRows` is `15`
- **THEN** `HandWrittenNotes` renders with `lineCount={15}`

#### Scenario: Default context value preserves existing behaviour
- **WHEN** `notesRows` is the default `10`
- **THEN** `HandWrittenNotes` renders with `lineCount={10}` (same as before this change)

### Requirement: NotesPanel is suppressed when notesRows is zero
`StandardCharacterSheet` SHALL not render `NotesPanel` when `notesRows === 0`.

#### Scenario: notesRows is zero
- **WHEN** `visualAdjustments={{ notesRows: 0 }}` is passed
- **THEN** `NotesPanel` is not present in the rendered output

#### Scenario: notesRows is non-zero
- **WHEN** `notesRows` is any value greater than `0`
- **THEN** `NotesPanel` is rendered normally
