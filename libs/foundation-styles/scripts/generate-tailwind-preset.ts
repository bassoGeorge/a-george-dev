import Config from '../src/tailwind';
import { promises as fs, existsSync } from 'fs';
import * as path from 'path';

async function generate() {
  const dir = path.join(__dirname, '../generated-src');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, 'tailwind-preset.json'),
    JSON.stringify(Config, null, 2)
  );
}

generate();
