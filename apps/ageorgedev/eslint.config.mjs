import nx from '@nx/eslint-plugin';
import { tanstackConfig } from '@tanstack/eslint-config';
import baseConfig from '../../eslint.config.mjs';

// TODO: additional typescript rules here should apply globally, not just for this

// console.log("[debug] eslint setup: base", baseConfig.find((c) => c.name === "typescript-eslint/base").plugins['@typescript-eslint']);
// console.log("[debug] eslint setup: tanstack", tanstackConfig.find((c) => c.name === "tanstack/javascript").rules);
// delete tanstackConfig.find((c) => c.name === "tanstack/javascript").plugins['@typescript-eslint']

// Since tanstack config redefines typescript plugin, we fix it by assigning it the same as default
tanstackConfig.find((c) => c.name === 'tanstack/javascript').plugins[
  '@typescript-eslint'
] = baseConfig.find((c) => c.name === 'typescript-eslint/base').plugins[
  '@typescript-eslint'
];

export default [
  ...tanstackConfig,
  ...baseConfig, // our configs rul over tanstacks
  ...nx.configs['flat/react-typescript'],
];
