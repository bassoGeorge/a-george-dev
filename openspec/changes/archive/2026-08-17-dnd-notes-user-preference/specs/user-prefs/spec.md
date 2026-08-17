## ADDED Requirements

### Requirement: showNotes preference controls Notes panel visibility
`UserPrefs` SHALL include a `showNotes: boolean` field. The default value SHALL be `true`. `SheetUserPreferences` in the `dnd-character-sheet` package SHALL expose `showNotes?: boolean`. `StandardCharacterSheet` SHALL render `NotesPanel` when `userPreferences.showNotes` is `true` (or absent, falling back to `false` at the sheet level — but `true` must be passed from the route when the user preference is on).

#### Scenario: Default preference shows notes
- **WHEN** no preferences have been saved to localStorage
- **THEN** `showNotes` is `true` and the Notes panel is visible

#### Scenario: Notes hidden when toggled off
- **WHEN** the user sets `showNotes` to `false`
- **THEN** `NotesPanel` is not rendered in `StandardCharacterSheet`

#### Scenario: Notes shown when toggled on
- **WHEN** the user sets `showNotes` to `true`
- **THEN** `NotesPanel` is rendered in `StandardCharacterSheet`

#### Scenario: Preference survives page reload
- **WHEN** the user toggles `showNotes` off and reloads the page
- **THEN** `showNotes` is restored to `false` from localStorage

## MODIFIED Requirements

### Requirement: Customisation dropdown in header
`DndHeaderActions` SHALL render a "Customise" trigger button that opens a dropdown menu. The dropdown SHALL contain:
- A "Notes" checkbox item for `showNotes`, placed **before** the "Beginner Help" section with a separator between them
- The "Beginner Help" label grouping `showActionsInCombat` and `showWeaponMasteries`

#### Scenario: Dropdown renders on character sheet route
- **WHEN** the user is on a character sheet route
- **THEN** a "Customise" button is visible in the header actions

#### Scenario: Notes checkbox appears before Beginner Help group
- **WHEN** the dropdown is opened
- **THEN** the "Notes" checkbox item appears above the "Beginner Help" separator and label

#### Scenario: Checkbox reflects current state
- **WHEN** the dropdown is opened
- **THEN** each checkbox item reflects the current value of its corresponding preference

#### Scenario: Toggling a checkbox updates prefs
- **WHEN** the user clicks a checkbox item in the dropdown
- **THEN** the corresponding preference is toggled and the checkbox updates immediately

## MODIFIED Requirements

### Requirement: Default preferences
`DEFAULT_USER_PREFS` SHALL include `showNotes: true` in addition to the existing fields.

#### Scenario: Default preferences
- **WHEN** no preferences have been saved to localStorage
- **THEN** `showActionsInCombat` is `false`, `showWeaponMasteries` is `false`, and `showNotes` is `true`
