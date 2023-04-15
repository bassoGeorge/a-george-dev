import { prisma } from './prisma.server';

export function getAllPosts() {
  return prisma.post.findMany(
    // { where: { status: 'draft' }}
    {
      select: {
        title: true,
        status: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    }
  );
}
