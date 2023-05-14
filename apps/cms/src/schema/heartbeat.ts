import { ListSchemaConfig, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, timestamp } from '@keystone-6/core/fields';

/**
 * A hearbeat table to which we periodically write to ensure the database is up
 */
export const hearbeatSchema: ListSchemaConfig = {
  Heartbeat: list({
    access: allowAll,
    fields: {
      date: timestamp(),
      referrer: text(),
    },
  }),
};
