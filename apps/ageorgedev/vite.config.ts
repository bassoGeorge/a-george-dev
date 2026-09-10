import process from 'node:process';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import dts from 'vite-plugin-dts';

const config = defineConfig({
  cacheDir: '../../node_modules/.vite/ageorgedev',
  plugins: [
    dts(),
    tailwindcss(),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: '@mdx-js/react',
    }),
    tanstackStart({
      prerender: {
        enabled: true,
        // Callback when page is successfully rendered
        // onSuccess: ({ page }) => {
        //   console.log(`Rendered ${page.path}!`);
        // },

        // // Fail if an error occurs during prerendering
        // failOnError: true,

        // Extract links from the HTML and prerender them too, so every
        // /blog/$slug reachable from the /blog index gets prerendered
        // without a hardcoded pages list.
        crawlLinks: true,

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
    react(),
  ],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});

export default config;
