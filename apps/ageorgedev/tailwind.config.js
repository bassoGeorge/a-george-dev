/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

const fileGlob = '**/!(*.stories|*.spec)*.{ts,tsx,js,jsx}';

module.exports = {
  presets: [require('@ageorgedev/foundation-styles/tailwind')],
  content: [
    join(__dirname, './app/', fileGlob),
    ...createGlobPatternsForDependencies(__dirname, fileGlob),
  ],
  plugins: [],
};
