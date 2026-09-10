import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard';
import {
  Body,
  BodyXl,
  Heading1,
  Heading2,
} from '@ageorgedev/design-system/typography/typography-components';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getAllPosts } from '../../content/posts';

export const Route = createFileRoute('/_public/blog/')({
  component: RouteComponent,
});

function RouteComponent() {
  const posts = getAllPosts();

  return (
    <div className="px-4 py-6">
      <Heading1 className="text-neutral-strong text-center font-bold">
        Blog
      </Heading1>
      <div className="mx-auto mt-6 flex max-w-5xl flex-col gap-3">
        {posts.map((post) => (
          <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }}>
            <TiltCard
              interactive={true}
              shape="trapRight"
              className="bg-page-2"
            >
              <Heading2 className="text-neutral-strong">
                {post.frontmatter.title}
              </Heading2>
              <BodyXl className="mt-2">{post.frontmatter.description}</BodyXl>
              <Body className="text-neutral-subdued mt-5 text-right">
                <em>{post.frontmatter.date}</em>
              </Body>
            </TiltCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
