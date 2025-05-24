import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/foundation-styles',

  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      name: 'foundation-styles',

      // Could also be a dictionary or array of multiple entry points.
      // entry: 'src/index.ts',
      // fileName: 'index',
      entry: {
        index: 'src/index.ts',
        globals: 'src/globals.ts',
        tailwind: 'src/tailwind.ts',
      },
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },
});
