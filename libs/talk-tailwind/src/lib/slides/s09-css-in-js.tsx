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
import { Skull, WarningDiamond } from '@phosphor-icons/react';
import { D02CssPipeline } from '../diagrams/D02CssPipeline';

export function S09CssInJs() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #6
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Tailwind CSS + CSS-in-JS
        </Heading1>
        <Heading3 className="italic text-cc-danger">
          <Skull className="inline-block -mt-2" /> controversial, experimental{' '}
          <WarningDiamond className="inline-block -mt-2" />
        </Heading3>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading2>Why?...</Heading2>
        <PBodyMd className="fragment">
          Let application logic manipulate CSS safely using design system tokens
        </PBodyMd>
        <PBodyMd className="fragment">
          Migrating to tailwind from an existing system
        </PBodyMd>
        <PBodyMd className="fragment">
          Some things are better done without Tailwind?
        </PBodyMd>
        <PBodyMd className="fragment">You want the flexibility</PBodyMd>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={<Heading2>Tailwind approved support</Heading2>}
      >
        <CodeBlock lang="javascript" text={tailwindApprovedSupport} />
        <ImportantNote type="danger" shape="triUpperRight">
          <PBody>
            Using this includes a lot of tailwind dependencies into the client
            bundle
          </PBody>
          <PBody>There are ways around this, but be careful</PBody>
        </ImportantNote>
      </SlideTypeRegular>
      <SlideTypeCenter>
        <Heading2>
          What if we <b>don't</b> want Tailwind to <br />
          own our Design Tokens?
        </Heading2>
      </SlideTypeCenter>
      <SlideTypeRegular heading={<Heading2>A basic token pipeline</Heading2>}>
        <SlideMediaRow>
          <D02CssPipeline />

          <ImportantNote shape="trapLeft" className="self-end -ml-12 mb-4 w-14">
            <PBody>
              In this setup, the tokens file needs to be <b>commonJS</b>
            </PBody>
          </ImportantNote>
        </SlideMediaRow>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>and here is an example</Heading2>}>
        <div className="flex gap-7 items-start">
          <CodeBlock lang="javascript" text={tokensFile} />
          <CodeBlock lang="javascript" text={tokenImport} />
        </div>
      </SlideTypeRegular>

      <SlideTypeRegular
        heading={
          <Heading2>
            If you{' '}
            <em>
              <b>must</b>
            </em>{' '}
            build the tailwind config...
          </Heading2>
        }
      >
        <div className="flex items-start gap-7">
          <CodeBlock lang="javascript" text={esBuildTailwind} />
          <CodeBlock lang="javascript" text={esUsage} />
        </div>
        <ImportantNote shape="triUpperRight">
          <PBody>
            Make sure your preset is built before the tailwind config is used
          </PBody>
        </ImportantNote>
      </SlideTypeRegular>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          bonus
        </Heading3>
        <Heading2>
          A CSS-in-JS library that works well with Tailwind CSS...
        </Heading2>
        <Heading1
          className="fragment font-bold mt-4 text-cc-accent"
          data-fragment-index="0"
        >
          Vanilla Extract
        </Heading1>
        <PBodyMd className="fragment" data-fragment-index="0">
          <a
            href="https://vanilla-extract.style"
            target="_blank"
            className="text-cc-alt-accent"
            rel="noreferrer"
          >
            https://vanilla-extract.style
          </a>
        </PBodyMd>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={
          <Heading2>Zero-runtime CSS-in-JS solution with Typescript</Heading2>
        }
      >
        <ComparisonRow
          left={<CodeBlock lang="typescript" text={vanillaExtractExample} />}
          right={
            <>
              <PBody>You can colocate tailwind classes without penalty</PBody>
              <PBody>Beautiful APIs, especially around CSS variables</PBody>
              <PBody>Zero-runtime, creates full stylesheet during build</PBody>
              <CodeBlock
                className="mt-7"
                lang="tsx"
                text={vanillaExtractUsage}
              />
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
    </section>
  );
}

// Code blocks

const tailwindApprovedSupport = `import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

fullConfig.theme.width[4]
// => '1rem'

fullConfig.theme.screens.md
// => '768px'`;

const tokensFile = `/* tokens.js */

module.exports = {
  colors: {
    primaryBase: 'hsl(321 12% 29%)',
    primaryDark: 'hsl(119 22% 44%)',
  },
  spacingScale: [8, 12, 16, 32]
}
`;

const tokenImport = `/* tailwind.config.js */
const tokens = require('./tokens.js');
export default {
  theme: {
    colors: {
      primary: {
        DEFAULT: tokens.colors.primaryBase,
        light: tokens.colors.primaryLight,
        dark: tokens.colors.primaryDark,
      }
    },
    spacing: {
      1: tokens.spacingScale[0] + 'px',
      2: tokens.spacingScale[1] + 'px',
      3: tokens.spacingScale[2] + 'px',
      large: tokens.spacingScale[3] + 'px',
      massive: tokens.spacingScale[4] + 'px',
    }
  }
};`;

const esBuildTailwind = `/* tailwind-preset.js */
import tokens from './tokens';
import utils from './utils';

// Some fancy code

export default {
  theme: {
    // final theme stuff
  }
}`;

const esUsage = `/* tailwind.config.js */
const TailwindPreset = require('./dist/core-lib/tailwind-preset.min');

module.exports = {
  presets: [TailwindPreset],
  theme: {
    extend: {},
  },
  // ...
};`;

const vanillaExtractExample = `/* styles.css.ts */
import { Spacing } from './tokens';
import { style } from '@vanilla-extract/css';

export const button = style({
  backgroundColor: 'red',
  color: 'white',
  padding: Spacing[2],
});
// => 'button_1w2j3r'

export const myCustomGrid = style([
  'grid place-items-center gap-6',
  {
    gridTemplateRows: '2fr 8fr',
  },
]);
// => 'myCustomGrid_1w2j3r grid place-items-center gap-6'`;

const vanillaExtractUsage = `/* Button.tsx */
import * as styles from './styles.css';

export function MyComponent() {
  return (
    <div className={styles.myCustomGrid}>
      <button className={styles.button}>Click me</button>
    </div>
  );
}`;