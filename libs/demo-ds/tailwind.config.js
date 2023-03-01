/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind-preset')],
  content: [
    // For some reason, storybook+tailwind needs a fully qualified glob pattern while the apps don't.
    join(__dirname, './src/**/*.{ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(
      join(__dirname, 'src/**/*.{ts,tsx,js,jsx}')
    ),
    // ...createGlobPatternsForDependencies(__dirname)
  ],
  plugins: [],
};
