## ADDED Requirements

### Requirement: Package exists as a workspace member
The monorepo SHALL include a package at `packages/dnd-character-sheet/` registered as `@ageorgedev/dnd-character-sheet` with a `package.json` that follows the workspace conventions used by other packages (`@ageorgedev/design-system`, `@ageorgedev/toolbelt`, etc.).

#### Scenario: Package is discoverable by Yarn workspaces
- **WHEN** `yarn workspaces list` is run from the repo root
- **THEN** `@ageorgedev/dnd-character-sheet` appears in the output

#### Scenario: Package can be referenced as a workspace dependency
- **WHEN** another workspace package lists `@ageorgedev/dnd-character-sheet` in its dependencies
- **THEN** Yarn resolves it to the local workspace without a network fetch

### Requirement: Package builds with tsc and cpx
The package SHALL use `tsc` for TypeScript compilation and `cpx` for copying CSS files to `dist/`, consistent with other packages in the monorepo. It SHALL NOT use Vite or any bundler.

#### Scenario: Build produces JS and type declarations
- **WHEN** `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` is run
- **THEN** `packages/dnd-character-sheet/dist/` contains `.js` files and `.d.ts` type declarations for all exported modules

#### Scenario: Build copies CSS module files
- **WHEN** the build completes
- **THEN** `dist/` contains the CSS module files (`*.module.css`) from `src/` at their corresponding paths

#### Scenario: Build copies tokens CSS
- **WHEN** the build completes
- **THEN** `dist/styles/tokens.css` exists and contains the package's `@theme` token definitions

### Requirement: TypeScript config extends monorepo base
The package's `tsconfig.json` SHALL extend `@ageorgedev/ts-config/react.json` and SHALL NOT duplicate compiler options already defined in the base config.

#### Scenario: tsconfig references workspace base
- **WHEN** `packages/dnd-character-sheet/tsconfig.json` is read
- **THEN** `extends` points to `@ageorgedev/ts-config/react.json`

### Requirement: Tailwind classes are scanned by the consumer app
The consumer app (`apps/game-tools`) SHALL scan `packages/dnd-character-sheet/src` for Tailwind utility classes via a `@source` directive, consistent with how other packages are scanned.

#### Scenario: Tailwind utilities from character-sheet are available in the app
- **WHEN** `apps/game-tools/src/styles.css` includes `@source "../../../packages/dnd-character-sheet/src"`
- **THEN** the Tailwind build includes utilities used in the package's source files

### Requirement: Package-scoped design tokens are defined locally
The package SHALL define its D&D-specific color tokens (`sheet-red`, `sheet-dark`, `sheet-parchment`, `sheet-border`) in `src/styles/tokens.css` using a `@theme` block. This file SHALL be consumed by the app-level CSS, not bundled into the package's dist.

#### Scenario: Token CSS file exists at the expected path
- **WHEN** the package source is read
- **THEN** `src/styles/tokens.css` exists and declares `--color-sheet-red`, `--color-sheet-dark`, `--color-sheet-parchment`, and `--color-sheet-border`

#### Scenario: Tokens are available as Tailwind utilities in the consumer app
- **WHEN** the consumer app imports `tokens.css` and a component uses `bg-sheet-red`
- **THEN** the class resolves to the correct color value

### Requirement: Font references use monorepo tokens
The package SHALL reference fonts using the token names defined in `foundation-styles` (`--font-heading`, `--font-body`, `--font-interface`) rather than declaring its own font families. It SHALL NOT include a Google Fonts CDN import.

#### Scenario: No Google Fonts import in package source
- **WHEN** all CSS files in `packages/dnd-character-sheet/src/` are read
- **THEN** no file contains `fonts.googleapis.com`

#### Scenario: Components use standard font tokens
- **WHEN** the package's CSS uses font utilities
- **THEN** they reference `font-heading`, `font-body`, or `font-interface` (the `--font-*` tokens from foundation-styles)

### Requirement: cn utility sourced from toolbelt
The package SHALL import `cn` from `@ageorgedev/toolbelt` rather than defining its own implementation. The local `src/lib/cn.ts` file SHALL be removed.

#### Scenario: No local cn implementation
- **WHEN** `packages/dnd-character-sheet/src/` is searched for a local `cn` function definition
- **THEN** no file defines `export function cn` or `export const cn`

#### Scenario: toolbelt is listed as a dependency
- **WHEN** `packages/dnd-character-sheet/package.json` is read
- **THEN** `@ageorgedev/toolbelt` appears in `dependencies`

### Requirement: All original components and types are exported
The package SHALL export all components, types, and utilities that were present in the original `@dnd-tooling/character-sheet` package, preserving the public API surface.

#### Scenario: Public exports are accessible
- **WHEN** a consumer imports from `@ageorgedev/dnd-character-sheet`
- **THEN** all previously exported symbols (CharacterSheet, StandardCharacterSheet, component primitives, types, calculateStats) are available

### Requirement: Resources component renders class feature resource pools
The package SHALL include a `Resources` component that reads resource metadata from a character's features (via a `resource` field on `Feature`) and renders each resource as a checkable pool with a label and count.

#### Scenario: Character with resource features
- **WHEN** a character has features with `resource` metadata
- **THEN** the `Resources` component renders one entry per resource showing its name and available uses as checkboxes
- **THEN** the component is visible on the rendered character sheet

#### Scenario: Character with no resource features
- **WHEN** a character has no features that declare a `resource`
- **THEN** the `Resources` component renders nothing (returns null)

### Requirement: Feature text supports EJS template substitution
The package SHALL enrich feature, feat, and species trait descriptions at render time using EJS templating. Templates have access to character level data (`<%= level.total %>`, `<%= level.<ClassName> %>`) and support full JavaScript expressions, conditionals, and loops.

#### Scenario: Feature description with level placeholder
- **WHEN** a feature's `description` contains `<%= level.total %>`
- **THEN** the rendered description shows the character's total level as a number

#### Scenario: Feature description with class-level placeholder
- **WHEN** a feature's `description` contains `<%= level.Monk %>`
- **THEN** the rendered description shows the character's Monk class level

#### Scenario: Feature description with arithmetic expression
- **WHEN** a feature's `description` contains `<%= level.total * 10 %>`
- **THEN** the rendered description shows the computed numeric result

## REMOVED Requirements

### Requirement: Feature text supports Mustache template substitution
**Reason**: Replaced by EJS template rendering, which supports full JavaScript expressions that Mustache cannot evaluate.
**Migration**: Replace `{{variable}}` syntax with `<%= variable %>` in all description strings.

### Requirement: Derived stats include hit dice per class
The `calculateDerivedStats` function SHALL compute hit dice for each character class, mapping each class to its canonical die size (d6–d12) and including the class level as the dice count.

#### Scenario: Hit dice are calculated
- **WHEN** `calculateDerivedStats` is called for a character with one or more classes
- **THEN** `derivedStats.hitDice` contains one entry per class with `count` equal to the class level and `dice` equal to the class's hit die size
