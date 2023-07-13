import { Heading1, Heading2, Heading3, PBody } from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ComparisonRow,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S04LeanConfig() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #1
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Lean Configuration
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={<Heading2>Extending Tailwind configuration</Heading2>}
      >
        <ComparisonRow
          left={
            <CodeBlock lang="javascript" text={extendingConfig}></CodeBlock>
          }
          right={
            <>
              <PBody>Allows adding onto the existing Tailwind values</PBody>
              <PBody>Easy for devs to use non-compliant design</PBody>
              <PBody>Tailwind tends to have too many values</PBody>
              <PBody>
                Look at{' '}
                <a
                  href="https://tailwindcss.com/docs/customizing-colors"
                  target="_blank"
                  className="text-cc-alt-accent"
                  rel="noreferrer"
                >
                  their colors
                </a>
                {' and '}
                <a
                  href="https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale"
                  target="_blank"
                  className="text-cc-alt-accent"
                  rel="noreferrer"
                >
                  spacing scale
                </a>
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>Overriding Tailwind value sets</Heading2>}
      >
        <ComparisonRow
          left={
            <CodeBlock lang="javascript" text={overridingConfig}></CodeBlock>
          }
          right={
            <>
              <PBody>
                Limits the possible values to a strict design system
              </PBody>
              <PBody>
                You are free to choose more meaninful property names
              </PBody>
              <PBody>
                The tailwind documentation becomes partially useless,
                <br />
                you will need your own documentation describing all possible
                properties
              </PBody>
              <PBody>Storybook can be a good solution</PBody>
              <PBody className="text-cc-accent font-bold">
                The earlier you move to custom sets, the better
              </PBody>
              <PBody className="italic">
                <b>Pro tip:</b> Get a strong spacing scale from your designer
                before it is too late.
                <br />
                The Tailwind default is trash.
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      {/** TODO: Add spacing scale here */}
      <SlideTypeRegular heading={<Heading2>Disable core plugins</Heading2>}>
        <ComparisonRow
          left={
            <CodeBlock lang="javascript" text={removingCorePlugins}></CodeBlock>
          }
          right={
            <>
              <PBody>
                Core plugins provide the various css features that Tailwind
                supports
              </PBody>
              <PBody>
                You can disable any of these plugins to stop tailwind from
                generating those classes
              </PBody>
              <PBody>
                Allows you to restrict to CSS best practices and reduce
                confusion
              </PBody>
              <PBody>
                You also have the option of disabling all core plugins and use
                Tailwind as an
                <br />
                engine to drive your plugins. More on that later
              </PBody>
              <PBody className="text-cc-accent font-bold">
                It is a good idea to prune out CSS practices you don't need
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
    </section>
  );
}

// Code blocks

const extendingConfig = `/* tailwind.config.js */

export default {
  // ...
  theme: {
    extend: {
      colors: {
        purple: "#3f3cbb",
        midnight: "#121063",
      },
    },
  },
};`;

const overridingConfig = `/* tailwind.config.js */

export default {
  // ...
  theme: {
    spacing: {
      1: "8px",
      2: "12px",
      3: "16px",
      large: "32px",
      massive: "70px",
    },
    // ... non-specified sets picked up
    // from tailwind defaults
  },
};`;

const removingCorePlugins = `/* tailwind.config.js */

export default {
  // ...
  corePlugins: {
    float: false,     // only modern layouts please
    zIndex: false,    // we don't mess with z-index
    animation: false  // will be custom anyway
  },
};`;
