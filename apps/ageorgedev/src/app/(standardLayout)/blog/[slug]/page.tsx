export async function generateStaticParams() {
  return [{ slug: 'first-one' }, { slug: 'second-try' }];
}

async function getPost(slug: string) {
  const { react: MarkDown } = await import(
    `../../../../content/blogPosts/${slug}.md`
  );
  return MarkDown as React.ElementType;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const Post = await getPost(params.slug);
  return (
    <div>
      Trying for Post
      <article>
        <Post />
      </article>
    </div>
  );
}
