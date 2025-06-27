import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyLg,
  PBodyMd,
} from '@ageorgedev/design-system';
import { CodeBlock } from '@ageorgedev/design-system';
import {
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { ArrowRightIcon } from '@phosphor-icons/react';

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
        <div className="mb-7 flex items-center gap-7">
          <CodeBlock lang="css" text={imaginaryCSS}></CodeBlock>
          <ArrowRightIcon className="text-2xl text-accent" />
          <CodeBlock lang="html" text={imaginaryHTML}></CodeBlock>
        </div>
        <PBodyLg className="text-danger">
          We are adding mental steps to the development process
        </PBodyLg>
        <PBodyLg>
          Things get more complicated if we have heavily customised the
          configuration
        </PBodyLg>
      </SlideTypeRegular>
      <SlideTypeCenter>
        <Heading2>How do we deal with this?</Heading2>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading2>Step 1/2: Create components!</Heading2>
        <PBodyMd>
          This reduces the amount of Tailwind most developers need to work on
        </PBodyMd>
        <PBodyMd>
          If you have a strong enough design system with components, most devs
          only need to learn the layout classes in Tailwind
        </PBodyMd>
      </SlideTypeCenter>

      <SlideTypeCenter>
        <Heading2>Step 2/2: Solid documentation through Storybook</Heading2>
        <PBodyMd>
          A heavily customised config makes the Tailwind docs partially useless
        </PBodyMd>
        <PBodyMd>
          Use Storybook to create documentation which allows devs to peruse and
          disover the design tokens available
        </PBodyMd>
        <PBody className="italic">Let me show you what I mean...</PBody>
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
