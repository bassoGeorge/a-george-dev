## Context

Six of the seven non-reference character files in `apps/game-tools/src/data/dnd-characters/` hand-write spell objects as inline literals, duplicating data (castingTime, range, duration, concentration, level, school, etc.) that already lives in `spells-2024.generated.ts`. The `dnd-spell-data` spec introduced `SPELL` and `withSpellMods` to eliminate this duplication. `talia-orien.ts` is already fully migrated and is the reference.

Characters with spellcasting to migrate: `claw`, `elnorin-lunarrest`, `omarin-kenate`, `saora-embervale`, `zoynari-2`, `zoynari-3`. `gonvar-feathertide` has no spellcasting.

## Goals / Non-Goals

**Goals:**
- Replace all inline spell literals with `SPELL.<Key>` references in every affected character file
- Use `withSpellMods(SPELL.<Key>, { ... })` only for character-side fields (`alwaysPrepared`, `freeUses`, `notes`)
- Add any missing spells to the CSV and regenerate before migrating the relevant character
- Keep CI green (generate:spells:check passes)

**Non-Goals:**
- Changing any spell data, stats, or character feature descriptions
- Migrating `gonvar-feathertide.ts` (no spellcasting)
- Changing how spell data is displayed or rendered

## Decisions

### Migration pattern: per-character, CSV-first

Each character file is migrated independently. Before editing a character file, identify any spells it uses that are missing from `SPELL`. Add those to the CSV and regenerate first. This keeps the generated file consistent throughout the migration.

**Alternative considered**: batch all missing spells first across all characters, then migrate. Rejected because the per-character approach is safer and allows verification at each step.

### Identifying SPELL keys

Spell names are PascalCase: strip apostrophes, replace non-alphanumeric runs with a space, TitleCase, collapse whitespace. Examples:
- `Mage Hand` → `MageHand`
- `Enlarge / Reduce` → `EnlargeReduce`
- `Shield of Faith` → `ShieldOfFaith`
- `Melf's Acid Arrow` → `MelfsAcidArrow`

### Handling `withMaterial`

`talia-orien.ts` uses `withMaterial(SPELL.X)`. This is a separate helper (not covered by the `dnd-spell-data` spec) that annotates material components. Keep any existing `withMaterial` usages that appear in migrated files.

### zoynari-3 extends zoynari-2

`zoynari-3.ts` spreads `Zoynari2Data.spellcasting.spells`. After zoynari-2 is migrated, zoynari-3's spell entries will naturally reference `SPELL` objects already. The spread pattern remains valid.

## Risks / Trade-offs

- **SPELL key doesn't exist yet** → check CSV before migrating each character; add missing rows. Risk of typo in CSV → run `yarn generate:spells` and check for errors.
- **Spell data differs from hand-written** → the hand-written values may have been customised (e.g. shortened notes). These should be preserved via `withSpellMods({ notes: '...' })` where relevant, not silently dropped.
- **zoynari-3 type cast** → currently uses `as NonNullable<Character['spellcasting']>`. After migration this cast may still be needed; leave it in place.

## Migration Plan

1. Read `spells-2024.csv` to identify which spells already exist in `SPELL`
2. For each character file (ordered: `claw` → `elnorin` → `omarin` → `saora` → `zoynari-2` → `zoynari-3`):
   a. Identify spells not yet in the CSV
   b. Add missing rows to `spells-2024.csv`, run `yarn turbo generate:spells --filter=@ageorgedev/dnd-character-sheet`
   c. Replace inline spell objects with `SPELL.<Key>` / `withSpellMods(SPELL.<Key>, { ... })`
   d. Run `yarn turbo build --filter=@ageorgedev/game-tools` to verify type-check
3. Run `yarn turbo generate:spells:check --filter=@ageorgedev/dnd-character-sheet` to confirm CSV and generated file are in sync

## Open Questions

- None — scope and approach are well-defined by existing reference implementation and spec.
