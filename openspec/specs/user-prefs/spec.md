## Purpose

Provides persisted per-user display preferences for `game-tools`, exposed through `UserPrefsContext` and edited via a customisation dropdown in the header, controlling which optional character sheet panels are shown.

## Requirements

### Requirement: User preferences context
The app SHALL provide a `UserPrefsContext` with a `UserPrefsProvider` that makes user preferences available to all components in `game-tools`. The context SHALL expose the current prefs and a setter function.

#### Scenario: Provider wraps app
- **WHEN** the app renders
- **THEN** `UserPrefsProvider` is present in `GlobalProviders` wrapping all children

#### Scenario: Default preferences
- **WHEN** no preferences have been saved to `localStorage`
- **THEN** `showActionsInCombat` is `false`, `showWeaponMasteries` is `false`, and `showNotes` is `true`

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
- `showNotes: boolean`

#### Scenario: Independent panel toggles
- **WHEN** the user enables `showActionsInCombat`
- **THEN** only `ActionsInCombat` is shown; `showWeaponMasteries` is unaffected

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

### Requirement: Customisation dropdown in header
`DndHeaderActions` SHALL render a "Customise" trigger button that opens a dropdown menu. The dropdown SHALL contain:
- A "Beginner help" label grouping `showActionsInCombat` and `showWeaponMasteries`
- An "Other panels" label grouping the "Notes" checkbox item for `showNotes`, placed **after** the "Beginner help" group with a separator between them

The "Weapon Masteries" checkbox item SHALL be rendered only when the current character is eligible for weapon mastery. Eligibility SHALL be read from the character sheet route's `beforeLoad` context, which SHALL publish `hasWeaponMastery` from `getCharacterBrief`. `DndHeaderActions` renders outside the `CharacterSheet` provider and therefore SHALL NOT attempt to read the character directly. When the character is ineligible, the item SHALL be omitted entirely rather than disabled.

#### Scenario: Dropdown renders on character sheet route
- **WHEN** the user is on a character sheet route
- **THEN** a "Customise" button is visible in the header actions

#### Scenario: Notes checkbox appears after the Beginner help group
- **WHEN** the dropdown is opened
- **THEN** the "Notes" checkbox item appears below the separator and the "Other panels" label, beneath the "Beginner help" group

#### Scenario: Checkbox reflects current state
- **WHEN** the dropdown is opened
- **THEN** each checkbox item reflects the current value of its corresponding preference

#### Scenario: Toggling a checkbox updates prefs
- **WHEN** the user clicks a checkbox item in the dropdown
- **THEN** the corresponding preference is toggled and the checkbox updates immediately

#### Scenario: Weapon Masteries item shown for an eligible character
- **WHEN** the dropdown is opened on a character whose route context has `hasWeaponMastery: true`
- **THEN** the "Weapon Masteries" checkbox item is present

#### Scenario: Weapon Masteries item hidden for an ineligible character
- **WHEN** the dropdown is opened on a character whose route context has `hasWeaponMastery: false`
- **THEN** no "Weapon Masteries" checkbox item is present

#### Scenario: Other items unaffected by ineligibility
- **WHEN** the dropdown is opened on an ineligible character
- **THEN** the "Notes" and "Actions in Combat" checkbox items are still present, along with the "Beginner help" label
### Requirement: Sheet user preferences type
The `dnd-character-sheet` package SHALL define a `SheetUserPreferences` type with optional booleans per panel. `StandardCharacterSheet` SHALL accept an optional `userPreferences?: SheetUserPreferences` prop. When absent or when a field is undefined, all panels default to hidden (`false`).

#### Scenario: No prop passed
- **WHEN** `StandardCharacterSheet` renders without a `userPreferences` prop
- **THEN** neither `ActionsInCombat` nor `WeaponMasteries` is rendered

#### Scenario: Prop passed from route
- **WHEN** the character sheet route reads user prefs from context and passes them as `userPreferences`
- **THEN** `StandardCharacterSheet` renders the correct panels

### Requirement: Conditional rendering of reference panels
`StandardCharacterSheet` SHALL render `ActionsInCombat` when `userPreferences.showActionsInCombat` is `true`. It SHALL render `WeaponMasteries` only when `hasWeaponMastery(character)` is `true` **and** `userPreferences.showWeaponMasteries` is `true`. The `!data.spellcasting` guard SHALL remain removed.

The eligibility check in the sheet is authoritative. Because `showWeaponMasteries` is a single global preference shared across all characters, the sheet SHALL NOT rely on the header having hidden the toggle.

#### Scenario: Panel hidden by default
- **WHEN** the character sheet renders and no preferences are set
- **THEN** neither `ActionsInCombat` nor `WeaponMasteries` is rendered

#### Scenario: Panel shown when pref enabled
- **WHEN** `showActionsInCombat` is `true`
- **THEN** `ActionsInCombat` is rendered regardless of whether the character has spellcasting

#### Scenario: Spellcasting character can show reference panels
- **WHEN** an eligible character has spellcasting and `showWeaponMasteries` is `true`
- **THEN** `WeaponMasteries` is rendered

#### Scenario: Eligible character with preference enabled
- **WHEN** a Fighter renders with `showWeaponMasteries: true`
- **THEN** `WeaponMasteries` is rendered, listing all eight masteries

#### Scenario: Eligible character with preference disabled
- **WHEN** a Fighter renders with `showWeaponMasteries: false`
- **THEN** `WeaponMasteries` is not rendered

#### Scenario: Ineligible character with preference enabled
- **WHEN** a Wizard renders with `showWeaponMasteries: true`
- **THEN** `WeaponMasteries` is not rendered

#### Scenario: Eligible character no longer needs annotated attacks
- **WHEN** a Fighter with no `masteryProperty` on any attack renders with `showWeaponMasteries: true`
- **THEN** `WeaponMasteries` is rendered

### Requirement: Weapon mastery eligibility never mutates stored preferences
Weapon mastery eligibility SHALL act purely as a render-time gate. Viewing a character who is ineligible SHALL NOT write `showWeaponMasteries: false` back to `localStorage`, and SHALL NOT otherwise modify the persisted preferences object. `UserPrefsContext` keeps its existing shape, defaults and storage key.

#### Scenario: Preference survives navigation to an ineligible character
- **WHEN** the user enables `showWeaponMasteries` on a Fighter, navigates to a Wizard, and returns to the Fighter
- **THEN** `showWeaponMasteries` is still `true` and the panel is rendered again

#### Scenario: Stored value untouched while viewing an ineligible character
- **WHEN** a Wizard sheet is rendered with `showWeaponMasteries: true` in `localStorage`
- **THEN** the stored value remains `true` even though the panel is hidden

#### Scenario: Defaults unchanged
- **WHEN** no preferences have been saved to `localStorage`
- **THEN** `showWeaponMasteries` is still `false` by default, as before
