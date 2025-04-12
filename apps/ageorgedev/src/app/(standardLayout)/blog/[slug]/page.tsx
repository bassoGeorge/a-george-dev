import { BodyMd, Heading1 } from '@ageorgedev/atoms';

// TODO
export async function generateStaticParams() {
  return [{ slug: 'a-brave-new-world' }, { slug: 'serenity' }];
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

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
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
