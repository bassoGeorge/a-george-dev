import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyMd,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
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
        heading={<Heading1>Utility First CSS principles</Heading1>}
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
              <PBody className="fragment" data-fragment-index="5">
                HTML overloaded with styling
              </PBody>
              <PBody className="fragment" data-fragment-index="6">
                Styles co-located with markup
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>

      <SlideTypeRegular heading={<Heading1>What a mess!</Heading1>}>
        <CodeBlock text={fullTailwindWithoutComponents} lang="jsx"></CodeBlock>
      </SlideTypeRegular>

      <SlideTypeRegular
        heading={<Heading2>You are supposed to build components!</Heading2>}
      >
        <CodeBlock text={fixedTailwindWithComponents} lang="jsx"></CodeBlock>
      </SlideTypeRegular>

      {/* TODO: Angular side note for using Directives */}

      <SlideTypeRegular
        heading={<Heading1>Finite values through configuration</Heading1>}
      >
        <div className="flex gap-7 items-start">
          <CodeBlock text={tailwindConfigFile} lang="javascript"></CodeBlock>
          <div className="flex flex-col gap-7 items-start">
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
        <div className="flex flex-col gap-7 items-center">
          <div className="flex gap-7 items-start">
            <CodeBlock text={exampleHtml} lang="html"></CodeBlock>
            <CodeBlock text={sourceStyleFile} lang="css"></CodeBlock>
          </div>
          <CodeBlock
            text={computedStyleFile}
            lang="css"
            className="fragment"
          ></CodeBlock>
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
            className="text-rc-s-accent-500 dark:text-rc-s-accent-400"
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
    rounded px-2 py-3">
  Click Me!
</button>`;

const fullTailwindWithoutComponents = `<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="http://dummy.com/img.jpeg" alt="User Avatar" />
  <div className="px-6 py-4">
    <h3 className="font-bold text-xl mb-3">
      John Doe
    </h3>
    <p className="text-gray-700 text-base mb-2">
      Professional Web developer with several years of experience
    </p>
    <p className="text-gray-700 text-base">
      Loves basketball
    </p>
  </div>
  <div className="px-6 py-4 flex gap-2">
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      Web Developer
    </span>
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      UI/UX Designer
    </span>
  </div>
</div>`;

const fixedTailwindWithComponents = `<Card>
  <img className="w-full" src="http://dummy.com/img.jpeg" alt="User Avatar" />
  <div className="px-6 py-4">
    <Heading2 className='mb-3'>John Doe</Heading2>
    <Body strength="subtle" className='mb-2'>
      Professional Web developer with several years of experience
    </Body>
    <Body strength="subtle">
      Loves basketball
    </Body>
  </div>
  <div className="px-6 py-4 flex gap-2">
    <SkillBadge>
      Web Developer
    </SkillBadge>
    <SkillBadge>
      UI/UX Designer
    </SkillBadge>
    <SkillBadge>Photographer</SkillBadge>
  </div>
</Card>`;

const tailwindConfigFile = `// tailwind.config.js

export default {
  // ...
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
