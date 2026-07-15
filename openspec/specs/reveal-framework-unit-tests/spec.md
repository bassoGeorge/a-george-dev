## Purpose

Vitest test infrastructure and coverage for the reveal-framework package's presentation components and the useRevealFramework hook.

## Requirements

### Requirement: reveal-framework package has vitest test infrastructure
The `packages/reveal-framework` package SHALL have a `vitest.config.ts` configured with `jsdom` environment and `@ageorgedev/testing-config/react-jsdom-test-setup.ts` as its setup file. The `package.json` SHALL include a `"test": "vitest run"` script and the required vitest dev dependencies.

#### Scenario: test script is registered
- **WHEN** `yarn turbo test --filter=@ageorgedev/reveal-framework` is run
- **THEN** vitest executes and exits with code 0

### Requirement: SlideMediaRow renders children in a flex container
`SlideMediaRow` SHALL render a `div` with its children, accepting a `className` prop that is merged with the base styles.

#### Scenario: renders children
- **WHEN** `<SlideMediaRow>` is rendered with child content
- **THEN** the child content is present in the DOM

#### Scenario: merges className
- **WHEN** `<SlideMediaRow className="extra" />` is rendered
- **THEN** the root div has both the base class and "extra" in its class list

### Requirement: DeckFooter renders children in a footer element
`DeckFooter` SHALL render a `<footer>` element containing its children.

#### Scenario: renders as footer
- **WHEN** `<DeckFooter>` is rendered with child content
- **THEN** a `<footer>` element is present containing the child content

### Requirement: ComparisonRow renders left and right content in a two-column grid
`ComparisonRow` SHALL render both `left` and `right` prop content side by side.

#### Scenario: renders left and right slots
- **WHEN** `<ComparisonRow left={<span>L</span>} right={<span>R</span>} />` is rendered
- **THEN** both "L" and "R" text are present in the DOM

#### Scenario: merges className
- **WHEN** `<ComparisonRow className="custom" left={null} right={null} />` is rendered
- **THEN** the root div includes "custom" in its class list

### Requirement: useRevealFramework hook initialises a Reveal.js deck
The hook SHALL call `reveal.js` with the provided element ref and invoke `initialize()` on the resulting deck instance. Tests SHALL use a `vi.mock('reveal.js')` stub.

#### Scenario: initialize is called on mount
- **WHEN** the hook renders with a valid element ref
- **THEN** the mocked `Reveal` constructor is called and `initialize()` is invoked on the instance
