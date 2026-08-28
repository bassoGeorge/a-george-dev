## MODIFIED Requirements

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
