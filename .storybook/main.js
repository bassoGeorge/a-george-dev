import { mergeConfig } from 'vite';

/**
 *
 * @param {Object} options
 * @param {string} options.projectPath - Path of the given project
 */
export default function buildStorybookMain(options) {
  return {
    stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials'],
    framework: {
      name: '@storybook/react-vite',
      options: {
        builder: {
          viteConfigPath: `${options.projectPath}/vite.config.ts`,
        },
      },
    },
  };
}
