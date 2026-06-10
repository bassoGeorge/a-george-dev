## Context

The monorepo already has a working vitest setup in `packages/design-system` and `packages/toolbelt`, backed by the shared `@ageorgedev/testing-config` package (provides `react-jsdom-test-setup.ts` and peer-declares testing-library). The `turbo.json` `test` task already propagates to all packages that define a `test` script. Adding test coverage to new packages means wiring up the same pattern in each.

Packages without coverage today: `brand-components`, `reveal-framework`. App without coverage: `apps/ageorgedev`. Partial coverage: `toolbelt` (missing `cn.ts`).

## Goals / Non-Goals

**Goals:**
- Every package with non-trivial logic or React components has a `vitest.config.ts` and at least one `*.spec.ts(x)` file
- New tests follow the Testing Library render + assertion style already established in `design-system`
- The root `yarn test` / `turbo test` command picks up all new test suites without any pipeline changes

**Non-Goals:**
- No coverage thresholds or CI enforcement gates
- No snapshot tests
- No tests for `foundation-styles` (raw CSS), `ts-config`, `testing-config`, or `talk-tailwind` (pure content)
- No route-level tests for `apps/ageorgedev` — app-specific components only

## Decisions

### Vitest over Jest
**Decision:** Use vitest in every new test suite.  
**Rationale:** Already the standard in this repo; shares the same Vite transform pipeline used for builds; zero new dependencies.  
**Alternative considered:** Jest — rejected, requires separate babel/ts transform config and adds inconsistency.

### Shared testing-config for React suites
**Decision:** All packages with React components declare `@ageorgedev/testing-config` as a dev dependency and set `setupFiles: ['@ageorgedev/testing-config/react-jsdom-test-setup.ts']` in their `vitest.config.ts`.  
**Rationale:** Centralises jest-dom matchers and @testing-library/react imports; already the pattern in `design-system`.  
**Alternative considered:** Each package maintaining its own setup file — rejected, duplicates boilerplate and can drift.

### jsdom for React packages, node for pure utilities
**Decision:** `environment: 'jsdom'` for `brand-components`, `reveal-framework`, `apps/ageorgedev`. No `environment` key (defaults to node) for `toolbelt`.  
**Rationale:** Toolbelt exports pure functions; no DOM needed. React components require a DOM.

### Mock reveal.js dynamic import in hook tests
**Decision:** The `useRevealFramework` hook lazy-imports `reveal.js`. In tests, mock the dynamic import with `vi.mock('reveal.js', ...)` returning a stub `Reveal` class.  
**Rationale:** Reveal.js performs heavy DOM operations and is not relevant to our hook logic. Mocking isolates the hook's own behaviour (creates instance, calls initialize).

### Test script placement
**Decision:** Add `"test": "vitest run"` to each new package's `package.json` scripts. Turborepo's existing `test` task picks this up automatically.  
**Rationale:** Consistent with `toolbelt` and `design-system`; no turbo.json changes required.

## Risks / Trade-offs

- `useRevealFramework` hook is mostly async side-effect code; tests will verify the mock is called but cannot fully test the Reveal.js lifecycle → Mitigation: document this scope limit in the spec; e2e covers actual Reveal.js rendering.
- Adding vitest + testing-library to `apps/ageorgedev` increases dev-dependency weight → Mitigation: dev-only; no production bundle impact.
- `apps/ageorgedev` uses TanStack Router which injects a router context; components that call `useRouter` or `<Link>` will need a mock router wrapper → Mitigation: app components tested here (`HomeAboveFold`, `Skill`, `SocialLink`) do not use router hooks directly.

## Open Questions

- None. All decisions resolved during design.
