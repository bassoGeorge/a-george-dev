import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

// import { mergeConfig } from 'vite'

const fileGlob = 'src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
const projects = ['foundation-styles', 'design-system']

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: [
    join(__dirname, '../stories/**/*.stories.@(js|jsx|tsx|mdx)'),
    ...projects.map((project) =>
      join(__dirname, '../../../packages/', project, fileGlob)
    ),
  ],
  addons: [
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  features: { backgrounds: false },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  // viteFinal: async (config) => {
  //   return mergeConfig(config, {
  //     resolve: {
  //       // Some weird bug with the storybook vite builder, so we need to alias the paths to the correct files instead of relying on the tsconfig
  //       alias: {
  //         '@ageorgedev/foundation-styles': resolve(
  //           __dirname,
  //           '../../../packages/foundation-styles/src/index.ts'
  //         ),
  //         '@ageorgedev/toolbelt': resolve(
  //           __dirname,
  //           '../../toolbelt/src/index.ts'
  //         ),
  //       },
  //     },
  //   })
  // },
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}
