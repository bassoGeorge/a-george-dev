/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const fileGlob = '**/!(*.spec)*.{ts,tsx,js,jsx}';

module.exports = {
  presets: [require('@ageorgedev/foundation-styles/tailwind')],
  content: [
    join(__dirname, './src/', fileGlob),
    ...createGlobPatternsForDependencies(__dirname, fileGlob),
  ],
  plugins: [],
};
