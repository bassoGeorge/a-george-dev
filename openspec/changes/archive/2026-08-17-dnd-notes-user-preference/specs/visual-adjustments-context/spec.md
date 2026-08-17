## REMOVED Requirements

### Requirement: VisualAdjustments includes notesRows
**Reason**: `notesRows` was used both as a row-count config and as an implicit visibility gate (`notesRows > 0`). Visibility is now controlled by `showNotes` in `SheetUserPreferences`. Row count is hardcoded to `10` inside `NotesPanel` — no character overrides it to anything meaningful other than `0`.
**Migration**: Replace any `visualAdjustments={{ notesRows: 0 }}` usage with `userPreferences={{ showNotes: false }}` (or the equivalent via `UserPrefsContext`).

### Requirement: NotesPanel reads notesRows from context
**Reason**: `notesRows` is removed from context. `NotesPanel` now uses a hardcoded `lineCount={10}`.
**Migration**: No consumer action needed; `NotesPanel` behaviour is unchanged for the common case.

### Requirement: NotesPanel is suppressed when notesRows is zero
**Reason**: Visibility is now controlled by `userPreferences.showNotes`. The `notesRows > 0` guard is removed entirely.
**Migration**: Pass `showNotes: false` via `userPreferences` prop to suppress the Notes panel.

## MODIFIED Requirements

### Requirement: StandardCharacterSheet accepts visualAdjustments prop
`StandardCharacterSheet` SHALL accept an optional `visualAdjustments` prop of shape `{ spellRows?: number; inventoryRows?: number; spellListMode?: 'table' | 'grouped' }`. When not provided, it SHALL default to `{ spellRows: 30, inventoryRows: 10, spellListMode: 'table' }`. The `notesRows` field is removed.

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
