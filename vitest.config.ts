import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      './packages/toolbelt/vitest.config.ts',
      './packages/reveal-framework/vitest.config.ts',
      './packages/design-system/vitest.config.ts',
      './packages/brand-components/vitest.config.ts',
      './packages/dnd-character-sheet/vitest.config.ts',
      './apps/ageorgedev/vitest.config.ts',
      './apps/game-tools/vitest.config.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'packages/*/src/**/*.{ts,tsx}',
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
        '**/*.generated.ts',
      ],
    },
  },
});
