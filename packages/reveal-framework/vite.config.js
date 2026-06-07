import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const config = defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/reveal-framework',
  plugins: [dts(), tailwindcss(), viteReact()],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        globals: resolve(import.meta.dirname, 'src/globals.ts'),
      },
    },
    rolldownOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})

export default config
