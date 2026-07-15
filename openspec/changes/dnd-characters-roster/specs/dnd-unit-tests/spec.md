## MODIFIED Requirements

### Requirement: getCharacterBrief extracts name, level, species, classes, and description
The system SHALL return a summary object with the character's name, total level (summed across all classes), species, an array of class names (in `character.classes` order), and a description.

The description SHALL use `character.customDescription` verbatim when set. When unset, the description SHALL default to the character's species followed by the subclass of each class that has one (classes without a subclass are omitted from the description, since class names are surfaced separately via the `classes` field).

#### Scenario: Single-class and multi-class characters produce correct level totals
- **WHEN** `getCharacterBrief` is called with a level-5 single-class character and a multi-class character with 4 levels in one class and 3 in another
- **THEN** it returns total level 5 and 7 respectively, with the correct name in each case

#### Scenario: classes field lists class names only
- **WHEN** `getCharacterBrief` is called with a character with classes Fighter and Rogue
- **THEN** the returned `classes` field is `["Fighter", "Rogue"]`

#### Scenario: Default description omits classes without a subclass
- **WHEN** a character has no `customDescription`, is species "Half-Elf", and has classes Fighter (subclass "Battlemaster") and Rogue (no subclass)
- **THEN** the returned `description` is `"Half-Elf · Battlemaster"` (Rogue is omitted, having no subclass)

#### Scenario: Custom description override is preserved
- **WHEN** a character has `customDescription` set
- **THEN** the returned `description` is that value verbatim, regardless of species or classes
