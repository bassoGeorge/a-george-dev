import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import dts from 'vite-plugin-dts'

const config = defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/ageorgedev',
  plugins: [
    dts(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Callback when page is successfully rendered
        // onSuccess: ({ page }) => {
        //   console.log(`Rendered ${page.path}!`);
        // },

        // // Fail if an error occurs during prerendering
        // failOnError: true,

        // // Whether to extract links from the HTML and prerender them also
        // crawlLinks: true,

        // // If disabled, only the root path or the paths defined in the pages config will be prerendered
        // autoStaticPathsDiscovery: true,
      },
      // pages: [
      //   {
      //     path: '/talks',
      //     prerender: { enabled: true, outputPath: '/talks/index.html' },
      //   },
      // ],
      // spa: {
      //   enabled: true,
      // },
    }),
    viteReact(),
  ],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
})

export default config
