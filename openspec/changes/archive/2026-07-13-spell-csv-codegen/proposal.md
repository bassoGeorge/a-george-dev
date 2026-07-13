## Why

Building out characters means hand-typing spell definitions inline in each character file, which is repetitive, error-prone (drifting formatting for `range`/`duration`), and offers no autocomplete or safety against typos in spell names. A canonical CSV of all 2024 spells now exists in the repo — making it the source of truth for spell definitions lets characters reference spells by a typed constant (`SPELL.MistyStep`) while retaining a lightweight overlay for character-specific fields (`freeUses`, `alwaysPrepared`, `notes`, `alternativeAbility`).

## What Changes

- **Move CSV into the package.** Relocate `apps/game-tools/src/data/spells-2024.csv` → `packages/dnd-character-sheet/src/lib/data/spells-2024.csv`. Nothing imports it yet, so no consumer updates required.
- **Add codegen script.** `packages/dnd-character-sheet/scripts/generate-spells.ts` reads the CSV via `csv-parse` and emits `packages/dnd-character-sheet/src/lib/data/spells-2024.generated.ts` exporting `SPELL` as a PascalCase-keyed `as const` map of `Spell` values. Committed. Invoked via `yarn generate:spells`.
- **CI drift check.** A `generate:spells:check` task regenerates to a temp path and diffs, failing PRs where the CSV changed without the generated file being regenerated.
- **Extend `SpellComponents`** with an optional `material?: boolean` field, matching the CSV's semantics ("has a material component"). Existing `materialConsumed?: boolean` is untouched.
- **Introduce `withSpellMods` helper** at `packages/dnd-character-sheet/src/lib/data/with-spell-mods.ts`, restricted to character-side fields (`freeUses`, `alwaysPrepared`, `notes`, `alternativeAbility`). Exported from the package barrel.
- **Codegen behaviour.** PascalCase key normalisation strips punctuation and TitleCases; collisions fail loudly. Unknown `school` values fail loudly. `url` from CSV is included on generated entries (not rendered yet). `source` is dropped. `castingTime` remains free `string`.
- **Homebrew / off-list escape hatch.** Characters can still put raw `Spell` literals or spread expressions (`{ ...SPELL.Fireball, range: '200ft' }`) into the `spells` array — no API change to `Spellcasting.spells`.
- **Migrate Talia** in the same change: convert her inline entries to `SPELL.*` + `withSpellMods`, preserving existing `notes`. Formatting drifts to CSV's conventions ("60 ft", "1 hour") — accepted.

## Capabilities

### New Capabilities
- `dnd-spell-data`: canonical spell dataset generated from CSV, plus the character-side override helper.

### Modified Capabilities
<!-- No existing spec-level requirement covers the `Spell`/`SpellComponents` shape; the `material` field addition is captured under the new `dnd-spell-data` capability. -->


## Impact

- **Packages:** `packages/dnd-character-sheet` — new script, generated file, helper, new dependency on `csv-parse` (dev), extended `SpellComponents` type. Adds a `generate:spells` script and a `generate:spells:check` turbo task.
- **Apps:** `apps/game-tools/src/data/dnd-characters/talia-orien/talia-orien.ts` migrated; CSV path referenced nowhere else in the app after the move.
- **CI:** new `generate:spells:check` step in the affected turbo pipeline.
- **No runtime dependencies added** (csv-parse is dev-only, used by the codegen script).
