## Context

`packages/toolbelt` and `packages/design-system` contain `.spec.ts` / `.spec.tsx` files written with Jest-style globals (`describe`, `it`, `expect`, `jest.mock`). The monorepo already runs on Vite + ESM — Jest's CommonJS-first transform pipeline is a mismatch. Both packages currently stub out their `test` scripts so no tests run at all. The fix is to adopt Vitest, which shares Vite's transform pipeline and natively understands ESM, TypeScript, and JSX without additional Babel transforms.

## Goals / Non-Goals

**Goals:**
- All existing spec files execute and pass under Vitest
- `yarn test` runs the full suite via Turborepo
- Component tests in `design-system` use JSDOM + `@testing-library/react` + `@testing-library/jest-dom`
- Jest-specific APIs (`jest.mock`, `jest.fn`) are replaced with Vitest equivalents (`vi.mock`, `vi.fn`)

**Non-Goals:**
- Adding new tests beyond what already exists
- Migrating the Cypress e2e suite (`apps/ageorgedev-e2e`)
- Setting up Vitest UI or coverage reporting (can be added later)
- Migrating Storybook's test runner (separate concern)

## Decisions

### 1. Vitest over Jest

Vitest is chosen over Jest because:
- Native ESM support — no `transform` / `moduleNameMapper` workarounds for `.js` extensions in TypeScript output
- Shares Vite config — same aliases, plugins, and environment as the dev build
- Jest-compatible globals (`describe`, `it`, `expect`) — spec files need minimal changes
- Active ecosystem: `@vitest/ui`, browser mode, coverage via v8

Alternative considered: updating Jest to `jest-environment-node` + `ts-jest` with ESM mode. Rejected due to significant config complexity and ongoing friction with the project's `"type": "module"` packages.

### 2. Config file placement per package

Vitest config is added to each package's existing `vite.config.ts` (under the `test` key) if one exists; otherwise a standalone `vitest.config.ts` is created. This avoids duplicating Vite plugin/alias config and keeps the number of config files minimal. Neither `packages/toolbelt` nor `packages/design-system` currently has a `vite.config.ts`, so both will get `vitest.config.ts` for now. If a `vite.config.ts` is added to either package in the future, the Vitest config should be merged into it.

Alternative considered: single root `vitest.config.ts` with workspace mode. Rejected because Turborepo already handles per-package execution; adding Vitest workspace mode on top introduces redundancy.

### 3. JSDOM environment for design-system, node for toolbelt

- `packages/toolbelt`: pure utility functions — `environment: 'node'` is sufficient and faster
- `packages/design-system`: React component tests need `environment: 'jsdom'` + `@testing-library/react`

### 4. Jest-dom via setupFiles

`@testing-library/jest-dom` matchers (`toBeInTheDocument`, `toHaveClass`) are imported via `setupFiles` in the vitest config rather than per-file imports. This removes the `import '@testing-library/jest-dom'` line from individual spec files and matches the standard Vitest pattern.

### 5. Snapshot format

Vitest's snapshot format is compatible with Jest's. Existing `.snap` files can be kept; Vitest will regenerate them on first run if needed.

## Risks / Trade-offs

- **jest.mock hoisting behavior** → Vitest's `vi.mock` is also hoisted, so behavior is equivalent. However, factory functions must not close over variables defined outside the mock — same constraint as Jest. Low risk given the small number of mock calls in scope.
- **TypeScript path resolution** → `packages/design-system` devDependencies do not currently include `@types/react`. May need to add this for component test compilation. Mitigated by adding it explicitly.
- **Snapshot regeneration** → The existing `typography-components.spec.tsx.snap` may need to be regenerated on first Vitest run if serialization differs slightly. This is a one-time, low-risk operation.

## Migration Plan

1. Install Vitest and dependencies per package (no breaking changes to build)
2. Add Vitest config per package (inline in `vite.config.ts` if it exists, otherwise create `vitest.config.ts`)
3. Update `package.json` `test` scripts to `vitest run`
4. Migrate Jest APIs in spec files (`jest.*` → `vi.*`, remove per-file jest-dom imports)
5. Run `yarn test` and fix any remaining failures
6. Commit — CI begins executing real tests
