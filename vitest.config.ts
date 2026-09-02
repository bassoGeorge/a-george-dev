import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['packages/*/vitest.config.ts', 'apps/*/vitest.config.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      // Only projects with a vitest.config.ts registered in `projects` above can
      // register a covered line, so only those are measured. Enumerated rather than
      // globbed on purpose: adding a package must be a deliberate edit here, so an
      // untested new package is visible in review instead of silently unmeasured.
      include: [
        'packages/brand-components/src/**/*.{ts,tsx}',
        'packages/design-system/src/**/*.{ts,tsx}',
        'packages/dnd-character-sheet/src/**/*.{ts,tsx}',
        'packages/reveal-framework/src/**/*.{ts,tsx}',
        'packages/toolbelt/src/**/*.{ts,tsx}',
        'apps/ageorgedev/src/**/*.{ts,tsx}',
        'apps/game-tools/src/**/*.{ts,tsx}',
      ],
      exclude: [
        '**/*.{test,spec}.{ts,tsx}',
        '**/dist/**',
        '**/node_modules/**',
        '**/storybook-static/**',
        'apps/*-e2e/**',
        'apps/design-docs/**',
        // Generated sources, including TanStack Router route trees
        '**/*.generated.ts',
        '**/*.gen.ts',
        // No Storybook test-runner is configured, so stories execute nowhere
        '**/*.stories.tsx',
        // Router framework wiring; the pages themselves are covered by Playwright e2e
        '**/src/routes/**',
        '**/src/router.tsx',
        '**/src/components/GlobalProviders.tsx',
        '**/src/mdx-components.tsx',
        // Declarative character data. Single-segment wildcard so that
        // dnd-characters/index.ts — a registry with slug + lookup logic — stays measured.
        'apps/game-tools/src/data/dnd-characters/*/**',
        'packages/dnd-character-sheet/src/characters/**',
      ],
    },
  },
});
