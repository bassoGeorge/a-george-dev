import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const referrer = process.argv[2] ?? 'manual';

async function createHeartbeat() {
  const heartbeat = await prisma.heartbeat.create({
    data: {
      date: new Date(),
      referrer,
    },
  });
  console.log(`Created heartbeat with id: ${heartbeat.id}`);
}

createHeartbeat()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
