import {
  Heading1,
  Heading2,
  Heading3,
  Interface2Xl,
  InterfaceXl,
  PBody,
  PBodyXs,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S07DarkAndLight() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #4
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
