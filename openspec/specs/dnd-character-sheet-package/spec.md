## Purpose

Establishes `@ageorgedev/dnd-character-sheet` as its own workspace package (build, tokens, fonts, exports) and defines the character-effects pipeline, resource rendering, and EJS-based feature-text templating it provides.

## Requirements

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

### Requirement: Feature effects can modify raw character data

A `Feature` SHALL expose an optional `effects: Effect[]` field. Each `Effect` is a discriminated union with two kinds: `character` (mutates the raw `Character` before derived stats are computed) and `derived` (postprocesses `DerivedStats`, with read access to the effective `Character`).

```ts
type Effect =
  | { kind: 'character'; mod: (c: Character) => Character }
  | { kind: 'derived';   mod: (args: { character: Character; stats: DerivedStats }) => DerivedStats };
```

#### Scenario: Character-effect mutates speed
- **WHEN** a feature declares `effects: [addSpeed(5)]` and the base character speed is 30
- **THEN** `useCharacter().character.speed` returns 35

#### Scenario: Character-effect grants a skill proficiency
- **WHEN** a feature declares `effects: [grantSkillProficiency(Skill.Perception)]` and the base character does not have Perception as a proficiency
- **THEN** `useCharacter().character.skillProficiencies` includes Perception
- **THEN** `useCharacter().derived.skills.Perception.quality` is `'proficient'`
- **THEN** `useCharacter().derived.skills.Perception.modifier` includes the proficiency bonus

#### Scenario: Character-effect bumps an ability score
- **WHEN** a feature declares `effects: [bumpAbility(Ability.Charisma, 1)]` and the base Charisma score is 16
- **THEN** `useCharacter().character.abilities.CHA` returns 17
- **THEN** derived stats (`abilityModifiers.CHA`, `abilitySaveDCs.CHA`, ability-based resource counts, spell save DC when CHA is the casting ability) all reflect the bumped score

#### Scenario: Derived-effect reads effective character
- **WHEN** a character has a character-effect that bumps speed by 5 and a derived-effect whose `mod` reads `args.character.speed`
- **THEN** the derived-effect's `args.character.speed` reflects the post-mutation speed, not the raw authored value

### Requirement: Effect helpers throw on invariant violations

Character-effect helpers that grant list membership SHALL throw at pipeline execution time when the invariant they enforce is violated.

#### Scenario: Duplicate skill proficiency grant
- **WHEN** a character's effects grant the same `Skill` proficiency twice (either from two different features or from a feature granting a proficiency the base character already has)
- **THEN** `calculateStats` (or the effects pipeline) throws an error naming the duplicated skill

#### Scenario: Expertise without proficiency
- **WHEN** a character's effects grant expertise in a `Skill` that the character is not proficient in *after* all character-effects have been applied
- **THEN** the pipeline throws an error naming the skill and its proficiency state

### Requirement: Effects pipeline gathers from all feature lists

The effects pipeline SHALL gather effects from `character.features`, `character.speciesTraits`, and `character.feats` in that order, and apply character-effects before computing derived stats.

#### Scenario: Species-trait effect and feat effect both apply
- **WHEN** a species trait declares `effects: [addSpeed(5)]` and a feat declares `effects: [bumpAbility(Ability.Dexterity, 1)]`
- **THEN** both effects are applied to the effective character before derived stats are computed

### Requirement: Resources component renders class feature resource pools

The package SHALL include a `Resources` component that reads resource metadata from a character's features (via a `resource` field on `Feature`) and renders each resource as a checkable pool with a label and count. Resource counts computed from character data (e.g. `kind: 'ability'`, `kind: 'class-level'`) SHALL be computed against the *effective* character (post-effects), so ability-score bumps and similar mutations propagate to resource counts.

#### Scenario: Character with resource features
- **WHEN** a character has features with `resource` metadata
- **THEN** the `Resources` component renders one entry per resource showing its name and available uses as checkboxes
- **THEN** the component is visible on the rendered character sheet

#### Scenario: Character with no resource features
- **WHEN** a character has no features that declare a `resource`
- **THEN** the `Resources` component renders nothing (returns null)

#### Scenario: Ability-based resource reflects effect-bumped ability
- **WHEN** a character has a feat that bumps Charisma by 1 and a feature whose resource count is `{ kind: 'ability', ability: CHA }`
- **THEN** the resource count reflects the post-bump Charisma score

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
