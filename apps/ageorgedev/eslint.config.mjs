import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';
import { tanstackConfig } from '@tanstack/eslint-config';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

// console.log("[debug] eslint setup: base", baseConfig.find((c) => c.name === "typescript-eslint/base").plugins['@typescript-eslint']);
console.log("[debug] eslint setup: tanstack", tanstackConfig.find((c) => c.name === "tanstack/javascript"));
delete tanstackConfig.find((c) => c.name === "tanstack/javascript").plugins['@typescript-eslint']

export default [
  // ...fixupConfigRules(compat.extends('next')),
  // ...fixupConfigRules(
  //   compat.config({
  //     extends: ['next'],
  //     settings: {
  //       next: {
  //         rootDir: 'apps/ageorgedev',
  //       },
  //     },
  //   })
  // ),
  // ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...baseConfig,
  ...tanstackConfig,
  ...nx.configs['flat/react-typescript'],
];
