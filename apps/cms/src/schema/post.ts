import { ListSchemaConfig, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, timestamp, select } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const postSchema: ListSchemaConfig = {
  Post: list({
    access: allowAll,
    fields: {
      title: text({
        isIndexed: 'unique',
      }),
      publishedAt: timestamp(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
    },
  }),
};
