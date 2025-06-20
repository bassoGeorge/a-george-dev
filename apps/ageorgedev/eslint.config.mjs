import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    // for some reason, local path not working. need to investigate
    ignores: [`**/.next/**/*`],
  },
  // ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(
    compat.config({
      extends: ['next'],
      settings: {
        next: {
          rootDir: 'apps/ageorgedev',
        },
      },
    })
  ),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
];
