## ADDED Requirements

### Requirement: GroupedSpellList renders spells grouped by level
`GroupedSpellList` SHALL render spells from `spellcasting.spells` grouped into level sections. Each section SHALL have a heading: `"Cantrips"` for level 0, `"Level N"` for levels 1–9. Sections SHALL be ordered from lowest level to highest.

#### Scenario: Spells across multiple levels
- **WHEN** a character has cantrips, level 1 spells, and level 2 spells
- **THEN** three sections are rendered in order: Cantrips, Level 1, Level 2

#### Scenario: No spells at a given level
- **WHEN** a character has no level 3 spells
- **THEN** no "Level 3" section is rendered

### Requirement: Each level section uses a 3-column grid
Each level section SHALL render its spells in a 3-column CSS grid. Spells SHALL fill columns left-to-right, top-to-bottom.

#### Scenario: Level with 7 spells
- **WHEN** a level section has 7 spells
- **THEN** the grid has 3 columns with 3 spells in row 1, 3 in row 2, and 1 in row 3

### Requirement: Spell cell layout
Each spell cell SHALL display, left to right: a prepared indicator, the spell name, and right-aligned free-use circles and CRM letters.

#### Scenario: Standard preparable spell
- **WHEN** a spell is not `alwaysPrepared` and level > 0
- **THEN** a `CircleCheck` (unchecked) appears as the prepared indicator

#### Scenario: Always-prepared spell
- **WHEN** a spell has `alwaysPrepared: true`
- **THEN** the text `"AP"` in subdued italic appears instead of a checkbox

#### Scenario: Cantrip
- **WHEN** a spell has `level === 0`
- **THEN** no prepared indicator is shown

### Requirement: CRM display shows only truthy flags
The CRM display SHALL show only the letters corresponding to truthy flags on the spell, comma-separated. If no flags are truthy, nothing SHALL be shown.

#### Scenario: Concentration only
- **WHEN** `spell.concentration` is `true` and `ritual` and `materialConsumed` are falsy
- **THEN** the CRM display shows `"C"`

#### Scenario: Concentration and material consumed
- **WHEN** `spell.concentration` and `spell.components.materialConsumed` are both `true`
- **THEN** the CRM display shows `"C, M"`

#### Scenario: No flags
- **WHEN** `concentration`, `ritual`, and `materialConsumed` are all falsy
- **THEN** no CRM text is rendered

### Requirement: Free uses render inline with EmptyCheckList
If a spell has `freeUses`, the cell SHALL render the free-use label and `EmptyCheckList` circles inline, consistent with the standard `SpellList`.

#### Scenario: Spell with freeUses
- **WHEN** `spell.freeUses` is `1`
- **THEN** the cell shows `"free x1"` and one trackable circle

### Requirement: Notes and alternativeAbility render below the spell name
If a spell has `notes` or `alternativeAbility`, they SHALL render below the spell name in subdued smaller text within the same cell.

#### Scenario: Spell with notes
- **WHEN** `spell.notes` is `"1d4 to checks"`
- **THEN** `"1d4 to checks"` appears below the spell name in subdued style

#### Scenario: Spell with alternativeAbility
- **WHEN** `spell.alternativeAbility` is set
- **THEN** the ability name, to-hit modifier, and DC appear below the spell name in subdued italic

#### Scenario: Spell with neither
- **WHEN** `spell.notes` is undefined and `spell.alternativeAbility` is undefined
- **THEN** no extra line appears below the spell name

### Requirement: Spells within each level sort alwaysPrepared first, then alphabetically
Within each level group, spells with `alwaysPrepared: true` SHALL appear before other spells. Within each sub-group, spells SHALL be sorted alphabetically by name.

#### Scenario: Mixed prepared and always-prepared at same level
- **WHEN** level 1 has Charm Person (alwaysPrepared) and Bane (not)
- **THEN** Charm Person appears before Bane
