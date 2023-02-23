/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../dist/libs/foundation-styles/tailwind')],
  content: [
    // For some reason, storybook+tailwind needs a fully qualified glob pattern while the apps don't.
    join(__dirname, './src/**/*.{ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(
      join(__dirname, 'src/**/*.{ts,tsx,js,jsx}')
    ),
    // ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    fontFamily: {
      sans: ['Alegreya Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sc: ['Alegreya Sans SC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['Alegreya', 'ui-serif', 'serif'],
    },
  },
  plugins: [],
};
