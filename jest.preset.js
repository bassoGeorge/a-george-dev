// const nxPreset = require('@nx/jest/preset').default
const path = require('node:path')

module.exports = {
  setupFilesAfterEnv: [path.join(__dirname, '/jest-setup.tsx')],
}
