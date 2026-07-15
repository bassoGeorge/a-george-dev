## ADDED Requirements

### Requirement: Character files reference SPELL map instead of hand-writing spells
Character data files SHALL reference the generated `SPELL` map (from `@ageorgedev/dnd-character-sheet`) for all spells that exist in `spells-2024.csv`, rather than duplicating spell definition fields inline.

#### Scenario: A spell available in the SPELL map is referenced by key
- **WHEN** a character file includes a spell that exists in `spells-2024.csv`
- **THEN** the spell entry SHALL be `SPELL.<Key>` or `withSpellMods(SPELL.<Key>, { ... })` rather than an inline object literal with duplicate fields

#### Scenario: Character-side overrides are applied with withSpellMods
- **WHEN** a character file needs to add `alwaysPrepared`, `freeUses`, or `notes` to a spell from the SPELL map
- **THEN** the entry SHALL use `withSpellMods(SPELL.<Key>, { alwaysPrepared?, freeUses?, notes? })` and not re-specify definitional fields such as `level`, `castingTime`, `range`, or `duration`

### Requirement: Spells missing from the CSV are added before character migration
Any spell referenced by a character file that is not yet present in `spells-2024.csv` SHALL be added to the CSV and the generated file regenerated before the character file is migrated.

#### Scenario: Missing spell is added to CSV and regenerated
- **WHEN** a character references a spell not found in `SPELL`
- **THEN** a new row is added to `packages/dnd-character-sheet/src/lib/data/spells-2024.csv` and `yarn generate:spells` is run before the character file is updated
