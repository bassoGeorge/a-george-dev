import { Heading3 } from '@ageorgedev/atoms';
import { RichText } from '@ageorgedev/molecules';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllPosts, getPostByTitle } from '../server/posts.server';

export async function loader(args: LoaderArgs) {
  const posts = await getAllPosts();
  const contentPost = await getPostByTitle('First blog content');
  return json({ posts, contentPost });
}

export default function Exp() {
  const { posts, contentPost } = useLoaderData<typeof loader>();
  const documentContent = contentPost?.content;

  return (
    <>
      <Heading3 className="mb-3">Running Experiments</Heading3>
      <p>
        Here is a change that will affect the site. V2 for checking the new
        production flow with Deploy Requests. No DR required this time. v3 now
      </p>
      {posts.map((post) => (
        <div key={post.id} className="mt-3">
          <h3>{post.title}</h3>
          <p>Status: {post.status}</p>
        </div>
      ))}

      <Heading3 className="mt-5">Going to render a test blog post</Heading3>

      <div className="px-4">
        {documentContent && <RichText content={documentContent} />}
      </div>
    </>
  );
}
