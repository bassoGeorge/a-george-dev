## Context

The `dnd-character-sheet` package models class features as a flat `Feature[]` with an optional `resource` sub-shape. `ResourceCount` today supports `fixed`, `character-level`, `class-level` (with linear `multiplier`), and `ability` variants. Computation lives inside `components/Resources/Resources.tsx` (see `pullAllResourcesFromFeatures` and `resourceDigester`) and produces display-flavored strings for the Resources panel only.

Feature descriptions are rendered via EJS (`lib/text-enrichment.ts`), with `DerivedStats` spread as locals. Descriptions can already reference proficiency bonus, ability modifiers, etc., but have no way to reference resource-derived values because resources aren't computed at that stage.

Two shapes of level-scaling appear in 5.5 that we can't currently express:
- Step-function counts (Battle Master superiority dice count 4/5/6 at Fighter 3/7/15).
- Die progressions (Bardic Inspiration d6 → d8 → d10 → d12).

The change is phased to reduce blast radius: refactor the compute pipeline with zero behavior change first, then extend the model.

## Goals / Non-Goals

**Goals:**
- Single source of truth for computed resources — Resources panel and EJS descriptions see the same values.
- Level-scaled counts (step function) and die progressions expressible inline on the feature.
- Feature descriptions can reference computed resource values by a stable id.
- Zero behavior change from the Phase 1 refactor alone.

**Non-Goals:**
- Shared class-progression tables library (defer until duplication justifies it).
- Adding whole new features that appear at a given level (already handled by the per-level route pattern `$slug.{-$level}.tsx`).
- A general string-templating dialect beyond referencing computed resources via existing EJS locals.

## Decisions

### Inline lookup tables, not a shared library
Level tables live on the individual `Feature.resource`, next to `count` and `refresh`.
- **Why**: keeps character data files self-describing, matches the existing pattern (multipliers live on the feature), and there's ~1 character per class today.
- **Alternative considered**: a `packages/dnd-character-sheet/src/lib/class-tables/` module exporting per-class progression tables. Rejected as speculative; extracting later is mechanical.

### Explicit `resource.id` as EJS lookup key
Every `Feature.resource` gains a required `id: string`. The EJS locals expose `resources` keyed by `id`.
- **Why**: grep-friendly, survives display-name renames, and gives us a stable contract before we add shared tables later.
- **Alternative considered**: slug from `resource.name`. Rejected — renaming display silently breaks descriptions.

### `ComputedResource` shape splits raw values from display strings
```ts
type ComputedResource = {
  id: string;
  name: string;
  count: number;
  die?: string;
  display: 'dots' | 'numeric';
  refresh: Refresh; // raw descriptor
};
```
- **Why**: EJS wants primitives (`resources.superiorityDice.die === 'd8'`), the panel wants formatted strings. Compute once, format at render.
- **Alternative considered**: keep display strings on the computed value (e.g., pre-format `refresh` as `[1/Short Rest, all on Long Rest]`). Rejected because it leaks into EJS context in a way authors can't easily reason about.

### Step lookup rule: highest key ≤ current level wins; below-lowest warns and filters
- **Why**: matches how 5.5 progression tables read; unresolvable means the character shouldn't have the feature yet, which is a data error — same treatment as the existing class-not-found branch at `Resources.tsx:95`.
- **Alternative considered**: return 0 or hide silently. Rejected because a listed feature with count 0 or a silently-missing resource is confusing.

### Die renders as name suffix in the Resources panel
Panel layout becomes `Superiority Dice (d8)   ○○○○   [1/Short Rest…]`.
- **Why**: the count/checkmarks column stays visually consistent with die-less resources; the die is an attribute of *what the resource is*, not part of the count.
- **Alternative considered**: prefix the count (`4d8`). Rejected because it breaks the dots-display path and the "over max" numeric display (`__ / 4`).

### Resource compute pass sits between `calculateStats` and `enrichCharacterData`
```
data ─► calculateStats ─► stats
  │                        │
  └─► computeResources ◄──┘   (new pass)
             │
             ▼
       resources[] and lookup
             │
data + stats + resources ─► enrichCharacterData (EJS) ─► character
```
- **Why**: resources depend on `stats` (for `ability`-kind counts) and enrichment depends on resources (for description templates). This ordering falls out naturally.

### `enrichCharacterData` signature widens
`enrichCharacterData(character, stats)` → `enrichCharacterData(character, stats, resources)`. Only caller is `CharacterSheet.tsx`.
- **Why**: EJS locals need the resource lookup. No consumers outside the package.

## Risks / Trade-offs

- **Breaking data change (`resource.id`)** → Mitigation: only one existing character (`example-wizard.data.ts`) currently declares a resource. Update it in the same commit. TypeScript will flag any others at compile time.
- **Two-phase change increases churn** → Mitigation: Phase 1 is pure motion (no signature change beyond what components need), which keeps its diff readable; Phase 2 is where the interesting logic lives.
- **`Object.keys(steps)` ordering trap** → Mitigation: iterate step keys as `Number(k)` and sort explicitly in `resolveSteps`. Cover with a unit test that has out-of-order keys.
- **Author confusion between `resource.id` and `resource.name`** → Mitigation: id is required and lint/type-checked; name remains free display text. Example character exercises both, so the difference is obvious in code.
- **EJS `resources` shadowing accidentally** → Mitigation: only one owner of the EJS locals (`enrichCharacterData`); the current spread doesn't include a `resources` key, verified before merge.

## Migration Plan

1. Land Phase 1 (refactor + tests) as a self-contained commit. Verify by running the package tests and viewing the wizard character in `apps/game-tools`.
2. Land Phase 2 (model + step lookup + die + EJS locals + example character exercising both) as a second commit.
3. Update the wizard character to add `id: 'sorceryPoints'` to its existing resource in the same commit that adds the `id` field to the model.
4. Rollback: revert either commit independently — Phase 1 leaves everything working; Phase 2 is additive to the model with the exception of `id`, which is easy to revert alongside.

## Open Questions

None — grill session resolved the major branches. If a shared class-tables library becomes attractive after we author two or three step-heavy characters, that would be a follow-up change.
