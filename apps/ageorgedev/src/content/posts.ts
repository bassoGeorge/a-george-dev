import type { ComponentType } from 'react';

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  Content: ComponentType;
}

const modules = import.meta.glob<{
  default: ComponentType;
  frontmatter: BlogPostFrontmatter;
}>('/src/content/blogPosts/*.mdx', { eager: true });

const allPosts: BlogPost[] = Object.entries(modules).map(([path, mod]) => {
  const fileName = path.split('/').at(-1) ?? path;
  return {
    slug: fileName.replace(/\.mdx$/, ''),
    frontmatter: mod.frontmatter,
    Content: mod.default,
  };
});

export function getAllPosts(): BlogPost[] {
  return [...allPosts]
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}
