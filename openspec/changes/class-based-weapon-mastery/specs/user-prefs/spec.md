## MODIFIED Requirements

### Requirement: Customisation dropdown in header
`DndHeaderActions` SHALL render a "Customise" trigger button that opens a dropdown menu. The dropdown SHALL contain:
- A "Notes" checkbox item for `showNotes`, placed **before** the "Beginner Help" section with a separator between them
- The "Beginner Help" label grouping `showActionsInCombat` and `showWeaponMasteries`

The "Weapon Masteries" checkbox item SHALL be rendered only when the current character is eligible for weapon mastery. Eligibility SHALL be read from the character sheet route's `beforeLoad` context, which SHALL publish `hasWeaponMastery` from `getCharacterBrief`. `DndHeaderActions` renders outside the `CharacterSheet` provider and therefore SHALL NOT attempt to read the character directly. When the character is ineligible, the item SHALL be omitted entirely rather than disabled.

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

#### Scenario: Weapon Masteries item shown for an eligible character
- **WHEN** the dropdown is opened on a character whose route context has `hasWeaponMastery: true`
- **THEN** the "Weapon Masteries" checkbox item is present

#### Scenario: Weapon Masteries item hidden for an ineligible character
- **WHEN** the dropdown is opened on a character whose route context has `hasWeaponMastery: false`
- **THEN** no "Weapon Masteries" checkbox item is present

#### Scenario: Other items unaffected by ineligibility
- **WHEN** the dropdown is opened on an ineligible character
- **THEN** the "Notes" and "Actions in Combat" checkbox items are still present, along with the "Beginner Help" label

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

## ADDED Requirements

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
