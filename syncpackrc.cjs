// .syncpackrc.cjs
/** @type {import("syncpack").RcFile} */
const config = {
  source: ['package.json', 'apps/*/package.json', 'packages/*/package.json'],

  // Enforce exact versions everywhere (no ^ or ~ drift)
  semverGroups: [
    {
      label: 'pin all deps to exact versions',
      range: '',
      dependencies: ['**'],
      packages: ['**'],
    },
  ],

  versionGroups: [
    // 1. Internal workspace packages must use workspace:* protocol
    {
      label: 'internal workspace packages',
      dependencies: ['@ageorgedev/*'],
      dependencyTypes: ['!local'],
      pinVersion: 'workspace:*',
    },

    // 2. Catch-all: all deps must be the same version across the repo
    {
      label: 'same version everywhere',
      dependencies: ['**'],
      packages: ['**'],
    },
  ],
}

module.exports = config
