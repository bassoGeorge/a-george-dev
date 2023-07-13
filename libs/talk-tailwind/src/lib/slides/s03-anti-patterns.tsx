import { Heading1, Heading2, PBody, PBodyMd } from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  PointSeperator,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { ArrowRight } from '@phosphor-icons/react';

export function S03AntiPatterns() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1 className="font-bold">
          Anti-patterns with Tailwind CSS
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={
          <Heading1>
            The <em>@apply</em>
          </Heading1>
        }
      >
        <div className="flex gap-7 items-start">
          <div className="flex flex-col gap-7">
            <CodeBlock
              text={applyAntiPatternSourceStyles}
              lang="css"
            ></CodeBlock>
            <CodeBlock text={applyAntiPatternHtml} lang="html"></CodeBlock>
          </div>
          <CodeBlock
            className="fragment"
            text={applyAntiPatternSourceComputedStyles}
            lang="css"
          ></CodeBlock>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={
          <Heading2>
            When to use <em>@apply</em>
          </Heading2>
        }
      >
        <PBodyMd>
          The <em>@apply</em> directive is not a convenience construct. It has
          repurcussions
        </PBodyMd>
        <PBodyMd className="font-bold text-cc-accent">Use sparingly</PBodyMd>
        <PointSeperator />
        <PBodyMd className="fragment">
          When writing complicated styles for psuedo selectors in one-off
          scenarios
        </PBodyMd>
        <PointSeperator />
        <PBodyMd className="fragment">
          Creating small highly re-usable classes <b>if</b> creating components
          or plugins not a great option
        </PBodyMd>
      </SlideTypeRegular>

      <SlideTypeRegular
        callout="Opinion"
        heading={<Heading1>Arbitrary value notation</Heading1>}
      >
        <div className="flex gap-6 items-start">
          <CodeBlock text={oneOffHtml} lang="html"></CodeBlock>
          <ArrowRight className="text-2xl text-cc-accent self-center" />
          <CodeBlock text={oneOffComputedCss} lang="css"></CodeBlock>
        </div>

        <PBody className="italic mt-7 fragment" data-fragment-index="0">
          But...
        </PBody>
        <CodeBlock
          className="fragment"
          data-fragment-index="0"
          text={oneOffBadHtml}
          lang="html"
          fontSize="large"
        ></CodeBlock>
      </SlideTypeRegular>
    </section>
  );
}

// Code blocks

const applyAntiPatternSourceStyles = `/* style.css */

.my-btn {
  @apply text-lg text-white bg-blue-600 transition-colors;
  @apply px-3 py-2 rounded;
}

.my-btn:hover {
  @apply bg-blue-900;
}`;

const applyAntiPatternSourceComputedStyles = `/* dist/style.css */

.my-btn {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
  font-size: 1.125rem;
  line-height: 1.75rem;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
}
.my-btn:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(30 58 138 / var(--tw-bg-opacity));
}`;

const applyAntiPatternHtml = `<!-- view.html -->

<button class="my-btn">Click Me!</button>`;

const oneOffHtml = `<div>
  <i class="fa-solid fa-magnifying-glass mt-[3px]"></i>
  <span>Search</span>
</div>`;

const oneOffComputedCss = `.mt-\\[3px\\] {
  margin-top: 3px;
}`;

const oneOffBadHtml = `<div class="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
  Oh my god, my eyes!!
</div>`;
