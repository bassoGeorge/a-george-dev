## ADDED Requirements

### Requirement: Character pack supports multiple named assets
A character pack SHALL support an optional ordered list of downloadable assets via an `assets` field. Each asset SHALL have an `id` string, an optional `label` string, and a `url` string. The `spellBook` field SHALL be removed.

#### Scenario: Pack with no assets
- **WHEN** a character pack defines no `assets` field
- **THEN** no asset download links are rendered in the header

#### Scenario: Pack with multiple assets
- **WHEN** a character pack defines `assets` with two or more entries
- **THEN** all asset links are rendered in the header as a flat row, in array order

### Requirement: Known asset ids have hardcoded icons and label fallbacks
The UI SHALL maintain a mapping of known asset ids to icons and default labels. Known ids and their defaults SHALL be:
- `"spellbook"` → `BookOpenTextIcon`, label `"Spellbook"`
- `"magicItems"` → `SparklesIcon`, label `"Magic Items"`

Any unknown id SHALL render with `DownloadIcon` and label `"Download"`.

#### Scenario: Spellbook asset renders correct icon and label
- **WHEN** an asset with `id: "spellbook"` and no `label` is present
- **THEN** the link renders with `BookOpenTextIcon` and the text "Spellbook"

#### Scenario: Magic items asset renders correct icon and label
- **WHEN** an asset with `id: "magicItems"` and no `label` is present
- **THEN** the link renders with `SparklesIcon` and the text "Magic Items"

#### Scenario: Unknown id uses generic fallback
- **WHEN** an asset with an unrecognised id and no `label` is present
- **THEN** the link renders with `DownloadIcon` and the text "Download"

### Requirement: Asset label can be overridden per character
If an asset entry includes a `label` field, that label SHALL be used instead of the hardcoded fallback, regardless of the asset's `id`.

#### Scenario: Custom label overrides default
- **WHEN** an asset has `id: "spellbook"` and `label: "Arcane Tome"`
- **THEN** the link text reads "Arcane Tome", not "Spellbook"

### Requirement: Asset links open PDF in a new tab
Each asset link SHALL open its URL in a new browser tab with `target="_blank"` and `rel="noopener noreferrer"`.

#### Scenario: Asset link opens in new tab
- **WHEN** a user clicks an asset download link
- **THEN** the PDF opens in a new browser tab without navigating away from the character sheet
