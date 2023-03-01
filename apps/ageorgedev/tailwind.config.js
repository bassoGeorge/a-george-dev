/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('@ageorgedev/foundation-styles/tailwind')],
  content: [
    join(__dirname, './app/**/*.{ts,tsx,js,jsx}'), // just for consistency for now
    ...createGlobPatternsForDependencies(
      join(__dirname, 'src/**/*.{ts,tsx,js,jsx}')
    ),
  ],
  plugins: [],
};
