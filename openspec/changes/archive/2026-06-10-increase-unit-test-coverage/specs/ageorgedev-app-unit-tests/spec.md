## ADDED Requirements

### Requirement: ageorgedev app has vitest test infrastructure
The `apps/ageorgedev` app SHALL have a `vitest.config.ts` configured with `jsdom` environment and `@ageorgedev/testing-config/react-jsdom-test-setup.ts` as its setup file. The `package.json` SHALL include a `"test": "vitest run"` script and the required vitest dev dependencies.

#### Scenario: test script is registered
- **WHEN** `yarn turbo test --filter=@ageorgedev/ageorgedev` is run
- **THEN** vitest executes and exits with code 0

### Requirement: Skill component renders skill name and level
The `Skill` component SHALL render the skill name as visible text and represent the proficiency level visually.

#### Scenario: renders skill name
- **WHEN** `<Skill name="TypeScript" level={4} />` is rendered
- **THEN** "TypeScript" is present in the DOM

#### Scenario: renders correct number of filled indicators
- **WHEN** `<Skill name="TypeScript" level={3} maxLevel={5} />` is rendered
- **THEN** 3 indicators are in the filled/active state and 2 are in the unfilled state

### Requirement: SocialLink renders an accessible anchor
The `SocialLink` component SHALL render an `<a>` element with an accessible label and the provided href.

#### Scenario: renders link with href
- **WHEN** `<SocialLink href="https://github.com/example" label="GitHub" />` is rendered
- **THEN** a link with the accessible name "GitHub" pointing to the given href is present

#### Scenario: link opens in new tab
- **WHEN** `<SocialLink href="https://github.com/example" label="GitHub" />` is rendered
- **THEN** the anchor has `target="_blank"` and `rel` containing `noopener`

### Requirement: HomeAboveFold renders the primary heading
The `HomeAboveFold` component SHALL render a primary heading element identifying the page owner.

#### Scenario: renders heading
- **WHEN** `<HomeAboveFold />` is rendered
- **THEN** a heading element is present in the document
