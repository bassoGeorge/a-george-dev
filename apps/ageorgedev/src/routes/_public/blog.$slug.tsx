import {
  Body,
  Heading1,
} from '@ageorgedev/design-system/typography/typography-components';
import { MDXProvider } from '@mdx-js/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { mdxComponents } from '../../components/mdx';
import { getPostBySlug } from '../../content/posts';

export const Route = createFileRoute('/_public/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }
    // Only serializable data crosses the server/client loader boundary —
    // the MDX component itself is looked up again locally in the render
    // function below, on whichever side is rendering.
    return { frontmatter: post.frontmatter };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { frontmatter } = Route.useLoaderData();
  const post = getPostBySlug(slug);
  if (!post) {
    // The loader already threw notFound() for this case; this satisfies
    // the type checker without a non-null assertion.
    throw notFound();
  }
  const { Content } = post;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Heading1 className="text-neutral-strong font-bold">
        {frontmatter.title}
      </Heading1>
      <Body className="text-neutral-subdued mt-2">
        <em>{frontmatter.date}</em>
      </Body>
      <div className="prose mt-6">
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
      </div>
    </div>
  );
}
