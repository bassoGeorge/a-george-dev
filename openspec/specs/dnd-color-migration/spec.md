## ADDED Requirements

### Requirement: Component colors use foundation-styles tokens
All color classes in `packages/dnd-character-sheet` components SHALL reference foundation-styles semantic Tailwind classes or swatch arbitrary-value syntax. Raw Tailwind palette classes (e.g. `text-gray-400`, `bg-green-500`, `border-red-800`) SHALL NOT appear in any component file.

#### Scenario: Neutral text colors use semantic classes
- **WHEN** a component renders label or body text previously using `text-gray-400`, `text-gray-500`, or `text-gray-600`
- **THEN** the class SHALL be `text-neutral-subdued` or `text-neutral-strong` depending on weight

#### Scenario: Dividers and structural borders use semantic classes
- **WHEN** a component renders a divider or border previously using `border-gray-300`, `border-gray-400`, `border-gray-500`, or `bg-gray-500`
- **THEN** the class SHALL be `border-neutral-disabled`, `border-neutral-subdued`, or `bg-neutral-subdued`

#### Scenario: Death saves success state uses semantic classes
- **WHEN** a component renders a death saves success indicator previously using `bg-green-500` or `border-green-600`
- **THEN** the class SHALL be `bg-primary-surface-2` or `border-primary-surface-2`

#### Scenario: Red text uses semantic class
- **WHEN** a component renders light red text previously using `text-red-200`
- **THEN** the class SHALL be `text-destructive-foreground`

#### Scenario: Dark red borders use semantic class
- **WHEN** a component renders a dark red border previously using `border-red-800`
- **THEN** the class SHALL be `border-destructive-surface-2`

#### Scenario: Tan border uses swatch fallback
- **WHEN** a component renders a tan/parchment border previously using `--color-sheet-border`
- **THEN** the class SHALL be `border-[var(--s-parchment-400)]`

### Requirement: Local sheet tokens are removed
The file `packages/dnd-character-sheet/src/styles/tokens.css` SHALL be deleted. No component SHALL reference `--color-sheet-red`, `--color-sheet-dark`, `--color-sheet-parchment`, or `--color-sheet-border`.

#### Scenario: Dark fill and text replaced
- **WHEN** a component previously used `bg-sheet-dark`, `text-sheet-dark`, or `--color-sheet-dark`
- **THEN** the class SHALL be `text-neutral-strong` or an appropriate neutral semantic class

#### Scenario: Red header/button fills replaced
- **WHEN** a component previously used `bg-sheet-red` or `--color-sheet-red` for a filled element
- **THEN** the class SHALL be `bg-destructive-surface-2` with `text-destructive-onsurface-2` for the foreground

#### Scenario: Sheet background replaced
- **WHEN** the sheet container previously used `bg-sheet-parchment` or `--color-sheet-parchment`
- **THEN** the class SHALL be `bg-page-0`

### Requirement: tokens.css export and import are removed
The `packages/dnd-character-sheet/package.json` exports field SHALL NOT include an entry for `./dist/styles/tokens.css`. The file `apps/ageorgedev/src/styles.css` SHALL NOT contain an `@import` for `@ageorgedev/dnd-character-sheet/dist/styles/tokens.css`.

#### Scenario: Package no longer exports tokens.css
- **WHEN** the package.json exports field is inspected
- **THEN** there SHALL be no entry mapping `./dist/styles/tokens.css`

#### Scenario: App styles no longer import tokens.css
- **WHEN** `apps/ageorgedev/src/styles.css` is inspected
- **THEN** there SHALL be no `@import` referencing `dnd-character-sheet/dist/styles/tokens.css`
