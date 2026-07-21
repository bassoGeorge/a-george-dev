## Purpose

`packages/dnd-character-sheet/src/icons/` provides per-class icon components and color tokens for D&D character classes, plus the shared rule for resolving a multiclass character's primary class, so consumers (e.g. the character roster) can render class-specific visuals consistently.

## Requirements

### Requirement: Every character class has an icon component
`packages/dnd-character-sheet/src/icons/` SHALL export one React icon component per `CharacterClass` value, and a `CLASS_ICONS: Record<CharacterClass, ClassIconComponent>` map giving lookup access to all of them by class name. Each icon component SHALL accept a `className` prop, render an inline `<svg>` with `fill="currentColor"` on its paths (so color is controlled by the consumer), and set `aria-hidden="true"` (the icon is decorative).

#### Scenario: Every class resolves to a component
- **WHEN** `CLASS_ICONS[CharacterClass.Wizard]` is accessed
- **THEN** it resolves to a component that renders an `<svg>` element

#### Scenario: Icon color follows consumer styling
- **WHEN** a `CLASS_ICONS` component is rendered with `className="text-destructive-foreground"`
- **THEN** the rendered SVG's paths use `fill="currentColor"` so they render in that color

#### Scenario: Icon is hidden from assistive technology
- **WHEN** any `CLASS_ICONS` component is rendered
- **THEN** the root `<svg>` has `aria-hidden="true"`

### Requirement: Every character class has a color mapping
`packages/dnd-character-sheet/src/icons/` SHALL export `DndClassColors: Record<CharacterClass, ColorWaySections>`, mapping each class to one of the design-system's `ColorCombinations` color-way sections (`text`, `surface`, `onSurfaceText`, `bgAsText` — no bespoke hex values). Classes MAY share a color way where the palette does not provide a unique hue per class.

#### Scenario: Every class resolves to a color way
- **WHEN** `DndClassColors[CharacterClass.Barbarian]` is accessed
- **THEN** it resolves to an object with non-empty `text`, `surface`, `onSurfaceText`, and `bgAsText` string properties naming existing design-system utility classes

### Requirement: Primary class resolves to the highest-level class
Given a character's `classes` array (each entry with a `name` and `level`), the primary class SHALL be the entry with the highest `level`. If multiple entries share the highest level, the first-declared entry (by array order) SHALL be chosen.

#### Scenario: Single-class character
- **WHEN** a character has one class, e.g. Bard at level 3
- **THEN** the primary class resolves to Bard

#### Scenario: Multiclass with differing levels
- **WHEN** a character has Monk at level 2 (declared first) and Fighter at level 3 (declared second)
- **THEN** the primary class resolves to Fighter

#### Scenario: Multiclass with tied levels
- **WHEN** a character has Fighter at level 3 (declared first) and Rogue at level 3 (declared second)
- **THEN** the primary class resolves to Fighter
