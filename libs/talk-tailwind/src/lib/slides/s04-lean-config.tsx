import {
  Heading1,
  Heading2,
  Heading3,
  Interface,
  PBody,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/design-system';
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
              <PBody className="text-cc-danger">
                Easy for devs to use non-compliant design
              </PBody>
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
              <PBody className="font-bold text-cc-accent">
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
      <SlideTypeRegular
        callout="UX"
        heading={<Heading2>A good spacing scale?</Heading2>}
      >
        <ComparisonRow
          left={
            <>
              <Heading3 className="font-bold">Tailwind default</Heading3>
              <div
                className="grid justify-items-end gap-2"
                style={{ gridTemplateColumns: 'minmax(0, 1fr) 100px' }}
              >
                <LSpaceBar name="w-px (1px)" className="w-[1px]" />
                <LSpaceBar name="w-0.5 (2px)" className="w-[2px]" />
                <LSpaceBar name="w-1 (4px)" className="w-[4px]" />
                <LSpaceBar name="w-1.5 (6px)" className="w-[6px]" />
                <LSpaceBar name="w-2 (8px)" className="w-[8px]" />
                <LSpaceBar name="w-2.5 (10px)" className="w-[10px]" />
                <LSpaceBar name="w-3 (12px)" className="w-[12px]" />
                <LSpaceBar name="w-3.5 (14px)" className="w-[14px]" />
                <LSpaceBar name="w-4 (16px)" className="w-[16px]" />
                <LSpaceBar name="w-5 (20px)" className="w-[20px]" />
                <LSpaceBar name="w-6 (24px)" className="w-[24px]" />
                <LSpaceBar name="w-7 (24px)" className="w-[28px]" />
                <LSpaceBar name="w-8 (24px)" className="w-[32px]" />
                <LSpaceBar name="w-9 (36px)" className="w-[36px]" />
                <LSpaceBar name="w-10 (40px)" className="w-[40px]" />
                <LSpaceBar name="w-11 (44px)" className="w-[44px]" />
                <LSpaceBar name="w-12 (48px)" className="w-[48px]" />
                <LSpaceBar name="w-14 (56px)" className="w-[56px]" />
                <LSpaceBar name="w-16 (64px)" className="w-[64px]" />
                <LSpaceBar name="w-20 (80px)" className="w-[80px]" />
              </div>
            </>
          }
          right={
            <>
              <Heading3 className="font-bold">ageorge.dev</Heading3>
              <div
                className="grid justify-items-start gap-2"
                style={{ gridTemplateColumns: '100px minmax(0, 1fr)' }}
              >
                <RSpaceBar name="w-px (1px)" className="w-px" />
                <RSpaceBar name="w-0.5 (2px)" className="w-0.5" />
                <RSpaceBar name="w-1 (4px)" className="w-1" />
                <div></div>
                <div className="h-4"></div>
                <RSpaceBar name="w-2 (8px)" className="w-2" />
                <div></div>
                <div className="h-4"></div>
                <RSpaceBar name="w-3 (12px)" className="w-3" />
                <div></div>
                <div className="h-4"></div>
                <RSpaceBar name="w-4 (16px)" className="w-4" />
                <RSpaceBar name="w-5 (24px)" className="w-5" />
                <RSpaceBar name="w-6 (32px)" className="w-6" />
                <RSpaceBar name="w-7 (48px)" className="w-7" />
                <RSpaceBar name="w-8 (64px)" className="w-8" />
                <RSpaceBar name="w-9 (72px)" className="w-9" />
                <RSpaceBar name="w-10 (128px)" className="w-10" />
                <RSpaceBar name="w-11 (192px)" className="w-11" />
                <RSpaceBar name="w-12 (256px)" className="w-12" />
                <RSpaceBar name="w-13 (384px)" className="w-13" />
                <RSpaceBar name="w-14 (480px)" className="w-14" />
                <RSpaceBar name="w-15 (640px)" className="w-15" />
              </div>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
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
              <PBody className="font-bold text-cc-accent">
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

function RSpaceBar({ className, name }: { className?: string; name: string }) {
  return (
    <>
      <Interface>{name}</Interface>
      <Bar className={className} />
    </>
  );
}

function LSpaceBar({ className, name }: { className?: string; name: string }) {
  return (
    <>
      <Bar className={className} />
      <Interface>{name}</Interface>
    </>
  );
}

function Bar({ className }: { className?: string }) {
  return <div className={`${className} h-4 bg-cc-accent`}></div>;
}
