import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyMd,
} from '@ageorgedev/design-system';
import { CodeBlock } from '@ageorgedev/design-system';
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
        <PBodyMd className="fragment">
          <PointSeperator />
          Let application logic manipulate CSS safely using design system tokens
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          Migrating to tailwind from an existing system
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          Some things are better done without Tailwind?
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          You want the flexibility
        </PBodyMd>
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

          <ImportantNote shape="trapLeft" className="mb-4 -ml-12 w-14 self-end">
            <PBody>
              Prior to v3.3, the tokens file needs to be <b>commonJS</b>
            </PBody>
            <PBody>Post v3.3, tailwind supports ESM config file</PBody>
          </ImportantNote>
        </SlideMediaRow>
      </SlideTypeRegular>

      <SlideTypeCenter callout="Opinion">
        <Heading3 as="h1" className="italic">
          bonus
        </Heading3>
        <Heading2>
          A CSS-in-JS library that works well with Tailwind CSS...
        </Heading2>
        <Heading1
          className="fragment mt-4 font-bold text-accent"
          data-fragment-index="0"
        >
          Vanilla Extract
        </Heading1>
        <PBodyMd className="fragment" data-fragment-index="0">
          <a
            href="https://vanilla-extract.style"
            target="_blank"
            className="text-alt-accent"
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
