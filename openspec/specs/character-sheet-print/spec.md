## Purpose

A Print button on individual character-sheet pages that triggers the browser print dialog and is hidden from the printed output itself.

## Requirements

### Requirement: Print button appears on character sheet pages only
At screen widths of 600 CSS pixels and above, the header SHALL display a Print button when the user is viewing an individual character sheet page. The button SHALL NOT appear below 600 CSS pixels, on the character list page, or on any other page. Printing initiated through a mobile browser's own controls is unsupported.

#### Scenario: Viewing a character sheet page
- **WHEN** the user navigates to an individual character sheet at a viewport width of 600 CSS pixels or above
- **THEN** a Print button is visible in the header bar

#### Scenario: Viewing a character sheet page on mobile
- **WHEN** the user navigates to an individual character sheet at a viewport width below 600 CSS pixels
- **THEN** no Print button is visible in the header bar

#### Scenario: Viewing the character list page
- **WHEN** the user navigates to `/dnd/characters`
- **THEN** no Print button is present in the header bar

### Requirement: Print button triggers browser print dialog
The Print button SHALL call `window.print()` when clicked, opening the browser's native print dialog.

#### Scenario: User clicks Print
- **WHEN** the user clicks the Print button on a character sheet page
- **THEN** the browser print dialog opens

### Requirement: Print button is hidden during printing
The Print button SHALL NOT appear in the printed output or PDF.

#### Scenario: Printing the character sheet
- **WHEN** the browser renders the page for print
- **THEN** the Print button is not visible in the printed output
