import { defineConfig, searchForWorkspaceRoot } from 'vite';
// import { devtools } from '@tanstack/devtools-vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import * as path from 'path';
import dts from 'vite-plugin-dts';

import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';

const config = defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/ageorgedev',
  plugins: [
    // devtools(),

    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.json'),
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
      },
      // spa: {
      //   enabled: true,
      // },
    }),
    viteReact(),
  ],
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd())
      ]
    }
  }
});

export default config;
