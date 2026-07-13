## Context

The `Spell` type at `packages/dnd-character-sheet/src/lib/models/spellcasting.ts` conflates definitional fields (name, level, school, range, duration, components, concentration, ritual) with character-side overlay fields (`freeUses`, `alwaysPrepared`, `notes`, `alternativeAbility`). Character files today hand-inline both sets, drifting the formatting of definitional fields (`"30ft"` vs the CSV's `"30 ft"`, `"1hr"` vs `"1 hour"`) and offering no compile-time protection against spell-name typos. A canonical CSV (`spells-2024.csv`, 391 rows) landed in the previous commit at `apps/game-tools/src/data/`. This design turns that CSV into the source of truth for definitional fields while preserving a lightweight overlay API for the four character-side fields.

## Goals / Non-Goals

**Goals:**
- Author characters as `spells: [SPELL.MistyStep, withSpellMods(SPELL.CharmPerson, { alwaysPrepared: true })]` with full autocomplete and typo-safety on spell names.
- Keep `Spell[]` as the array element type — rendering code does not need to branch on "definition vs overlay".
- Codegen output is committed, diffable, and drift-checked in CI.
- Escape hatch for homebrew / definitional overrides remains available (raw `Spell` literal or spread).

**Non-Goals:**
- Normalising CSV formatting (`"60 ft"`, `"1 hour"`) into a compact display form — that's a render-time concern, not a codegen concern.
- Rendering `url` on the sheet in this change (field is present on generated entries but unused).
- Modelling "material consumed" nuance from the CSV — the CSV only tracks whether the material component exists.
- Runtime CSV parsing, Vite CSV plugin, or `.d.ts`-only approaches — codegen produces a plain `.ts` file.
- Building a `SpellName` union or a `getSpell(name)` lookup API.

## Decisions

### 1. Codegen at build-time, committed output — chosen over runtime parse or Vite plugin
A single node script generates `spells-2024.generated.ts` next to the CSV. The output is committed so PR diffs reveal generation bugs, fresh clones don't need a `postinstall` step, and the pattern mirrors `routeTree.gen.ts` already used in the repo. Alternatives considered:
- **Vite CSV plugin** — adds a plugin dependency, loses cheap autocomplete unless a `.d.ts` is also emitted, and doesn't survive outside the app's build (the package would need its own tooling).
- **Runtime CSV parse** — requires a `getSpell(name)` string lookup, giving up compile-time typo detection — the main win we're after.

### 2. Flat `Spell[]` element type with `withSpellMods` overlay — chosen over splitting into `SpellDefinition` + `CharacterSpell`
The array element type stays `Spell`. `withSpellMods` merges character-side fields into a new `Spell` and returns it. Rendering is homogeneous; overlay is opt-in noise only where an override exists.
- **Alternative rejected:** `{ spell: SpellDefinition, overrides: {...} }` wrapper — every render site branches, every character redeclares wrappers even for the common bare case.

### 3. `withSpellMods` restricted to character-side fields — chosen over `Partial<Spell>`
Signature: `withSpellMods(spell: Spell, mods: Pick<Spell, 'freeUses' | 'alwaysPrepared' | 'notes' | 'alternativeAbility'>): Spell`. Restricting the type prevents silent rewrites of definitional fields (range, school). Escape hatch for the rare legitimate case: object spread (`{ ...SPELL.Fireball, range: '200ft' }`) or a raw literal.
- **Alternative rejected:** `Partial<Spell>` — makes the source-of-truth promise trivially breakable.

### 4. `SpellComponents.material` added; `materialConsumed` unchanged — chosen over renaming
CSV's `material` boolean means "spell has a material component". Existing `materialConsumed?` means "material is consumed on cast". Semantically distinct. Purely additive change: add `material?: boolean` on `SpellComponents`. Nothing needs to be renamed or migrated.
- **Alternative rejected:** rename `materialConsumed` → `material` — loses the consumed-material nuance for spells like Revivify.

### 5. PascalCase key normalisation with fail-loud collisions
CSV names are normalised to PascalCase object keys: strip apostrophes, replace non-alphanumeric runs with spaces, TitleCase, collapse whitespace. Examples: `Misty Step` → `MistyStep`, `Melf's Acid Arrow` → `MelfsAcidArrow`. Codegen fails if two spells normalise to the same key (spot-checked as zero collisions in the current CSV).
- **Alternative rejected:** `SPELL['Misty Step']` bracket access — clunkier authoring, still requires a string literal type union to type-check.

### 6. Fail-loud school validation; free-form `castingTime`
The `SpellSchool` union in `spellcasting.ts` stays the authoritative source. Codegen fails if a CSV row has a `school` value outside the union. `castingTime` remains `string` — values like `"1 minute or Ritual"` and `"1 action or 8 hours"` are legitimate, and typing them would fight the source of truth.

### 7. CSV moves to the package
The CSV moves from `apps/game-tools/src/data/spells-2024.csv` to `packages/dnd-character-sheet/src/lib/data/spells-2024.csv`. The type it maps to lives in the package; a future consumer (e.g. a design-docs Storybook character-sheet story) shouldn't reach into the app. Nothing imports the CSV yet, so this is a pure `git mv`.

### 8. `csv-parse` as a dev dependency
Well-known, small, correctly handles the edge cases (quoted commas, embedded quotes) that a hand-rolled parser might miss on future rows. Used only in the codegen script — no runtime bundle impact.

### 9. Manual `yarn generate:spells`, CI diff check enforcement
Author runs `yarn generate:spells` after editing the CSV. A `generate:spells:check` turbo task regenerates to a temp path and diffs, failing the PR if out of sync. No `prebuild` hook — CSV changes are rare, and always-regenerating fights the "committed, diffable" story.

## Risks / Trade-offs

- **[CSV data quality]** → codegen fails loudly on unknown school; author fixes CSV before regen. PR review notices spot-check regressions (formatting drift, dropped rows) via the diff of the generated file.
- **[Formatting drift on migrated characters]** → Talia's rendered sheet shows `"60 ft"` and `"1 hour"` instead of `"60ft"` / `"1hr"` after migration. Accepted trade-off; render-time normalisation can be added later without changing the data.
- **[Key collision from future CSV additions]** → codegen fails loudly. Author picks a disambiguating rename or annotates the normaliser. Preferable to silent overwrites.
- **[Regeneration forgotten]** → CI `generate:spells:check` catches it before merge. No pre-commit hook (bypassable, annoying).
- **[`csv-parse` version drift]** → dev-only dependency, pinned via lockfile. Low blast radius.

## Migration Plan

1. Add `material?: boolean` to `SpellComponents`. No consumer touches yet.
2. `git mv apps/game-tools/src/data/spells-2024.csv packages/dnd-character-sheet/src/lib/data/spells-2024.csv`.
3. Add `csv-parse` as a devDependency of `packages/dnd-character-sheet`.
4. Write `packages/dnd-character-sheet/scripts/generate-spells.ts` + `yarn generate:spells`.
5. Run it — commit the generated `spells-2024.generated.ts`.
6. Write `with-spell-mods.ts`, export both `SPELL` and `withSpellMods` from the package barrel.
7. Wire up the `generate:spells:check` turbo task; verify it fails when the CSV is edited without regen.
8. Migrate `talia-orien.ts` — smoke test: render Talia's sheet locally, confirm spells render correctly with new formatting.

No rollback complexity: revert the commit. The CSV move is a pure `git mv`; the type addition is purely additive.
