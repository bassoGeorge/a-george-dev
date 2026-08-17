## ADDED Requirements

### Requirement: User preferences context
The app SHALL provide a `UserPrefsContext` with a `UserPrefsProvider` that makes user preferences available to all components in `game-tools`. The context SHALL expose the current prefs and a setter function.

#### Scenario: Provider wraps app
- **WHEN** the app renders
- **THEN** `UserPrefsProvider` is present in `GlobalProviders` wrapping all children

#### Scenario: Default preferences
- **WHEN** no preferences have been saved to `localStorage`
- **THEN** `showActionsInCombat` is `false` and `showWeaponMasteries` is `false`

#### Scenario: Preferences read from localStorage on mount
- **WHEN** the app mounts and `localStorage` contains a previously saved `game-tools:userPrefs` entry
- **THEN** the context initialises with those saved values

#### Scenario: localStorage unavailable
- **WHEN** `localStorage` is unavailable (e.g. SSR, private browsing)
- **THEN** the context initialises with default preferences without throwing

### Requirement: User preferences persistence
The app SHALL persist user preferences to `localStorage` under the key `game-tools:userPrefs` whenever they change.

#### Scenario: Preference change is persisted
- **WHEN** the user toggles a preference
- **THEN** the updated preferences object is written to `localStorage` as JSON

#### Scenario: Preference survives page reload
- **WHEN** the user sets a preference and reloads the page
- **THEN** the preference is restored to its saved value

### Requirement: Per-panel visibility toggles
The `UserPrefs` type SHALL contain a boolean per optional reference panel. Initial panels:
- `showActionsInCombat: boolean`
- `showWeaponMasteries: boolean`

#### Scenario: Independent panel toggles
- **WHEN** the user enables `showActionsInCombat`
- **THEN** only `ActionsInCombat` is shown; `showWeaponMasteries` is unaffected

### Requirement: Customisation dropdown in header
`DndHeaderActions` SHALL render a "Customise" trigger button that opens a dropdown menu. The dropdown SHALL contain labelled checkbox items for each user pref. The "Beginner Help" label SHALL group `showActionsInCombat` and `showWeaponMasteries`.

#### Scenario: Dropdown renders on character sheet route
- **WHEN** the user is on a character sheet route
- **THEN** a "Customise" button is visible in the header actions

#### Scenario: Checkbox reflects current state
- **WHEN** the dropdown is opened
- **THEN** each checkbox item reflects the current value of its corresponding preference

#### Scenario: Toggling a checkbox updates prefs
- **WHEN** the user clicks a checkbox item in the dropdown
- **THEN** the corresponding preference is toggled and the checkbox updates immediately

### Requirement: Sheet user preferences type
The `dnd-character-sheet` package SHALL define a `SheetUserPreferences` type with optional booleans per panel. `StandardCharacterSheet` SHALL accept an optional `userPreferences?: SheetUserPreferences` prop. When absent or when a field is undefined, all panels default to hidden (`false`).

#### Scenario: No prop passed
- **WHEN** `StandardCharacterSheet` renders without a `userPreferences` prop
- **THEN** neither `ActionsInCombat` nor `WeaponMasteries` is rendered

#### Scenario: Prop passed from route
- **WHEN** the character sheet route reads user prefs from context and passes them as `userPreferences`
- **THEN** `StandardCharacterSheet` renders the correct panels

### Requirement: Conditional rendering of reference panels
`StandardCharacterSheet` SHALL render `ActionsInCombat` when `userPreferences.showActionsInCombat` is `true`, and `WeaponMasteries` when `userPreferences.showWeaponMasteries` is `true`. The `!data.spellcasting` guard SHALL be removed.

#### Scenario: Panel hidden by default
- **WHEN** the character sheet renders and no preferences are set
- **THEN** neither `ActionsInCombat` nor `WeaponMasteries` is rendered

#### Scenario: Panel shown when pref enabled
- **WHEN** `showActionsInCombat` is `true`
- **THEN** `ActionsInCombat` is rendered regardless of whether the character has spellcasting

#### Scenario: Spellcasting character can show reference panels
- **WHEN** the character has spellcasting and `showWeaponMasteries` is `true`
- **THEN** `WeaponMasteries` is rendered
