import { Tree } from '@nx/devkit';
import { LibSchema } from './schema';

export default async function (tree: Tree, schema: LibSchema) {
  console.log('Creating library with options', schema);
}
