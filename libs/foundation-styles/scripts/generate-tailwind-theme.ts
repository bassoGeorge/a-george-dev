import { TailwindTheme } from '../src/lib/tailwind-theme';
import { promises as fs } from 'fs';
import * as path from 'path';

async function generate() {
  const dir = path.join(__dirname, '../generated-src');
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, 'tailwind-theme.json');
  await fs.writeFile(filePath, JSON.stringify(TailwindTheme, null, 2));
  return filePath;
}

generate().then((filePath) => {
  console.info('generated file:', path.relative(__dirname, filePath));
});
