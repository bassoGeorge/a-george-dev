import { Heading1, Heading3, PBody, PBodyMd } from '@ageorgedev/design-system';
import { CodeBlock } from '@ageorgedev/design-system';
import {
  ComparisonRow,
  ImportantNote,
  SlideMediaRow,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { D01TailwindFilesize } from '../diagrams/D01TailwindFilesize';

export function S02Fundamentals() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1 className="font-bold">Fundamentals of Tailwind</Heading1>
        <PBody>The quick version</PBody>
      </SlideTypeCenter>

      <SlideTypeRegular
        heading={<Heading1>Utility first fundamentals</Heading1>}
      >
        <div className="flex items-start gap-7">
          <div className="flex flex-col items-end justify-start gap-7">
            <CodeBlock text={simpleButtonTailwind} lang="html"></CodeBlock>
            <PBody>
              Each class basically maps to a single css property-value pair
            </PBody>
            <PBody>Lots of css classes needed</PBody>
          </div>
          <CodeBlock text={simpleButtonComputedStyles} lang="css"></CodeBlock>
        </div>
      </SlideTypeRegular>

      <SlideTypeRegular
        heading={<Heading1>How does Tailwind compare?</Heading1>}
      >
        <ComparisonRow
          left={
            <>
              <Heading3>A typical CSS framework</Heading3>
              <CodeBlock
                text={simpleButtonTraditional}
                lang="html"
                className="fragment mb-7"
                data-fragment-index="1"
              />
              <PBody className="fragment" data-fragment-index="3">
                Individual classes encapsulate full sets of styles
              </PBody>
              <PBody className="fragment" data-fragment-index="4">
                Need both HTML and CSS to author the UI
              </PBody>
              <PBody className="fragment" data-fragment-index="5">
                Clean HTML
              </PBody>
              <PBody className="fragment" data-fragment-index="6">
                Styles hidden away
              </PBody>
              <PBody className="fragment" data-fragment-index="7">
                Only layout based CSS skills needed
              </PBody>
            </>
          }
          right={
            <>
              <Heading3>Tailwind CSS</Heading3>
              <CodeBlock
                text={simpleButtonTailwind}
                lang="html"
                className="fragment mb-7"
                data-fragment-index="2"
              />
              <PBody className="fragment" data-fragment-index="3">
                Classes are atomic. Each describes a specific CSS property-value
                pair
              </PBody>
              <PBody className="fragment" data-fragment-index="4">
                HTML becomes the authoring language
              </PBody>
              <PBody
                className="fragment text-destructive-foreground"
                data-fragment-index="5"
              >
                HTML overloaded with styling
              </PBody>
              <PBody className="fragment" data-fragment-index="6">
                Styles co-located with markup
              </PBody>
              <PBody
                className="fragment text-primary-foreground"
                data-fragment-index="7"
              >
                CSS skills required. It is just a one-to-one mapping of CSS
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>

      <SlideTypeRegular
        heading={<Heading1>Finite values through configuration</Heading1>}
      >
        <div className="flex items-start gap-7">
          <CodeBlock text={tailwindConfigFile} lang="javascript"></CodeBlock>
          <div className="flex flex-col items-start gap-7">
            <CodeBlock text={configDerivedHtml} lang="html"></CodeBlock>
            <ImportantNote className="fragment" shape="triUpperRight">
              <PBodyMd>
                These are foundations of a <em>design system</em>
              </PBodyMd>
              <PBody className="mt-3">
                <b>Talk to your designer</b> to fill this config!
              </PBody>
            </ImportantNote>
          </div>
        </div>
      </SlideTypeRegular>

      <SlideTypeRegular
        heading={
          <Heading1>Tailwind only generates the minimum CSS required</Heading1>
        }
      >
        <div className="flex flex-col items-center gap-7">
          <div className="flex items-start gap-7">
            <CodeBlock text={exampleHtml} lang="html"></CodeBlock>
            <CodeBlock text={sourceStyleFile} lang="css"></CodeBlock>
          </div>
          <div className="flex items-start gap-7">
            <CodeBlock
              text={computedStyleFile}
              lang="css"
              className="fragment"
            ></CodeBlock>
            <ImportantNote shape="triUpperRight">
              <PBody>PostCSS magic</PBody>
            </ImportantNote>
          </div>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading1>CSS file size stays to a minimum</Heading1>}
      >
        <SlideMediaRow>
          <D01TailwindFilesize />
        </SlideMediaRow>
        <PBody className="mt-7">
          The built css file gets the same hash if no new classes are used. This
          means it gets cached by the user's browser!
        </PBody>
      </SlideTypeRegular>
      <SlideTypeCenter>
        <Heading3>And that was the quick version!</Heading3>
        <PBody>
          Visit{' '}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            className="text-secondary-foreground"
            rel="noreferrer"
          >
            https://tailwindcss.com
          </a>{' '}
          to learn more.
        </PBody>
      </SlideTypeCenter>
    </section>
  );
}

// Code snippets

const simpleButtonTraditional = `<button class="btn btn-primary">
  Cick Me!
</button>
`;

const simpleButtonTailwind = `<button class="text-white text-lg bg-blue hover:bg-grey
    rounded px-2 mb-2">
  Click Me!
</button>`;

const simpleButtonComputedStyles = `.text-white { color: white; }

.text-lg { font-size: 1.25rem; }

.bg-blue {
  background-color: #3490dc;
}

.hover\\:bg-grey:hover {
  background-color: #e8e8e8;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}`;

const tailwindConfigFile = `// tailwind.config.js

export default {
  // ...
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"]
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      "bubble-gum": "#ff77e9",
    },
    spacing: {
      1: "8px",
      2: "12px",
      3: "16px",
      large: '32px',
      massive: "70px",
    },
  },
}`;

const configDerivedHtml = `<!-- view.html -->

<h1 class="mb-large text-purple">Hello world!</h1>
<button class="p-3">Click Me!</button>

<!-- p-10 and bg-blue are not valid classes, ignored -->
<button class="p-10 bg-blue">Another button</button>`;

const exampleHtml = `<!-- view.html -->

<h1 class="mb-large text-purple">Hello world!</h1>
<button class="p-3">Click Me!</button>`;

const sourceStyleFile = `/* styles.css */

@tailwind base;
@tailwind components;
@tailwind utilities;`;

const computedStyleFile = `/* dist/styles.css */

/* ... reset and other styles */
.mb-large {
  margin-bottom: 32px;
}
.p-3 {
  padding: 16px;
}
.text-purple {
  --tw-text-opacity: 1;
  color: rgb(63 60 187 / var(--tw-text-opacity));
}`;
