import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function userPostSeed() {
  const posts = [
    {
      title: 'First Testing Post',
      publishedAt: new Date('2023-01-01'),
      status: 'published',
    },
    {
      title: 'Second Testing Post',
      publishedAt: new Date('2023-01-02'),
      status: 'published',
    },
    {
      title: 'Draft Testing Post',
      status: 'draft',
    },
  ];

  return Promise.all(
    posts.map((post) =>
      prisma.post.upsert({
        where: { title: post.title },
        update: {},
        create: post,
      })
    )
  );
}

export async function seedDatabase() {
  await userPostSeed();
}

seedDatabase()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
