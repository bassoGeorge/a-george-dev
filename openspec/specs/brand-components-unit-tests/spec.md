## Purpose

Vitest test infrastructure and coverage for the brand-components package, starting with the TwLogo component.

## Requirements

### Requirement: brand-components package has vitest test infrastructure
The `packages/brand-components` package SHALL have a `vitest.config.ts` configured with `jsdom` environment and `@ageorgedev/testing-config/react-jsdom-test-setup.ts` as its setup file. The `package.json` SHALL include a `"test": "vitest run"` script and declare `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `@ageorgedev/testing-config` as dev dependencies.

#### Scenario: test script is registered
- **WHEN** `yarn turbo test --filter=@ageorgedev/brand-components` is run
- **THEN** vitest executes and exits with code 0 (all tests pass)

### Requirement: TwLogo renders without error
The `TwLogo` component SHALL render to the DOM without throwing, producing an `<svg>` element.

#### Scenario: default render
- **WHEN** `<TwLogo />` is rendered with no props
- **THEN** an SVG element is present in the document

#### Scenario: accessible title is present
- **WHEN** `<TwLogo />` is rendered
- **THEN** the SVG contains a `<title>` element with the text "ThoughtWorks"

### Requirement: TwLogo accepts SVG props
The component SHALL forward arbitrary `SVGProps<SVGSVGElement>` to the root `<svg>` element.

#### Scenario: className prop is forwarded
- **WHEN** `<TwLogo className="my-class" />` is rendered
- **THEN** the root SVG element has `class="my-class"` in the DOM

#### Scenario: data attribute is forwarded
- **WHEN** `<TwLogo data-testid="logo" />` is rendered
- **THEN** the element can be queried by `getByTestId('logo')`
