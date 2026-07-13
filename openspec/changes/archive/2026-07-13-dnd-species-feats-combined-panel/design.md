## Context

The D&D character sheet has an existing `visualAdjustments` system: a `VisualAdjustments` type (partial of `FullVisualAdjustments`) is passed as a prop to `StandardCharacterSheet`, merged with defaults, and provided via `VisualAdjustmentsContext` to descendant components via `useVisualAdjustments()`.

Currently `StandardCharacterSheet` renders species traits and feats as two separate `Panel` components in a `grid grid-cols-2 gap-4` div. `ClassFeatures` immediately above them uses a `columns-2` CSS columns layout inside a single full-width panel.

## Goals / Non-Goals

**Goals:**
- Add `speciesAndFeatsCombinedPanel: boolean` to `VisualAdjustments` (default `false`)
- When `true`, replace the two-panel grid with a single `Panel` using `columns-2` layout containing a flat merged list of `speciesTraits` + `feats`
- Preserve `speciesAndFeatsFontSize` behaviour in combined mode

**Non-Goals:**
- Sub-headings or visual dividers between species traits and feats within the combined panel
- Global (non-per-character) toggle
- Any changes to the `Feature` data model

## Decisions

**New component vs inline**: Introduce a `SpeciesAndFeatsCombined` component in `packages/dnd-character-sheet/src/components/feature-blocks/` rather than inlining the combined logic in `StandardCharacterSheet`. Rationale: consistent with how `SpeciesTraits`, `Feats`, and `ClassFeatures` are each their own component; keeps `StandardCharacterSheet` as a layout-only orchestrator.

**Merged list order**: `speciesTraits` items first, then `feats`. Rationale: mirrors the existing left-to-right order of the two panels.

**`columns-2` over CSS grid**: Use the same `columns-2` Tailwind utility that `ClassFeatures` uses, not a flex or grid layout. Rationale: CSS columns naturally balance content height across columns without requiring each item to know its neighbours; matches the established pattern.

**Conditional render location**: The `if (adjustments.speciesAndFeatsCombinedPanel)` branch lives in `StandardCharacterSheet`, not inside `SpeciesTraits` or `Feats`. Rationale: the decision is a layout-level choice, not a feature-block concern.

## Risks / Trade-offs

- `columns-2` can produce awkward column breaks mid-feature-entry for very long descriptions → acceptable, same trade-off accepted for `ClassFeatures`
- `speciesAndFeatsFontSize` must be wired into `SpeciesAndFeatsCombined` — easy to miss → covered by spec scenario
