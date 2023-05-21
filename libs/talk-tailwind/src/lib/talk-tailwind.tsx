import { Body, Heading1 } from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import { useRevealFramework } from '@ageorgedev/reveal-framework';

const codePiece = `
/**
 * Converts a string into param-case / kebab-case
 * Used for generating css class names
 * The paramCase function strips out some extraneous characters, we don't want
 * to do that for our utils, thus we have this wrapper
 */
export const cssCase = (input: string) =>
  paramCase(input, {
    stripRegexp: /(?!)/, // This regex matches absolutely nothing
  });

/**
 * Joins a list of strings into a kebab-cased string used for class names
 * example: ['type', 'headingXl', '', '4'] => 'type-heading-xl-4'
 */
export const joinCssClassParts: (parts: string[]) => string = compose(
  join('-'),
  map(cssCase),
  filter(Boolean)
);

`;

export function TalkTailwind() {
  useRevealFramework();

  return (
    <div>
      <div className="reveal w-full h-screen">
        <div className="slides">
          <section>
            <Heading1>Welcome to The Tailwind Talk</Heading1>
            <Body>Just a testing slide for now</Body>
          </section>
          <section>
            <Heading1>Slide 2</Heading1>
            <CodeBlock text={codePiece} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default TalkTailwind;
