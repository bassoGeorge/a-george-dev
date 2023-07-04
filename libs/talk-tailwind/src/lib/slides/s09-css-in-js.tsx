import {
  Heading1,
  Heading2,
  PBody,
  Heading3,
  PBodyMd,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ImportantNote,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { Skull, WarningDiamond } from '@phosphor-icons/react';

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
