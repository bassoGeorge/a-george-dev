## MODIFIED Requirements

### Requirement: StandardCharacterSheet accepts visualAdjustments prop
`StandardCharacterSheet` SHALL accept an optional `visualAdjustments` prop of shape `{ spellRows?: number; inventoryRows?: number; notesRows?: number; spellListMode?: 'table' | 'grouped' }`. When not provided, it SHALL default to `{ spellRows: 30, inventoryRows: 10, notesRows: 10, spellListMode: 'table' }`.

#### Scenario: No prop provided
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments`
- **THEN** `spellRows` defaults to `30`, `inventoryRows` defaults to `10`, `notesRows` defaults to `10`, and `spellListMode` defaults to `'table'`

#### Scenario: Partial prop provided
- **WHEN** `StandardCharacterSheet` is rendered with `visualAdjustments={{ spellRows: 25 }}`
- **THEN** `spellRows` is `25`, `inventoryRows` defaults to `10`, `notesRows` defaults to `10`, and `spellListMode` defaults to `'table'`

#### Scenario: notesRows explicitly set
- **WHEN** `visualAdjustments={{ notesRows: 5 }}` is passed
- **THEN** `useVisualAdjustments()` returns `notesRows: 5` in all descendant components

### Requirement: VisualAdjustments includes notesRows
`FullVisualAdjustments` SHALL include a `notesRows: number` property. The default value SHALL be `10`. `VisualAdjustments` (the partial type) SHALL expose it as optional.

#### Scenario: Default value
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments` or with `visualAdjustments` that omits `notesRows`
- **THEN** `notesRows` resolves to `10`

#### Scenario: Custom value
- **WHEN** `visualAdjustments={{ notesRows: 15 }}` is passed
- **THEN** `useVisualAdjustments()` returns `notesRows: 15`

## ADDED Requirements

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
