import { prisma } from '../../prisma-client';

export async function createHeartbeat(referrer: string) {
  return prisma.heartbeat.create({
    data: {
      date: new Date(),
      referrer,
    },
  });
}
