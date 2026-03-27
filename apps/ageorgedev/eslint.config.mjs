import nx from '@nx/eslint-plugin';
import { tanstackConfig } from '@tanstack/eslint-config';
import baseConfig from '../../eslint.config.mjs';

// console.log("[debug] eslint setup: base", baseConfig.find((c) => c.name === "typescript-eslint/base").plugins['@typescript-eslint']);
// console.log("[debug] eslint setup: tanstack", tanstackConfig.find((c) => c.name === "tanstack/javascript").rules['@typescript-eslint/array-type']);
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
