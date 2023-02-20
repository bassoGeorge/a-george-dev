/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? './server.js'
      : undefined,
  ignoredRouteFiles: [
    '**/.*',
    '**/*.@(spec|test|css|stories).+(ts|tsx|js|jsx)',
  ],
  serverBuildPath: '.netlify/functions-internal/server.js',
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",

  future: {
    unstable_tailwind: true,
    unstable_postcss: true,
    unstable_vanillaExtract: true,
  },
};
