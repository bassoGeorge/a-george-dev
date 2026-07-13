## ADDED Requirements

### Requirement: VisualAdjustments includes speciesAndFeatsCombinedPanel
`FullVisualAdjustments` SHALL include a `speciesAndFeatsCombinedPanel: boolean` property. The default value SHALL be `false`. `VisualAdjustments` (the partial type) SHALL expose it as optional.

#### Scenario: Default value
- **WHEN** `StandardCharacterSheet` is rendered without `visualAdjustments` or with `visualAdjustments` that omits `speciesAndFeatsCombinedPanel`
- **THEN** `speciesAndFeatsCombinedPanel` resolves to `false`

#### Scenario: Explicit true
- **WHEN** `visualAdjustments={{ speciesAndFeatsCombinedPanel: true }}` is passed
- **THEN** `useVisualAdjustments()` returns `speciesAndFeatsCombinedPanel: true` in all descendant components
