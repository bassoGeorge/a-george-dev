## Purpose

A mobile-safe, read-only companion presentation of the DnD character sheet below the custom 600px `tablet` breakpoint — vertical flow, section-local table scrolling, and no page-level horizontal overflow at the supported 390px portrait viewport — while the desktop and printed sheets are preserved unchanged from 600px upward.

## Requirements

### Requirement: Character sheets provide a mobile-safe read-only layout
At screen widths below 600 CSS pixels, the character sheet SHALL present all existing sheet content as a read-only companion without page-level horizontal overflow at the supported 390 CSS pixel portrait viewport. Text and non-tabular panels SHALL wrap or grow vertically rather than clip essential content.

#### Scenario: Character sheet renders at the supported phone width
- **WHEN** a user views an individual character sheet at 390 CSS pixels wide
- **THEN** all sheet sections remain reachable without horizontal scrolling of the page
- **THEN** text and non-tabular panel content are not clipped by mobile-only fixed heights

#### Scenario: Viewport is narrower than the supported target
- **WHEN** a user views a character sheet below 390 CSS pixels wide
- **THEN** the layout degrades on a best-effort basis without a guaranteed visual acceptance target

### Requirement: Mobile layout preserves sheet pages and content order
The mobile layout SHALL retain the two existing sheet page containers, allow each page to grow vertically, and present content in its existing DOM order. It SHALL NOT introduce mobile-only reordering, collapsing, tabs, section navigation, or a separate summary sheet.

#### Scenario: Both sheet pages render on mobile
- **WHEN** a user views a complete character sheet below 600 CSS pixels wide
- **THEN** Page 1 is followed by Page 2 in the existing order
- **THEN** each page grows to contain its vertically flowing content

#### Scenario: Optional panels are hidden
- **WHEN** user preferences hide actions-in-combat, weapon masteries, or notes
- **THEN** the mobile layout closes the vacated space without leaving a fixed empty grid area

### Requirement: Sheet sections use the agreed mobile flow
Below 600 CSS pixels, sheet sections SHALL use simple responsive flow rules: the sheet header SHALL stack name/details, level and armour, then health/death saves; abilities and proficiencies SHALL use a single-column stream; combat statistics SHALL use a two-by-two grid; resources, features, feats, grouped spells, and page-two content SHALL use single-column flow; and the spellcasting summary SHALL stack spell ability before spell slots.

#### Scenario: Primary sheet sections render at phone width
- **WHEN** a character sheet is displayed at 390 CSS pixels wide
- **THEN** the sheet header, abilities, proficiencies, combat statistics, resources, features, feats, spellcasting summary, and page-two sections follow the specified mobile flow

#### Scenario: Grouped spell preference is active
- **WHEN** grouped spell presentation is selected below 600 CSS pixels wide
- **THEN** grouped spells render in one column without clipping spell content

### Requirement: Wide semantic tables scroll within their sections
Attack tables and table-mode spell lists SHALL preserve all existing fields and MAY scroll horizontally within a section-local container below 600 CSS pixels. Their overflow SHALL NOT cause the character-sheet page itself to scroll horizontally.

#### Scenario: Attack table exceeds the available width
- **WHEN** an attack table cannot fit within a 390 CSS pixel viewport
- **THEN** the attack section can be scrolled horizontally to reach every column
- **THEN** the surrounding page does not overflow horizontally

#### Scenario: Table-mode spell list exceeds the available width
- **WHEN** a table-mode spell list cannot fit within a 390 CSS pixel viewport
- **THEN** the spell-list section can be scrolled horizontally to reach every column
- **THEN** the surrounding page does not overflow horizontally

### Requirement: Responsive changes preserve desktop and print presentation
At screen widths of 600 CSS pixels and above, character-sheet layout and styling SHALL remain pixel-identical to the pre-change desktop presentation. Desktop print output SHALL retain the existing fixed two-page composition. Printing initiated from a mobile browser is not supported.

#### Scenario: Viewport reaches the tablet breakpoint
- **WHEN** a character sheet is displayed at 600 CSS pixels wide or wider
- **THEN** mobile stacking and mobile overflow overrides no longer alter the existing desktop layout

#### Scenario: Character sheet is printed from the supported desktop experience
- **WHEN** a user prints an individual character sheet from a desktop viewport
- **THEN** the existing two-page print composition is preserved without mobile layout overrides

### Requirement: Responsive styling follows the foundation theme
Responsive sheet styling SHALL use the custom Tailwind configuration imported by `packages/foundation-styles/src/theme.css`, including the custom 600px `tablet` breakpoint and exponential spacing tokens. It SHALL use theme-aware color tokens and SHALL NOT rely on standard `sm` or `md` breakpoints or introduce `dark:` color variants.

#### Scenario: Responsive utilities are inspected
- **WHEN** a developer reviews mobile character-sheet styles
- **THEN** below-600px behaviour is expressed relative to the custom `tablet` breakpoint
- **THEN** spacing and colors use the foundation theme conventions

### Requirement: Mobile compatibility covers current major phone browsers
The mobile layout SHALL support current Safari on iOS and current Chrome on Android at the 390 CSS pixel portrait target. It SHALL remain functional in landscape through natural responsive flow without a separate landscape design.

#### Scenario: Supported mobile browser renders the sheet
- **WHEN** a user opens a character sheet in current iOS Safari or Android Chrome at the supported width
- **THEN** the responsive sheet content remains readable and reachable

#### Scenario: Phone rotates to landscape
- **WHEN** a user rotates a supported phone to landscape
- **THEN** the sheet remains functional using the same responsive flow
