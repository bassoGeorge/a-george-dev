import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function userPostSeed() {
  return prisma.user.upsert({
    where: { email: 'tu@test.com' },
    update: {},
    create: {
      email: 'tu@test.com',
      name: 'Test User',
      posts: {
        create: [
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
        ],
      },
    },
  });
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
