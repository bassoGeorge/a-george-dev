import { createRequire } from 'node:module';
import { join, resolve, dirname } from 'path';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const require = createRequire(import.meta.url);

const fileGlob = 'src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)';
const projects = ['atoms', 'foundation-styles'];

const config: StorybookConfig = {
  stories: [
    join(__dirname, '../', fileGlob),
    ...projects.map((project) => join(__dirname, '../../', project, fileGlob)),
  ],
  addons: [
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  features: { backgrounds: false },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      builder: {
        viteConfigPath: 'libs/design-system/vite.config.ts',
      },
    },
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        // Some weird bug with the storybook vite builder, so we need to alias the paths to the correct files instead of relying on the tsconfig
        // only happens for stories within this project
        alias: {
          '@ageorgedev/foundation-styles': resolve(
            __dirname,
            '../../foundation-styles/src/index.ts'
          ),
        },
      },
    });
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
