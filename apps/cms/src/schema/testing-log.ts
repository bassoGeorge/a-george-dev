import { ListSchemaConfig, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, timestamp } from '@keystone-6/core/fields';

/**
 * We use this table to try out and build our workflows. Should be nuked out soon
 */
export const testingLogSchema: ListSchemaConfig = {
  TestingLog: list({
    access: allowAll,
    fields: {
      title: text(),
      value: text(),
      date: timestamp(),
      colpa: text(),
      colpb: text(),
    },
  }),
};
