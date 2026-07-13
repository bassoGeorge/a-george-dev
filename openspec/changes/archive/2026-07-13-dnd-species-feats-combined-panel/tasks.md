## 1. Extend VisualAdjustments Type

- [x] 1.1 Add `speciesAndFeatsCombinedPanel: boolean` to `FullVisualAdjustments` in `VisualAdjustmentsContext.ts`
- [x] 1.2 Add `speciesAndFeatsCombinedPanel: false` to `DEFAULT_VISUAL_ADUSTMENTS`

## 2. Create SpeciesAndFeatsCombined Component

- [x] 2.1 Create `packages/dnd-character-sheet/src/components/feature-blocks/SpeciesAndFeatsCombined.tsx` — reads `speciesTraits` and `feats` from character context, merges them, reads `speciesAndFeatsFontSize` from visual adjustments context, renders a `Panel` titled "Species Traits & Feats" with `columns-2` layout using `FeatureList`

## 3. Wire Up in StandardCharacterSheet

- [x] 3.1 Read `speciesAndFeatsCombinedPanel` from `useVisualAdjustments()` in `StandardCharacterSheet`
- [x] 3.2 Conditionally render `SpeciesAndFeatsCombined` when `true`, or the existing `grid grid-cols-2` two-panel layout when `false`

## 4. Verify

- [x] 4.1 Opt a character (e.g. the unnamed character) into `speciesAndFeatsCombinedPanel: true` in `apps/game-tools/src/data/dnd-characters/index.ts` and visually verify the sheet looks correct
- [x] 4.2 Confirm the default two-panel layout on other characters is unchanged
