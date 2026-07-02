import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

const config = defineConfig({
  cacheDir: '../../node_modules/.vite/game-tools',
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
    }),
    react(),
  ],
  server: {
    port: 3001,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
  assetsInclude: ['**/*.pdf'],
});

export default config;
