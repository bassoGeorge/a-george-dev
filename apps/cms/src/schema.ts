import { KeystoneConfig } from '@keystone-6/core/types';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, select, text, timestamp } from '@keystone-6/core/fields';

export const ALL_LISTS: KeystoneConfig['lists'] = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
    },
  }),
  Post: list({
    access: allowAll,
    fields: {
      title: text(),
      author: relationship({
        ref: 'User.posts',
        // ui: {
        //   displayMode: 'cards',
        //   cardFields: ['name', 'email'],
        //   inlineEdit: { fields: ['name', 'email'] },
        //   linkToItem: true,
        //   inlineCreate: { fields: ['name', 'email'] },
        // },
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
    },
  }),
  TestingLog: list({
    access: allowAll,
    fields: {
      title: text(),
      value: text(),
      date: timestamp(),
    },
  }),
};
