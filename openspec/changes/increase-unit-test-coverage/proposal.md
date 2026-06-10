## Why

Several packages in the monorepo have no unit test setup at all, leaving regressions in component rendering and utility logic undetected until e2e or manual review. Closing this gap now, before the codebase grows further, keeps the cost of adding tests low.

## What Changes

- Add vitest configuration and test files to `packages/brand-components`
- Add vitest configuration and test files to `packages/reveal-framework`
- Add vitest configuration and test files to `apps/ageorgedev`
- Add missing `cn.ts` tests to `packages/toolbelt` (vitest already configured)
- All new tests use Testing Library render + assertion style (no snapshots), consistent with existing `design-system` tests

## Capabilities

### New Capabilities

- `brand-components-unit-tests`: Unit tests for the `TwLogo` component in `packages/brand-components`, with vitest setup wired to the shared `testing-config`
- `reveal-framework-unit-tests`: Unit tests for layout builder components (`SlideMediaRow`, `DeckFooter`, `ComparisonRow`) and the `useRevealFramework` hook in `packages/reveal-framework`
- `ageorgedev-app-unit-tests`: Unit tests for app-specific components in `apps/ageorgedev` (`HomeAboveFold`, `Skill`, `SocialLink`), with vitest setup added to the app
- `toolbelt-cn-tests`: Tests for `cn()` in `packages/toolbelt` covering class merging and conditional class behaviour

### Modified Capabilities

## Impact

- `packages/brand-components`: new `vitest.config.ts`, new `*.spec.tsx` files
- `packages/reveal-framework`: new `vitest.config.ts`, new `*.spec.tsx` files
- `apps/ageorgedev`: new `vitest.config.ts`, new `*.spec.tsx` files
- `packages/toolbelt`: new `cn.spec.ts` test file
- Root `turbo.json` / `package.json` `test` task already propagates via Turborepo — no pipeline changes needed unless the new packages are not yet included
- No production code changes; no breaking changes
