## 1. Install Dependencies

- [x] 1.1 Add `vitest` and `@vitest/ui` as devDependencies to `packages/toolbelt`
- [x] 1.2 Add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@types/react` as devDependencies to `packages/design-system`

## 2. Configure Vitest in packages/toolbelt

- [x] 2.1 Check if `packages/toolbelt/vite.config.ts` exists; if so, add a `test` block with `environment: 'node'` to it, otherwise create `packages/toolbelt/vitest.config.ts` with the same config
- [x] 2.2 Update `packages/toolbelt/package.json` `test` script from `echo 'temporary dummy tests'` to `vitest run`

## 3. Configure Vitest in packages/design-system

- [x] 3.1 Check if `packages/design-system/vite.config.ts` exists; if so, add a `test` block with `environment: 'jsdom'` and setupFiles to it, otherwise create `packages/design-system/vitest.config.ts` with the same config including glob for `src/**/*.spec.tsx`
- [x] 3.2 Create `packages/design-system/src/test-setup.ts` that imports `@testing-library/jest-dom`
- [x] 3.3 Update `packages/design-system/package.json` `test` script from `echo 'temporary dummy tests'` to `vitest run`

## 4. Migrate Jest APIs in spec files

- [x] 4.1 Update `packages/design-system/src/CodeBlock/CodeBlock.spec.tsx`: replace `jest.mock(...)` with `vi.mock(...)` and remove the `import '@testing-library/jest-dom'` line (covered by setupFiles)
- [x] 4.2 Scan all remaining spec files in `packages/design-system/src/` for any other `jest.*` references and replace with `vi.*` equivalents
- [x] 4.3 Verify `packages/toolbelt/src/ramda-additions.spec.ts` needs no changes (uses only globals — `describe`, `it`, `expect`)

## 5. Verify and Fix

- [ ] 5.1 Run `yarn turbo test --filter=@ageorgedev/toolbelt` and confirm all tests pass
- [ ] 5.2 Run `yarn turbo test --filter=@ageorgedev/design-system` and confirm all tests pass
- [ ] 5.3 Delete or regenerate `packages/design-system/src/typography/__snapshots__/typography-components.spec.tsx.snap` if Vitest reports snapshot mismatch
- [ ] 5.4 Run `yarn test` from repo root and confirm full Turborepo test pipeline exits 0
