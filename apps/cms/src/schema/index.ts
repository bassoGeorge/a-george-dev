import { ListSchemaConfig } from '@keystone-6/core';
import { hearbeatSchema } from './heartbeat';
import { postSchema } from './post';
import { testingLogSchema } from './testing-log';

export const ALL_LISTS: ListSchemaConfig = {
  ...postSchema,
  ...hearbeatSchema,
  ...testingLogSchema,
};
