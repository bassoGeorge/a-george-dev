const { join } = require('path');

const fileGlob = 'src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)';
const projects = ['atoms', 'molecules', 'foundation-styles'];

const config = {
  stories: [
    join(__dirname, fileGlob),
    ...projects.map((project) => join(__dirname, '../../', project, fileGlob)),
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'libs/design-system/vite.config.ts',
      },
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
