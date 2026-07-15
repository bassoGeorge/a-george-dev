# dnd-spell-data

## Purpose

A single CSV source of truth for 5e spell data, codegen'd into a typed `SPELL` map with CI drift checks and a `withSpellMods` overlay for character-side overrides.

## Requirements

### Requirement: Canonical spells CSV lives in the character-sheet package
The 2024 spells CSV SHALL reside at `packages/dnd-character-sheet/src/lib/data/spells-2024.csv` as the single source of truth for spell definitions.

#### Scenario: CSV is located inside the package
- **WHEN** `packages/dnd-character-sheet/src/lib/data/spells-2024.csv` is read
- **THEN** it exists and contains the CSV header row `name,url,level,school,castingTime,range,duration,verbal,somatic,material,concentration,ritual,source`

#### Scenario: CSV is no longer under the game-tools app
- **WHEN** the repository is searched for `apps/game-tools/src/data/spells-2024.csv`
- **THEN** the file does not exist

### Requirement: Generated SPELL map is produced from the CSV
The package SHALL provide a codegen script that reads the CSV and writes a committed TypeScript file exporting a `SPELL` object literal keyed by PascalCase spell name, whose values satisfy the `Spell` type from `spellcasting.ts`.

#### Scenario: Running the codegen script produces the generated file
- **WHEN** `yarn generate:spells` is run inside `packages/dnd-character-sheet`
- **THEN** `packages/dnd-character-sheet/src/lib/data/spells-2024.generated.ts` is written and exports `SPELL` as an `as const` object

#### Scenario: Every CSV row appears in SPELL under a PascalCase key
- **WHEN** the generated file is imported
- **THEN** for every row in the CSV there is a corresponding key in `SPELL` obtained by stripping apostrophes, replacing non-alphanumeric runs with spaces, TitleCasing, and collapsing whitespace (e.g. `Misty Step` → `MistyStep`, `Melf's Acid Arrow` → `MelfsAcidArrow`)

#### Scenario: Generated entries include url and definitional fields
- **WHEN** `SPELL.MistyStep` is read at compile time
- **THEN** it satisfies the `Spell` type and includes the `url` field from the CSV row and does NOT include the CSV's `source` field

#### Scenario: Generated entries encode components correctly
- **WHEN** a CSV row has `verbal=true`, `somatic=true`, `material=false`
- **THEN** the generated `SPELL.<Key>.components` object has `verbal: true`, `somatic: true`, and omits or sets `material: false` accordingly

### Requirement: Codegen fails loudly on invalid data
The codegen script SHALL exit non-zero when it detects a `school` value outside the `SpellSchool` union or a key collision between two spells that normalise to the same PascalCase key.

#### Scenario: Unknown school value aborts codegen
- **WHEN** the CSV contains a row whose `school` column is not one of `Abjuration`, `Conjuration`, `Divination`, `Enchantment`, `Evocation`, `Illusion`, `Necromancy`, or `Transmutation`
- **THEN** running `yarn generate:spells` prints an error identifying the offending row and exits with a non-zero status

#### Scenario: Duplicate normalised key aborts codegen
- **WHEN** two CSV rows normalise to the same PascalCase key
- **THEN** running `yarn generate:spells` prints an error naming both rows and the conflicting key, and exits with a non-zero status

### Requirement: CI enforces generated file is in sync with CSV
The monorepo CI SHALL run a `generate:spells:check` task that fails when the CSV has been changed without a matching regeneration of `spells-2024.generated.ts`.

#### Scenario: Drift between CSV and generated file fails the check
- **WHEN** the CSV is modified but the generated file is not regenerated, and `yarn turbo generate:spells:check --filter=@ageorgedev/dnd-character-sheet` is run
- **THEN** the task exits non-zero and reports the diff between the committed generated file and a fresh regeneration

#### Scenario: In-sync CSV and generated file pass the check
- **WHEN** `yarn generate:spells` has just been run and both files are committed
- **THEN** `yarn turbo generate:spells:check --filter=@ageorgedev/dnd-character-sheet` exits zero

### Requirement: `withSpellMods` overlay helper is restricted to character-side fields
The package SHALL export `withSpellMods(spell, mods)` from its barrel, where `mods` is typed to accept only `freeUses`, `alwaysPrepared`, `notes`, and `alternativeAbility`. The return value SHALL be a `Spell` with those fields merged over the input.

#### Scenario: Overriding a character-side field type-checks and merges
- **WHEN** a character declares `withSpellMods(SPELL.MistyStep, { alwaysPrepared: true, freeUses: 1 })`
- **THEN** the resulting `Spell` object equals `SPELL.MistyStep` with `alwaysPrepared: true` and `freeUses: 1` merged in

#### Scenario: Attempting to override a definitional field is a type error
- **WHEN** a character writes `withSpellMods(SPELL.MistyStep, { range: '200ft' })`
- **THEN** TypeScript reports a compilation error because `range` is not part of the accepted `mods` shape

#### Scenario: Character files can still use raw literals or spreads as escape hatches
- **WHEN** a `spells: Spell[]` array contains `{ name: 'Homebrew Spell', level: 3, school: 'Evocation' }` or `{ ...SPELL.Fireball, range: '200ft' }`
- **THEN** the array type-checks because the element type is `Spell`

### Requirement: SpellComponents supports the CSV's material flag
The `SpellComponents` interface SHALL include an optional `material?: boolean` field whose semantics are "the spell has a material component" (matching the CSV column). The existing optional `materialConsumed?: boolean` field SHALL remain unchanged and continue to mean "the material component is consumed on cast".

#### Scenario: Generated components use the new field
- **WHEN** a CSV row has `material=true`
- **THEN** the generated `SPELL.<Key>.components.material` is `true`

#### Scenario: materialConsumed is not populated by codegen
- **WHEN** the generated file is inspected
- **THEN** no generated entry sets `materialConsumed` (it remains a character-side / hand-annotated concern)
