/** @type {import("tailwindcss").Config} */

const generatedPreset = require('./libs/foundation-styles/generated-src/tailwind-preset.json');

module.exports = {
  presets: [generatedPreset],
};
