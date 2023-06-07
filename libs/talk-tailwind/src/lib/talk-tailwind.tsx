import {
  Body,
  BodyLg,
  BodyMd,
  Heading1,
  Heading3,
  TwLogo,
} from '@ageorgedev/atoms';
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
    <div className="reveal w-full h-full" ref={presentationRef}>
      <div className="slides">
        <section>
          <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
          <BodyLg className="mt-5">Advanced strategies for production</BodyLg>

          <footer className="flex justify-center gap-2 h-5 mt-10">
            <TwLogo />
          </footer>
        </section>
        <section>
          <Heading1>Slide 2</Heading1>
        </section>
      </div>
    </div>
  );
}

export default TalkTailwind;
