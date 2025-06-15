const { join, resolve } = require('path');
const { mergeConfig } = require('vite');

const fileGlob = 'src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)';
const projects = ['atoms', 'molecules', 'foundation-styles'];

const config = {
  stories: [
    join(__dirname, '../', fileGlob),
    ...projects.map((project) => join(__dirname, '../../', project, fileGlob)),
  ],
  addons: [
    { name: '@storybook/addon-essentials', options: { backgrounds: false } },
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
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
          '@ageorgedev/atoms': resolve(__dirname, '../../atoms/src/index.ts'),
          '@ageorgedev/foundation-styles': resolve(
            __dirname,
            '../../foundation-styles/src/index.ts'
          ),
          '@ageorgedev/molecules': resolve(
            __dirname,
            '../../molecules/src/index.ts'
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
