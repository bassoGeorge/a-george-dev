import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// The prerender crawler follows every <a href> it finds, fetches it and writes
// the response back into the client output via `res.text()`. Asset links (e.g.
// the character spellbook PDFs) would therefore be re-encoded as UTF-8 and
// overwrite the correct binary asset with a corrupted one, so skip them.
const isBuiltAsset = (path: string) => path.startsWith('/assets/');

const config = defineConfig({
  cacheDir: '../../node_modules/.vite/game-tools',
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        filter: (page) => !isBuiltAsset(page.path),
      },
    }),
    react(),
  ],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3001,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  assetsInclude: ['**/*.pdf'],
});

export default config;
