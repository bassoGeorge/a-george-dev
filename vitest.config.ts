import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['packages/*/vitest.config.ts', 'apps/*/vitest.config.ts'],
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
