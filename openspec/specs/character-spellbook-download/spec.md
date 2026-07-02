## ADDED Requirements

### Requirement: Spellbook download button appears when a character sheet exposes a spellbook URL
The game-tools `_public.tsx` header SHALL render a Spellbook Download button when the active route hierarchy contains a match whose `staticData.spellBookUrl` is a non-empty string. The button SHALL be positioned in the header controls area beside the existing Print button. The button SHALL NOT appear when no matched route provides a `spellBookUrl`, including on the character list route and on character-sheet routes without a spellbook.

#### Scenario: Character sheet with spellbook URL shows the button
- **WHEN** a user navigates to `/dnd/characters/zoynari/2`, whose route defines `staticData.spellBookUrl`
- **THEN** a Spellbook Download button is visible in the header alongside the Print button

#### Scenario: Character sheet without spellbook URL hides the button
- **WHEN** a user navigates to a character sheet route that does not define `staticData.spellBookUrl`
- **THEN** no Spellbook Download button is rendered in the header

#### Scenario: Non-character-sheet routes hide the button
- **WHEN** a user navigates to `/` or `/dnd/characters`
- **THEN** no Spellbook Download button is rendered in the header

### Requirement: Spellbook download button downloads the referenced PDF
Activating the Spellbook Download button SHALL trigger a browser download of the PDF referenced by `staticData.spellBookUrl`. The control SHALL be implemented such that the browser saves the file rather than navigating to or opening it inline — for example, by rendering an anchor element with `href` set to the spellbook URL and a `download` attribute.

#### Scenario: User activates the download button
- **WHEN** the user clicks the Spellbook Download button on a character sheet whose `staticData.spellBookUrl` points to `zoynari-spellbook-2.pdf`
- **THEN** the browser initiates a download of the referenced PDF file rather than navigating to it in the current tab

### Requirement: Spellbook download button is accessible
The Spellbook Download button SHALL expose an accessible name via `aria-label` (e.g., `"Download spellbook PDF"`) and SHALL use an icon consistent with the existing header controls (a Phosphor icon at the same visual size as the Print icon).

#### Scenario: Screen reader announces the control
- **WHEN** an assistive technology inspects the header controls on a character sheet with a spellbook URL
- **THEN** the Spellbook Download control is announced with an accessible name describing a spellbook download action

### Requirement: Spellbook download button is hidden when printing
The Spellbook Download button SHALL be omitted from printed output — either by living inside the existing `print:hidden` header container or by carrying an equivalent print-hiding utility.

#### Scenario: Printing a character sheet with a spellbook
- **WHEN** the browser renders a character sheet for print
- **THEN** the Spellbook Download button is not visible in the printed output
