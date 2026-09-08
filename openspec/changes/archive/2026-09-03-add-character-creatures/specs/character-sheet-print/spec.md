## ADDED Requirements

### Requirement: Associated creatures are included in printed character sheets
The standard character sheet SHALL place associated creature stat blocks on additional print pages after the existing character pages. It SHALL add no creature page when the character has no associated creatures, and SHALL allow excess creature content to continue onto further print pages without clipping.

#### Scenario: Printing a character with creatures
- **WHEN** a character with one or more associated creatures is printed
- **THEN** creature stat blocks appear after the existing character-sheet pages in authored order

#### Scenario: Printing a character without creatures
- **WHEN** a character with no associated creatures is printed
- **THEN** the printed page count and existing character-sheet content are unchanged by the creature feature

#### Scenario: Creature content exceeds one page
- **WHEN** associated creature stat blocks require more than one additional print page
- **THEN** the content continues onto subsequent pages without a stat block overlapping, clipping, or being split when it can fit intact on the next page

