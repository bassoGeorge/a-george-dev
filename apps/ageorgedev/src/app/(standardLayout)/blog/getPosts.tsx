type PostShort = {
  title: string;
  description: string;
  slug: string;
};

export async function getPosts(): Promise<PostShort[]> {
  return [
    {
      title: 'Testing',
      description: 'Blah',
      slug: 'a-brave-new-world',
    },
    {
      title: 'Serenity',
      description: 'Blah2',
      slug: 'serenity',
    },
  ];
}
