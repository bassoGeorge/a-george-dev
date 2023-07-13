import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
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
      <SlideTypeCenter>
        <Heading2>How do we deal with this?</Heading2>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading2>Step 1/2: Create components!</Heading2>
        <PBody>
          This reduces the amount of Tailwind most developers need to work on
        </PBody>
        <PBody>
          If you have a strong enough design system with components, most devs
          only need to learn the layout classes in Tailwind
        </PBody>
      </SlideTypeCenter>

      <SlideTypeCenter>
        <Heading2>Step 2/2: Solid documentation through Storybook</Heading2>
        <PBody>
          A heavily customised config makes the Tailwind docs partially useless
        </PBody>
        <PBody>
          Use Storybook to create documentation which allows devs to peruse and
          disover the design tokens available
        </PBody>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading2>Not a silver bullet</Heading2>
        <PBodyMd>Over time, devs adapt to it, but the cost is present</PBodyMd>
      </SlideTypeCenter>
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
