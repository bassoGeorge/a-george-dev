import {
  Tree,
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  updateJson,
} from '@nx/devkit';
import { libraryGenerator as plainLibGenerator } from '@nx/js';
import { Linter } from '@nx/eslint';
import { libraryGenerator as reactLibGenerator } from '@nx/react';
import * as path from 'path';
import { LibSchema } from './schema';

export default async function (tree: Tree, schema: LibSchema) {
  const libGeneratorSchema = {
    name: schema.name,
    linter: Linter.EsLint,
    bundler: 'vite',
    unitTestRunner: 'jest',
    buildable: true,
    style: 'none',
  } as const;

  const generator = schema.react ? reactLibGenerator : plainLibGenerator;

  const genCleanup = await generator(tree, libGeneratorSchema);

  const projectConfig = readProjectConfiguration(tree, schema.name);

  // Fix eslint
  updateJson(tree, `${projectConfig.root}/.eslintrc.json`, (config) => {
    config.extends.push('../../.eslintrc.ts.json');
    config.ignorePatterns = [
      ...config.ignorePatterns,
      'dist/**/*',
      'generated-src/**/*',
      '.storybook/preview.js',
    ];
    return config;
  });

  // Add tailwind and postcss files
  generateFiles(tree, path.join(__dirname, 'files'), projectConfig.root, {
    template: '',
  });

  formatFiles(tree);

  return genCleanup;
}
