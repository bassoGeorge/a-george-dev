import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from 'ink';
import { App } from './App.js';
import { generateFile } from './lib/generateFile.js';
import type { WizardState } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHARACTERS_DIR = join(
  __dirname,
  '../../../packages/dnd-character-sheet/src/characters'
);

const result: { state: WizardState | null } = { state: null };

const { waitUntilExit } = render(
  <App
    onComplete={(state) => {
      result.state = state;
    }}
  />
);

await waitUntilExit();

if (result.state) {
  mkdirSync(CHARACTERS_DIR, { recursive: true });
  const outputPath = join(CHARACTERS_DIR, result.state.filename);
  writeFileSync(outputPath, generateFile(result.state));
  console.log(
    `\n✓ Written: packages/dnd-character-sheet/src/characters/${result.state.filename}`
  );
}
