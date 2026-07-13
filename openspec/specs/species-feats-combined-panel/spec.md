### Requirement: SpeciesAndFeatsCombined renders a single panel with columns-2 layout
The `SpeciesAndFeatsCombined` component SHALL render a single `Panel` with title "Species Traits & Feats" and a `columns-2` CSS columns layout. It SHALL read `character.speciesTraits` and `character.feats` from context, merge them in that order, and pass the combined array to `FeatureList`.

#### Scenario: Both sections present
- **WHEN** a character has both `speciesTraits` and `feats`
- **THEN** a single panel titled "Species Traits & Feats" renders all traits followed by all feats in a `columns-2` layout with no visual separator between the groups

#### Scenario: Only speciesTraits present
- **WHEN** a character has `speciesTraits` but no `feats`
- **THEN** the panel renders only the species traits with no empty placeholder for feats

#### Scenario: Only feats present
- **WHEN** a character has `feats` but no `speciesTraits`
- **THEN** the panel renders only the feats with no empty placeholder for species traits

#### Scenario: Font size adjustment applied
- **WHEN** `speciesAndFeatsFontSize` is `'small'`
- **THEN** `FeatureList` receives `smallFont={true}` in combined mode, matching the behaviour of the two-panel layout

### Requirement: StandardCharacterSheet switches layout based on speciesAndFeatsCombinedPanel
`StandardCharacterSheet` SHALL conditionally render either the `grid grid-cols-2` two-panel layout (default) or `SpeciesAndFeatsCombined` based on the `speciesAndFeatsCombinedPanel` visual adjustment.

#### Scenario: Adjustment not set
- **WHEN** `speciesAndFeatsCombinedPanel` is `false` or not provided
- **THEN** the existing two-panel `grid-cols-2` layout with `SpeciesTraits` and `Feats` is rendered

#### Scenario: Adjustment enabled
- **WHEN** `speciesAndFeatsCombinedPanel` is `true`
- **THEN** `SpeciesAndFeatsCombined` replaces the two-panel grid, occupying the same full-width position in the sheet
