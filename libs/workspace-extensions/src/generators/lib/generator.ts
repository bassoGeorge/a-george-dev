import {
  Tree,
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  updateJson,
} from '@nx/devkit';
import { libraryGenerator as plainLibGenerator } from '@nx/js';
import { Linter } from '@nx/linter';
import { libraryGenerator as reactLibGenerator } from '@nx/react';
import * as path from 'path';
import { LibSchema } from './schema';

export default async function (tree: Tree, schema: LibSchema) {
  console.log('Creating library with options', schema);

  const libGeneratorSchema = {
    name: schema.name,
    linter: Linter.EsLint,
    bundler: 'vite',
    unitTestRunner: 'vitest',
    buildable: true,
    style: 'none',
  } as const;

  const generator = schema.react ? reactLibGenerator : plainLibGenerator;

  const genCleanup = await generator(tree, libGeneratorSchema);

  const projectConfig = readProjectConfiguration(tree, schema.name);

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

  generateFiles(tree, path.join(__dirname, 'files'), projectConfig.root, {});

  formatFiles(tree);

  return genCleanup;
}
