import {
  Heading1,
  Heading2,
  Heading3,
  Interface2Xl,
  InterfaceXl,
  PBodyLg,
  PBodyXs,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { Warning } from '@phosphor-icons/react';

export function S08DarkMode() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #5
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Dark mode
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular heading={<Heading2>Full Tailwind support</Heading2>}>
        <div className="flex items-start gap-7">
          <CodeBlock
            fontSize="large"
            lang="javascript"
            text={darkModeConfig}
          ></CodeBlock>
          <CodeBlock
            fontSize="large"
            className="fragment"
            lang="html"
            text={darkModeHtml}
          ></CodeBlock>
        </div>
        <CodeBlock
          fontSize="large"
          className="fragment"
          lang="html"
          text={darkModeBasicUsage}
        ></CodeBlock>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>We can do better</Heading2>}>
        <div className="flex items-start gap-7">
          <div>
            <Interface2Xl as="p" className="mb-7">
              Raw Colors
            </Interface2Xl>
            <div className="grid grid-cols-3 gap-6 items-center justify-end">
              <PBodyXs>Parchment</PBodyXs>
              <Swatch className="bg-rc-parchment-200" />
              <Swatch className="bg-rc-parchment-500" />

              <PBodyXs>Timber</PBodyXs>
              <Swatch className="bg-rc-timber-100" />
              <Swatch className="bg-rc-timber-300" />

              <PBodyXs>Accent</PBodyXs>
              <Swatch className="bg-rc-p-accent-300" />
              <Swatch className="bg-rc-p-accent-500" />

              <PBodyXs>Neutral</PBodyXs>
              <Swatch className="bg-cc-neutral dark:bg-cc-neutral-inverse" />
              <Swatch className="dark:bg-cc-neutral bg-cc-neutral-inverse" />
            </div>
          </div>
          <div
            className="w-px self-stretch bg-cc-line fragment"
            data-fragment-index="0"
          ></div>
          <div className="fragment" data-fragment-index="0">
            <Interface2Xl as="p" className="mb-7">
              Contextual Colors
            </Interface2Xl>

            <InterfaceXl as="p" className="mb-5 text-left">
              Light Mode
            </InterfaceXl>

            <div className="flex gap-6">
              <div>
                <Swatch className="bg-rc-parchment-500" />
                <PBodyXs className="mt-2">Page far</PBodyXs>
              </div>
              <div>
                <Swatch className="bg-rc-parchment-200" />
                <PBodyXs className="mt-2">Page near</PBodyXs>
              </div>
              <div>
                <Swatch className="bg-rc-p-accent-500" />
                <PBodyXs className="mt-2">Accent</PBodyXs>
              </div>
              <div>
                <Swatch className="bg-cc-neutral dark:bg-cc-neutral-inverse" />
                <PBodyXs className="mt-2">Neutral text</PBodyXs>
              </div>
              <div>
                <Swatch className="dark:bg-cc-neutral bg-cc-neutral-inverse" />
                <PBodyXs className="mt-2">Inverse text</PBodyXs>
              </div>
            </div>

            <InterfaceXl
              as="p"
              className="mb-5 mt-7 text-left fragment"
              data-fragment-index="1"
            >
              Dark Mode
            </InterfaceXl>

            <div className="flex gap-6 fragment" data-fragment-index="1">
              <div>
                <Swatch className="bg-rc-timber-300" />
                <PBodyXs className="mt-2">Page far</PBodyXs>
              </div>
              <div>
                <Swatch className="bg-rc-timber-100" />
                <PBodyXs className="mt-2">Page near</PBodyXs>
              </div>
              <div>
                <Swatch className="bg-rc-p-accent-300" />
                <PBodyXs className="mt-2">Accent</PBodyXs>
              </div>
              <div>
                <Swatch className="dark:bg-cc-neutral bg-cc-neutral-inverse" />
                <PBodyXs className="mt-2">Neutral text</PBodyXs>
              </div>
              <div>
                <Swatch className="bg-cc-neutral dark:bg-cc-neutral-inverse" />
                <PBodyXs className="mt-2">Inverse text</PBodyXs>
              </div>
            </div>
          </div>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>All together now...</Heading2>}>
        <div className="flex items-start gap-7">
          <CodeBlock lang="css" text={rawColorsRoot} />
          <div className="flex flex-col gap-7 items-start">
            <CodeBlock lang="css" text={contextualColorsRootLight} />
            <CodeBlock lang="css" text={contextualColorsRootDark} />
          </div>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>and a straightforward Tailwind config</Heading2>}
      >
        <div className="flex items-start gap-7">
          <CodeBlock lang="css" text={contextualColorsTailwindConfig} />
          <CodeBlock lang="html" text={contextualColorsUsage} />
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={
          <Heading2>
            <span className="underline">The biggest problem</span> with Tailwind
          </Heading2>
        }
      >
        <PBodyLg className="text-cc-danger italic">
          <Warning className="inline-block -mt-2" /> It allows all combinations!
        </PBodyLg>
        <CodeBlock
          fontSize="large"
          lang="html"
          text={contextualColorsProblem}
        />
      </SlideTypeRegular>
      <SlideTypeCenter callout="Opinion">
        <Heading3 as="h1" className="italic">
          a final word on colors
        </Heading3>
        <Heading2>
          If it gets any more complicated, don't use Tailwind's color system
        </Heading2>
      </SlideTypeCenter>
    </section>
  );
}

function Swatch({ className }: { className?: string }) {
  return (
    <div
      className={`${className} w-10 h-9 rounded border border-cc-line`}
    ></div>
  );
}

// Code blocks
const darkModeConfig = `/* tailwind.config.js */
export default {
  darkMode: 'class'
  // ... rest of the config
}`;

const darkModeHtml = `<html class="dark">
<!-- ... -->
</html>`;

const darkModeBasicUsage = `<button class="bg-primary-100 dark:bg-primary-800 dark:text-white">
  Click me
</button>`;

const rawColorsRoot = `:root {
  --rc-parchment-500: hsl(39 100% 89%);
  --rc-timber-300: hsl(189, 31%, 13%);

  --rc-p-accent-300: hsl(83 27% 53%);
  --rc-p-accent-500: hsl(83 49% 30%);

  --rc-d-neutral-500: hsl(189 67% 6%);
  --rc-l-neutral-500: hsl(45 100% 99%);
}`;

const contextualColorsRootLight = `:root {
  --cc-page-far: var(--rc-parchment-500);
  --cc-accent: var(--rc-p-accent-500);
  --cc-neutral: var(--rc-d-neutral-500);
  --cc-neutral-inverse: var(--rc-l-neutral-500);
}`;

const contextualColorsRootDark = `:root.dark {
  --cc-page-far: var(--rc-timber-300);
  --cc-accent: var(--rc-p-accent-300);
  --cc-neutral: var(--rc-l-neutral-500);
  --cc-neutral-inverse: var(--rc-d-neutral-500);
}`;

const contextualColorsTailwindConfig = `/* tailwind.config.js */

export default {
  theme: {
    colors: {
      'cc-page-far': 'var(--cc-page-far)',
      'cc-accent': 'var(--cc-accent)',
      'cc-neutral': 'var(--cc-neutral)',
      //... others
    }
  }
}`;

const contextualColorsUsage = `<section class="bg-cc-page-far text-cc-neutral">
  <button class="bg-cc-accent">Click me</button>
</section>`;

const contextualColorsProblem = `<button class="text-cc-page-far">Click me</button>
<div class="bg-cc-neutral">
  <!-- other stuff -->
</div>`;
