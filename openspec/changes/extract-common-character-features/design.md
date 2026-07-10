## Context

Character data files live in `apps/game-tools/src/data/dnd-characters/<name>/<name>.ts` and each exports a character object whose `features`, `speciesTraits`, and `feats` arrays are typed as `Feature` (from `@ageorgedev/dnd-character-sheet`). Duplicate entries fall into three natural groupings:

1. **Feats** (fully identical): Alert, Tough, Savage Attacker, Skilled, Healer, Magic Initiate (Cleric), Two-Weapon Fighting.
2. **Class features** (identical when class+level match): Weapon Mastery, Second Wind, Tactical Mind, Action Surge, Combat Superiority, Expertise, Channel Divinity, plus specific Battle Master maneuvers (Commanding Presence, Bait and Switch, Trip Attack).
3. **Species traits** (identical for same species; parameterised for subrace): Fey Ancestry, Keen Senses, Trance, Darkvision.

`common/common-feats.ts` exists but is a TODO placeholder. There is no runtime cost concern — this is all static data bundled at build time.

## Goals / Non-Goals

**Goals:**
- Every duplicated `Feature` literal is defined exactly once and imported by consumers.
- Where a shared feature has a per-character parameter (uses/rest, list of chosen masteries, darkvision range), expose a factory function that takes the parameter and returns a `Feature`.
- Character files continue to read top-to-bottom as a description of that character; imports should read naturally at the call site (`ALERT`, `weaponMastery(['Vex', 'Sap'])`).
- Zero change to rendered output — the character sheet UI must display the same content before and after.

**Non-Goals:**
- Redesigning the `Feature` type or introducing a new abstraction layer (e.g., a class-features registry keyed by class+level). Deferred until we have more characters or a data-driven need.
- Extracting features that appear on only one character today. Only extract entries that are actually repeated or are trivially likely to repeat (e.g., a common feat).
- Touching spells, resources unrelated to shared features, or non-DnD data.

## Decisions

### 1. File organisation: three sibling files under `common/`

- `common/common-feats.ts` — feat constants and factories.
- `common/common-class-features.ts` — class feature constants and factories, grouped by class within the file via comment headers.
- `common/common-species-traits.ts` — species trait constants and factories, grouped by species.

Alternative considered: one big `common/index.ts`. Rejected because feats vs class features vs species traits have distinct semantics on the character sheet and separate files keep imports self-documenting.

### 2. Constants vs factories

- **Constant** (`export const ALERT: Feature = { ... }`) when the entry is 100% identical across every user.
- **Factory** (`export const weaponMastery = (masteries: string[]): Feature => ({ ... })`) when there is a small, well-defined parameter. Factories return a fresh object each call — no mutation of a shared reference.

Naming: `SCREAMING_SNAKE_CASE` for constants, `camelCase` for factories. This makes call sites read as "this is a shared constant" vs "this is a shared feature specialised for me".

### 3. Description text is the source of truth from a single character

For each extracted feature we pick the most complete existing description and use that verbatim as the extracted definition. If two characters had drifted (typos, minor wording), the extraction will silently unify them — this is desired, but must be noted in the tasks so the diff can be reviewed.

### 4. Barrel export

`common/index.ts` re-exports from the three files so character files can `import { ALERT, weaponMastery } from '../common'`. Keeps import lines short.

## Risks / Trade-offs

- **[Risk] Silent behaviour change if two "identical" descriptions actually differ.** → Mitigation: when extracting, diff the two source strings; if they differ, flag in the task list and confirm which wording is canonical before deleting the second.
- **[Risk] Factory signature is wrong for future characters** (e.g., a Cleric subclass changes Channel Divinity uses). → Mitigation: keep factory params minimal and only add parameters that vary today; new variations can extend the signature later.
- **[Trade-off] Character files become slightly less self-contained** — reading a character now requires jumping to `common/` to see the full text. Accepted because the sheet renders the full text anyway; the trade favours consistency over locality.

## Migration Plan

1. Land the `common/` files with the extracted definitions (no character file changes yet).
2. Migrate character files one at a time; after each, visually compare the rendered sheet in dev (`yarn turbo dev --filter=@ageorgedev/game-tools`).
3. Once all characters are migrated, remove any now-dead inline definitions.

No rollback plan needed beyond `git revert` — pure static-data refactor.
