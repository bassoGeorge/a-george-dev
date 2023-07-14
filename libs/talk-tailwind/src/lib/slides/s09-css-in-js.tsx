import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyMd,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ImportantNote,
  PointSeperator,
  SlideMediaRow,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
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
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading2>Why?...</Heading2>
        <PointSeperator />
        <PBodyMd className="fragment">
          Let application logic manipulate CSS safely using design system tokens
        </PBodyMd>
        <PointSeperator />
        <PBodyMd className="fragment">
          Migrating to tailwind from an existing system
        </PBodyMd>
        <PointSeperator />
        <PBodyMd className="fragment">
          Some things are better done without Tailwind?
        </PBodyMd>
        <PointSeperator />
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
              Prior to v3.3, the tokens file needs to be <b>commonJS</b>
            </PBody>
            <PBody>Post v3.3, tailwind supports ESM config file</PBody>
          </ImportantNote>
        </SlideMediaRow>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>and here is an example</Heading2>}>
        <div className="flex gap-7 items-start">
          <CodeBlock lang="javascript" text={tokensFile} />
          <CodeBlock lang="javascript" text={tokenImport} />
        </div>
      </SlideTypeRegular>

      <SlideTypeCenter callout="Opinion">
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
