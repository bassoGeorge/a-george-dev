import { prisma } from '../../prisma-client';
import { createHeartbeat } from './heartbeat';

const referrer = process.argv[2] ?? 'manual';

createHeartbeat(referrer)
  .then((heartbeat) =>
    console.log(`Created heartbeat with id: ${heartbeat.id}`)
  )
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
