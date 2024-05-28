const createGlobPatterns =
  require('@nx/react/tailwind').createGlobPatternsForDependencies;

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
  serverDependenciesToBundle: [
    '@phosphor-icons/react',
    /^react-syntax-highlighter.*$/,
  ],

  watchPaths: createGlobPatterns(
    __dirname,
    '**/!(*.stories|*.spec)*.{ts,tsx,js,jsx}'
  ),

  tailwind: true,
  postcss: true,

  future: {
    v2_routeConvention: true,
    v2_errorBoundary: true,
    unstable_dev: true,
  },
};
