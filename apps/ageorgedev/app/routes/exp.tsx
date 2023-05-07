import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getAllPosts } from '../server/posts.server';
import { useLoaderData } from '@remix-run/react';

export async function loader(args: LoaderArgs) {
  const posts = await getAllPosts();
  return json({ posts });
}

export default function Exp() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <>
      <h3 className="text-4xl mb-3">Running Experiments</h3>
      <p>
        Here is a change that will affect the site. V2 for checking the new
        production flow with Deploy Requests. No DR required this time
      </p>
      {posts.map((post) => (
        <div key={post.id} className="mt-3">
          <h3>{post.title}</h3>
          <p>Status: {post.status}</p>
          <p>Author: {post.author?.name}</p>
        </div>
      ))}
    </>
  );
}
