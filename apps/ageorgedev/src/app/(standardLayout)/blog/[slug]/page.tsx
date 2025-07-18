import { BodyMd, Heading1 } from '@ageorgedev/design-system';
import { map, pick } from 'ramda';
import { getPosts } from '../getPosts';

export async function generateStaticParams() {
  const allPosts = await getPosts();
  return map(pick(['slug']), allPosts);
}

async function getPost(slug: string) {
  const { default: MarkDown, frontmatter } = await import(
    `../../../../content/blogPosts/${slug}.mdx`
  );
  return {
    Post: MarkDown as React.ElementType,
    frontmatter: frontmatter as Record<string, string>,
  };
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { Post, frontmatter } = await getPost(params.slug);
  return (
    <div>
      <Heading1>{frontmatter.title}</Heading1>
      <BodyMd>{frontmatter.description}</BodyMd>

      <article>
        <Post />
      </article>
    </div>
  );
}
