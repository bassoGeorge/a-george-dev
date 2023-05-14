import { Heading1, Heading2, Heading3 } from '@ageorgedev/atoms';
import {
  DocumentRenderer,
  DocumentRendererProps,
} from '@keystone-6/document-renderer';

// Proof of concept, need to finish the renderers

const renderers: DocumentRendererProps['renderers'] = {
  block: {
    heading: ({ children, level }) => {
      switch (level) {
        case 1:
          return <Heading1>{children}</Heading1>;
        case 2:
          return <Heading2>{children}</Heading2>;
        default:
          return <Heading3>{children}</Heading3>;
      }
    },
  },
};

export function RichText({ content }: { content: unknown }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DocumentRenderer document={content as any} renderers={renderers} />;
}
