import {
  Heading1,
  Heading2,
  Heading3,
  PBodyLg,
  PBodyMd,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { ArrowRight } from '@phosphor-icons/react';

export function S04BCognitiveLoad() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          an important bit...
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Cognitive load with Tailwind
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={
          <Heading2>With tailwind you need to remember 2 syntaxes</Heading2>
        }
      >
        <div className="flex gap-7 items-center mb-7">
          <CodeBlock lang="css" text={imaginaryCSS}></CodeBlock>
          <ArrowRight className="text-2xl text-cc-accent" />
          <CodeBlock lang="html" text={imaginaryHTML}></CodeBlock>
        </div>
        <PBodyLg className="text-cc-danger fragment">
          We are adding mental steps to the development process
        </PBodyLg>
        <PBodyLg className="fragment">
          Things get more complicated with we have heavily customised the
          configuration
        </PBodyLg>
      </SlideTypeRegular>
    </section>
  );
}

const imaginaryCSS = `.imaginary-selector {

  color: hsl(83, 27%, 53%);
  font-weight: bold;
  text-decoration: underline;
  padding: 0.5rem;
  border: 1px solid hsl(83, 27%, 53%);
  display: flex;
  justify-content: center;

}`;

const imaginaryHTML = `<div class="text-primary-200 font-bold underline p-2 
  border border-primary-200 flex items-center">
  <!-- -->
</div>`;
