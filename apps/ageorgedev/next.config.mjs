import { composePlugins, withNx } from '@nx/next';
import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

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
    optimizePackageImports: ['@ageorgedev/design-system'],
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

export default composePlugins(...plugins)(nextConfig);
