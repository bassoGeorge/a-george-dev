/** @type {import("tailwindcss").Config} */
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    ...createGlobPatternsForDependencies(
      join(__dirname, 'src/**/*.{ts,tsx,js,jsx}')
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
