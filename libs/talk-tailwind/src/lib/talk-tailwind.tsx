import { Body, Heading1 } from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import { useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';

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
`;

const secondCodePiece = `
export const getTailwindPropertyMap = compose(
  fromPairs,
  chain((set: Record<string, string>): (readonly [string, string])[] => {
    return compose(
      map((value: string) => [extractTailwindVarKey(value), value] as const),
      values
    )(set);
  }),
  values
);
`;

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <div>
      <div className="reveal w-full h-screen" ref={presentationRef}>
        <div className="slides">
          <section>
            <Heading1>Welcome to The Tailwind Talk</Heading1>
            <Body>Just a testing slide for now</Body>
            <CodeBlock text={codePiece} />
            <hr />
            <CodeBlock text={secondCodePiece} />
          </section>
          <section>
            <Heading1>Slide 2</Heading1>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TalkTailwind;
