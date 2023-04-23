import { config } from '@keystone-6/core';
import { ALL_LISTS } from './src/schema';

export default config({
  db: {
    provider: 'mysql',
    url: process.env.CMS_DB_CONNECTION_STRING,
    additionalPrismaDatasourceProperties: {
      relationMode: 'prisma',
    },
    extendPrismaSchema: (schema) => {
      return schema.replace(
        '"prisma-client-js"',
        `"prisma-client-js"\nbinaryTargets = ["native"]`
      );
    },
  },
  server: {
    port: 3001,
  },
  lists: ALL_LISTS,
});
