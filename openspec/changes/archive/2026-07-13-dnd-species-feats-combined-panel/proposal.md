## Why

The D&D character sheet currently renders species traits and feats in two side-by-side panels, which can feel cramped when either section has many entries. For characters with dense traits or feats, a single combined `columns-2` panel gives more room to breathe and mirrors the layout of the class features panel above it.

## What Changes

- New `visualAdjustments` property: `speciesAndFeatsCombinedPanel: boolean` (default `false`)
- When enabled, the two-panel `grid-cols-2` layout is replaced with a single `Panel` titled "Species Traits & Feats"
- The combined panel uses a `columns-2` CSS layout (same as `ClassFeatures`)
- Content is a flat merged list of `speciesTraits` followed by `feats` — no sub-headings or visual separators between groups
- The existing `speciesAndFeatsFontSize` adjustment continues to apply to the combined panel
- Per-character opt-in via the existing `visualAdjustments` prop on `StandardCharacterSheet`

## Capabilities

### New Capabilities

- `species-feats-combined-panel`: A new visual adjustment mode that merges the species traits and feats panels into one full-width two-column panel

### Modified Capabilities

- `visual-adjustments`: Adding a new boolean property to the existing `VisualAdjustments` type

## Impact

- `packages/dnd-character-sheet/src/components/VisualAdjustmentsContext.ts` — add `speciesAndFeatsCombinedPanel` to type and defaults
- `packages/dnd-character-sheet/src/components/StandardCharacterSheet/StandardCharacterSheet.tsx` — conditional render of combined panel vs two-panel grid
- `packages/dnd-character-sheet/src/components/feature-blocks/` — new `SpeciesAndFeatsCombined` component (or inline within StandardCharacterSheet)
- `packages/dnd-character-sheet/src/index.ts` — no change needed (type re-exported via `VisualAdjustments`)
- Character data files in `apps/game-tools/src/data/dnd-characters/` — can opt in per character
