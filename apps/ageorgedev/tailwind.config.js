/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../dist/libs/foundation-styles/tailwind')],
  content: [
    join(__dirname, './app/**/*.{ts,tsx,js,jsx}'), // just for consistency for now
    ...createGlobPatternsForDependencies(
      join(__dirname, 'src/**/*.{ts,tsx,js,jsx}')
    ),
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
