## 1. Rename apps/ageorgedev test files

- [x] 1.1 `git mv apps/ageorgedev/src/components/HomeAboveFold/HomeAboveFold.spec.tsx apps/ageorgedev/src/components/HomeAboveFold/HomeAboveFold.test.tsx`
- [x] 1.2 `git mv apps/ageorgedev/src/components/Resume/Skill.spec.tsx apps/ageorgedev/src/components/Resume/Skill.test.tsx`
- [x] 1.3 `git mv apps/ageorgedev/src/components/Resume/SocialLink.spec.tsx apps/ageorgedev/src/components/Resume/SocialLink.test.tsx`

## 2. Rename packages/design-system test files (and snapshot)

- [x] 2.1 `git mv packages/design-system/src/CodeBlock/CodeBlock.spec.tsx packages/design-system/src/CodeBlock/CodeBlock.test.tsx`
- [x] 2.2 `git mv packages/design-system/src/callouts/CalloutBadge.spec.tsx packages/design-system/src/callouts/CalloutBadge.test.tsx`
- [x] 2.3 `git mv packages/design-system/src/cards/Card.spec.tsx packages/design-system/src/cards/Card.test.tsx`
- [x] 2.4 `git mv packages/design-system/src/cards/TiltCard.spec.tsx packages/design-system/src/cards/TiltCard.test.tsx`
- [x] 2.5 `git mv packages/design-system/src/logo/NameLogo.spec.tsx packages/design-system/src/logo/NameLogo.test.tsx`
- [x] 2.6 `git mv packages/design-system/src/logo/ShortNameLogo.spec.tsx packages/design-system/src/logo/ShortNameLogo.test.tsx`
- [x] 2.7 `git mv packages/design-system/src/theming/ThemeSwitcher.spec.tsx packages/design-system/src/theming/ThemeSwitcher.test.tsx`
- [x] 2.8 `git mv packages/design-system/src/theming/theme-state.spec.ts packages/design-system/src/theming/theme-state.test.ts`
- [x] 2.9 `git mv packages/design-system/src/typography/Text.spec.tsx packages/design-system/src/typography/Text.test.tsx`
- [x] 2.10 `git mv packages/design-system/src/typography/typography-components.spec.tsx packages/design-system/src/typography/typography-components.test.tsx`
- [x] 2.11 `git mv packages/design-system/src/typography/__snapshots__/typography-components.spec.tsx.snap packages/design-system/src/typography/__snapshots__/typography-components.test.tsx.snap`

## 3. Rename packages/brand-components test files

- [x] 3.1 `git mv packages/brand-components/src/TwLogo/TwLogo.spec.tsx packages/brand-components/src/TwLogo/TwLogo.test.tsx`

## 4. Rename packages/reveal-framework test files

- [x] 4.1 `git mv packages/reveal-framework/src/components/slide-layout-builders.spec.tsx packages/reveal-framework/src/components/slide-layout-builders.test.tsx`
- [x] 4.2 `git mv packages/reveal-framework/src/hooks/useRevealFramework.spec.ts packages/reveal-framework/src/hooks/useRevealFramework.test.ts`

## 5. Rename packages/toolbelt test files

- [x] 5.1 `git mv packages/toolbelt/src/cn.spec.ts packages/toolbelt/src/cn.test.ts`
- [x] 5.2 `git mv packages/toolbelt/src/ramda-additions.spec.ts packages/toolbelt/src/ramda-additions.test.ts`

## 6. Update Vitest configs

- [x] 6.1 `apps/ageorgedev/vitest.config.ts`: change `include` to `['src/**/*.test.{ts,tsx}']`
- [x] 6.2 `apps/game-tools/vitest.config.ts`: change `include` to `['src/**/*.test.{ts,tsx}']`
- [x] 6.3 `packages/design-system/vitest.config.ts`: change `include` to `['src/**/*.test.{ts,tsx}']`
- [x] 6.4 `packages/brand-components/vitest.config.ts`: change `include` to `['src/**/*.test.{ts,tsx}']`
- [x] 6.5 `packages/reveal-framework/vitest.config.ts`: change `include` to `['src/**/*.test.{ts,tsx}']`
- [x] 6.6 `packages/toolbelt/vitest.config.ts`: change `include` to `['src/**/*.test.ts']` (no `tsx` — package has no JSX)
- [x] 6.7 Confirm `packages/dnd-character-sheet/vitest.config.ts` is unchanged (already `src/**/*.test.{ts,tsx}`)

## 7. Documentation

- [x] 7.1 Add a convention note to root `CLAUDE.md` stating Vitest unit tests use `*.test.ts`/`*.test.tsx`, distinct from Playwright e2e specs (`*.spec.ts`, unchanged, out of scope for this migration)

## 8. Verification

- [x] 8.1 Run `yarn test` at the monorepo root; confirm every affected package reports the same number of test files/cases as before the migration
- [x] 8.2 Run `yarn turbo test --filter=@ageorgedev/design-system` specifically and confirm the renamed snapshot matches with no diff/no snapshot-write prompt
- [x] 8.3 Run `yarn format-and-lint` to confirm Biome has no complaints about the renamed files
- [x] 8.4 Confirm no stray `*.spec.ts`/`*.spec.tsx` files remain under any `src/**` (excluding `apps/ageorgedev-e2e/tests` and `apps/game-tools-e2e/tests`, which are intentionally unchanged)
