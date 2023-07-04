import { Heading1, Heading2, PBody, Heading3 } from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ImportantNote,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S09CssInJs() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #6
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          CSS-in-JS shenanigans
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular heading={<Heading2>Why?...</Heading2>}>
        <PBody className="fragment">
          Let application logic manipulate CSS safely using design system tokens
        </PBody>
        <PBody className="fragment">
          Migrating to tailwind from an existing system
        </PBody>
        <PBody className="fragment">
          Some things are better done without Tailwind?
        </PBody>
        <PBody className="fragment">You want the flexibility</PBody>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>Tailwind approved support</Heading2>}
      >
        <CodeBlock lang="javascript" text={tailwindApprovedSupport} />
        <ImportantNote>
          <PBody>
            Using this includes a lot of tailwind dependencies into the client
            bundle
          </PBody>
          <PBody>There are ways around this, but be careful</PBody>
        </ImportantNote>
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
