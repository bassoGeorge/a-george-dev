## Why

All characters currently hand-write their spell objects as raw literals, duplicating data already captured in `spells-2024.generated.ts` (spell level, school, casting time, range, duration, components, URL). The `dnd-spell-data` spec introduced `SPELL` and `withSpellMods` precisely to eliminate this duplication; only `talia-orien.ts` has been migrated so far.

## What Changes

- Replace hand-written spell object literals in each character file with `SPELL.<Key>` references from the generated spell map
- Wrap spells that need character-side overrides (`alwaysPrepared`, `freeUses`, `notes`) with `withSpellMods(SPELL.<Key>, { ... })`
- Add missing `SPELL` and `withSpellMods` imports to each character file
- Remove redundant fields (castingTime, range, duration, concentration, etc.) that are now sourced from the generated data
- Where a spell name in a character file does not yet exist in the SPELL map, add the spell to `spells-2024.csv` and regenerate before migrating

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- None (this is a pure refactor; no spec-level behavior changes)

## Impact

- **Character files**: `claw.ts`, `elnorin-lunarrest.ts`, `omarin-kenate.ts`, `saora-embervale.ts`, `zoynari-2.ts`, `zoynari-3.ts` in `apps/game-tools/src/data/dnd-characters/`
- **`gonvar-feathertide.ts`**: No spellcasting — no changes required
- **`spells-2024.csv`**: May need new rows for spells not yet in the CSV (e.g. Sorcerous Burst, Color Spray, Dissonant Whispers, Enlarge/Reduce, Witch Bolt, Mage Armour)
- **`spells-2024.generated.ts`**: Regenerated after any CSV additions
- **No API or type changes**: `SPELL` and `withSpellMods` are already exported; character files are data-only
