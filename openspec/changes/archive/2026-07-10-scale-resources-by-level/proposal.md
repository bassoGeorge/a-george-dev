## Why

D&D 5.5 features scale with class level in ways the current `Feature.resource` model can't express: step-function counts (Battle Master superiority dice: 4 → 5 → 6 at Fighter 3/7/15) and die-size progressions (Bardic Inspiration: d6 → d8 → d10 → d12). Existing `class-level` count only supports linear scaling via a multiplier, and there is no concept of a die at all. Feature descriptions also can't reference these computed values today, which forces per-level hand-authored text like "you know 4 maneuvers".

## What Changes

- Extract resource computation out of `components/Resources/Resources.tsx` into a pure `lib/calculate-resources.ts` so it becomes a first-class pass in the `CharacterSheet` pipeline (same shape as `calculateStats`).
- Expose computed resources on `CharacterContext` so `Resources.tsx` becomes a pure renderer.
- Add explicit `id: string` field on `Feature.resource` for stable EJS lookup keys.
- Add `class-level-steps` variant to `ResourceCount` — highest step key ≤ current class level wins; below-lowest → warn + filter.
- Add optional `die` field on `Feature.resource` (fixed value or `class-level-steps` with string values like `d8`/`d10`).
- Render `die` as suffix on the resource name in the Resources panel: `Superiority Dice (d8)   ○○○○   [1/Short Rest…]`.
- Extend EJS locals in `text-enrichment.ts` with a `resources` object keyed by id, so descriptions can reference `<%= resources.superiorityDice.die %>` or `<%= resources.maneuvers.count %>`.

Non-goals: shared class-progression library (extract later if duplication warrants it), unlocking new features at levels (already handled by the per-level route pattern), and general description templating beyond referencing computed resource values.

## Capabilities

### New Capabilities
- `dnd-character-resources`: Computed-resource pipeline for the D&D character sheet — level-scaled counts (linear and step-function), die progressions, and rendering rules for the Resources panel.

### Modified Capabilities
- `ejs-derived-stats-context`: EJS render context gains a `resources` object keyed by resource id, in addition to the existing spread of `DerivedStats`.

## Impact

- **Code**: `packages/dnd-character-sheet/src/lib/models/feature.ts`, `lib/calculate-resources.ts` (new), `lib/text-enrichment.ts`, `components/CharacterSheet.tsx`, `components/Resources/Resources.tsx`, associated tests.
- **Data**: All existing `Feature.resource` entries must gain an `id: string` (breaking, but only one character has a resource today: the wizard's Sorcery Points).
- **Dependencies**: None added — uses existing EJS pipeline.
- **Consumers**: `apps/game-tools` character routes continue to work unchanged apart from the small data migration above.
