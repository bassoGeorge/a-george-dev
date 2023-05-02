import { config } from '@keystone-6/core';
import { ALL_LISTS } from './src/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('The DATABASE_URL environment variable must be set');
}

export default config({
  db: {
    provider: 'mysql',
    url: process.env.DATABASE_URL,
    additionalPrismaDatasourceProperties: {
      relationMode: 'prisma',
    },
    extendPrismaSchema: (schema) => {
      return schema.replace(
        '"prisma-client-js"',
        `"prisma-client-js"\nbinaryTargets = ["native", "rhel-openssl-1.0.x"]`
      );
    },
  },
  server: {
    port: 3001,
  },
  lists: ALL_LISTS,
});
