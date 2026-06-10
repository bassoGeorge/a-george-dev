## 1. toolbelt — add cn.ts tests

- [x] 1.1 Create `packages/toolbelt/src/cn.spec.ts` with tests covering: multi-string merge, falsy conditions, Tailwind conflict resolution, object syntax, array syntax

## 2. brand-components — wire up test infrastructure

- [x] 2.1 Add vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, and @ageorgedev/testing-config as dev dependencies in `packages/brand-components/package.json`
- [x] 2.2 Add `"test": "vitest run"` script to `packages/brand-components/package.json`
- [x] 2.3 Create `packages/brand-components/vitest.config.ts` (jsdom environment, testing-config setup file, include `src/**/*.spec.tsx`)
- [x] 2.4 Create `packages/brand-components/src/TwLogo/TwLogo.spec.tsx` covering: renders SVG, has ThoughtWorks title, forwards className, forwards data-testid

## 3. reveal-framework — wire up test infrastructure

- [x] 3.1 Add vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, and @ageorgedev/testing-config as dev dependencies in `packages/reveal-framework/package.json`
- [x] 3.2 Add `"test": "vitest run"` script to `packages/reveal-framework/package.json`
- [x] 3.3 Create `packages/reveal-framework/vitest.config.ts` (jsdom environment, testing-config setup file)
- [x] 3.4 Create `packages/reveal-framework/src/components/slide-layout-builders.spec.tsx` covering: SlideMediaRow renders children + merges className, DeckFooter renders footer element, ComparisonRow renders left/right + merges className
- [x] 3.5 Create `packages/reveal-framework/src/hooks/useRevealFramework.spec.ts` with `vi.mock('reveal.js')` stub, asserting constructor and initialize() are called on mount

## 4. ageorgedev app — wire up test infrastructure

- [x] 4.1 Add vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, and @ageorgedev/testing-config as dev dependencies in `apps/ageorgedev/package.json`
- [x] 4.2 Add `"test": "vitest run"` script to `apps/ageorgedev/package.json`
- [x] 4.3 Create `apps/ageorgedev/vitest.config.ts` (jsdom environment, testing-config setup file, include `src/**/*.spec.tsx`)
- [x] 4.4 Create `apps/ageorgedev/src/components/Resume/Skill.spec.tsx` covering: renders skill name, renders correct number of filled/unfilled indicators
- [x] 4.5 Create `apps/ageorgedev/src/components/Resume/SocialLink.spec.tsx` covering: renders accessible link with href, has target="_blank" and noopener rel
- [x] 4.6 Create `apps/ageorgedev/src/components/HomeAboveFold/HomeAboveFold.spec.tsx` covering: renders a heading element

## 5. Verify

- [x] 5.1 Run `yarn turbo test` from repo root and confirm all new test suites pass with zero failures
- [x] 5.2 Run `yarn format-and-lint` and fix any Biome issues in new files
