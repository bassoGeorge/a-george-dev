## 1. Type + File Moves

- [ ] 1.1 Add optional `material?: boolean` to `SpellComponents` in `packages/dnd-character-sheet/src/lib/models/spellcasting.ts`
- [ ] 1.2 `git mv apps/game-tools/src/data/spells-2024.csv packages/dnd-character-sheet/src/lib/data/spells-2024.csv` (create the `data/` folder if it doesn't exist)
- [ ] 1.3 Add `csv-parse` as a devDependency of `packages/dnd-character-sheet` and refresh the lockfile

## 2. Codegen Script

- [ ] 2.1 Create `packages/dnd-character-sheet/scripts/generate-spells.ts` — reads the CSV via `csv-parse`, validates each row's `school` against the `SpellSchool` union, normalises the name to a PascalCase key (strip apostrophes, replace non-alphanumeric runs with spaces, TitleCase, collapse whitespace), and fails loudly on unknown schools or key collisions
- [ ] 2.2 Ensure the script emits entries that satisfy `Spell`, include `url`, drop `source`, and set `components.material` (plus `verbal`/`somatic`) from the CSV booleans
- [ ] 2.3 Add a `generate:spells` script to `packages/dnd-character-sheet/package.json` that runs the codegen (via `tsx` or the workspace-standard TS runner)
- [ ] 2.4 Run `yarn generate:spells` and commit the produced `packages/dnd-character-sheet/src/lib/data/spells-2024.generated.ts`

## 3. Overlay Helper

- [ ] 3.1 Create `packages/dnd-character-sheet/src/lib/data/with-spell-mods.ts` exporting `withSpellMods(spell, mods)` with `mods` typed as `Pick<Spell, 'freeUses' | 'alwaysPrepared' | 'notes' | 'alternativeAbility'>`
- [ ] 3.2 Re-export `SPELL` and `withSpellMods` from the package barrel (`packages/dnd-character-sheet/src/index.ts`)

## 4. CI Drift Check

- [ ] 4.1 Add a `generate:spells:check` script to `packages/dnd-character-sheet/package.json` that regenerates to a temp path and diffs against the committed file, exiting non-zero on drift
- [ ] 4.2 Register `generate:spells:check` as a turbo task in `turbo.json` and hook it into the affected CI workflow so PRs touching the CSV must include the regenerated file
- [ ] 4.3 Sanity-check: modify the CSV locally without regenerating, confirm `yarn turbo generate:spells:check --filter=@ageorgedev/dnd-character-sheet` fails; revert

## 5. Migrate Talia

- [ ] 5.1 Update `apps/game-tools/src/data/dnd-characters/talia-orien/talia-orien.ts` to import `SPELL` and `withSpellMods` from `@ageorgedev/dnd-character-sheet`
- [ ] 5.2 Replace each of Talia's 12 inlined spells with `SPELL.*` (bare) or `withSpellMods(SPELL.*, {...})` for the seven `alwaysPrepared` entries, preserving existing `notes` on Guidance / Word of Radiance / Toll the Dead
- [ ] 5.3 Start the game-tools dev server (`yarn turbo dev --filter=@ageorgedev/game-tools`), open Talia's sheet, confirm all spells render with CSV-sourced formatting and no visual regressions beyond the accepted `"60 ft"` / `"1 hour"` shift

## 6. Verify

- [ ] 6.1 `yarn format-and-lint:fix` clean
- [ ] 6.2 `yarn test` passes across the affected packages
- [ ] 6.3 `yarn turbo build --filter=@ageorgedev/game-tools` succeeds
- [ ] 6.4 `openspec validate spell-csv-codegen --strict` passes
