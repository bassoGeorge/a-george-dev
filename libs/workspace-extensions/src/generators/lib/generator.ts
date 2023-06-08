import { Tree } from '@nx/devkit';
import { LibSchema } from './schema';
import { libraryGenerator as plainLibGenerator } from '@nx/js';
import { libraryGenerator as reactLibGenerator } from '@nx/react';
import { Linter } from '@nx/linter';

export default async function (tree: Tree, schema: LibSchema) {
  console.log('Creating library with options', schema);

  const commonLibSchema = {
    name: schema.name,
    linter: Linter.EsLint,
    bundler: 'vite',
    unitTestRunner: 'vitest',
    buildable: true,
  } as const;

  if (schema.react) {
    await reactLibGenerator(tree, {
      ...commonLibSchema,
      style: 'none',
    });
  } else {
    await plainLibGenerator(tree, commonLibSchema);
  }
}
