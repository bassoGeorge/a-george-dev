import type { MDXComponents } from 'mdx/types';
import { Heading1, Heading2, Heading3 } from '@ageorgedev/atoms';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
  };
}
