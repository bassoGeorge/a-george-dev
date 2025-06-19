const { composePlugins, withNx } = require('@nx/next');
const createMDX = require('@next/mdx');
const remarkFrontmatter = require('remark-frontmatter');
const remarkMdxFrontmatter = require('remark-mdx-frontmatter');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    optimizePackageImports: [
      '@ageorgedev/design-system',
      '@phosphor-icons/react',
    ],
  },
};

const withMdx = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withMdx,
];

module.exports = composePlugins(...plugins)(nextConfig);
