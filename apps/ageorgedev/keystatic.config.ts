import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blogPosts: collection({
      label: 'Blog Posts',
      path: 'src/content/blogPosts/*',
      slugField: 'title',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Date',
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        // Custom components must be registered here (schema + shape) before
        // use in a post's body — never hand-write an unregistered component
        // tag into a post that will be opened in this admin UI. Keystatic's
        // mdx editor errors or crashes on tags it doesn't recognize.
        // See design.md (Decision 1 / Risk 2).
        body: fields.mdx({
          label: 'Body',
          components: {},
        }),
      },
    }),
  },
});
