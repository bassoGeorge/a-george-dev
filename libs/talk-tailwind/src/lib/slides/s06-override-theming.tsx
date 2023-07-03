import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyLg,
  PBodySm,
  PBodyXs,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ComparisonRow,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S06OverrideTheming() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #3
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Colors: Theming using overrides
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={<Heading2>The problem with plain colors</Heading2>}
      >
        <ComparisonRow
          left={
            <CodeBlock lang="javascript" text={plainColorsConfig}></CodeBlock>
          }
          right={
            <div className="flex flex-col justify-center h-full gap-2">
              <PBodyLg className="text-cc-alt-accent">Inflexible</PBodyLg>
              <PBody>You can't change colors at run-time.</PBody>
            </div>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={
          <Heading2>
            <em>Bonus</em>: The problem with Hex colors
          </Heading2>
        }
      >
        <ComparisonRow
          left={
            <>
              <CodeBlock
                className="mb-7"
                lang="javascript"
                text={colorProblemHex}
                fontSize="large"
              ></CodeBlock>
              <PBody className="fragment" data-fragment-index="0">
                Difficult to figure out the relationship between shades
              </PBody>
              <PBody className="fragment" data-fragment-index="0">
                Cannot be programmatically changed
              </PBody>
            </>
          }
          right={
            <>
              <CodeBlock
                className="fragment mb-7"
                data-fragment-index="1"
                lang="javascript"
                text={colorProblemHsl}
                fontSize="large"
              ></CodeBlock>
              <PBody className="fragment" data-fragment-index="2">
                Do you see?
              </PBody>
              <PBody className="fragment" data-fragment-index="2">
                In fact, you can do math on this
              </PBody>
            </>
          }
        ></ComparisonRow>

        <div
          className="flex justify-center gap-7 fragment"
          data-fragment-index="3"
        >
          {colors.map((color) => (
            <div
              key={color.name}
              className="w-12 h-9 rounded grid place-items-center"
              style={{ backgroundColor: color.value }}
            >
              <PBodySm className="text-cc-neutral-inverse dark:text-cc-neutral">
                {color.name}
              </PBodySm>
            </div>
          ))}
        </div>
      </SlideTypeRegular>
    </section>
  );
}

const colors = [
  {
    name: 'light',
    value: 'hsl(321 12% 48%)',
  },
  {
    name: 'base',
    value: 'hsl(321 12% 29%)',
  },
  {
    name: 'dark',
    value: 'hsl(119 22% 44%)',
  },
];

const plainColorsConfig = `/* tailwind.config.js */

export default {
  theme: {
    colors: {
      primary: {
        DEFAULT: "#5B8C5A",
        light: "#9CBF9B",
        dark: "#406440",
      },
      secondary: {
        DEFAULT: "#E3655B",
        light: "#ED9C96",
        dark: "#DC392E",
      }
    }
  },
};`;

const colorProblemHex = `const light = '#896C7F';
const base = '#52414C';
const dark = '#598958';`;

const colorProblemHsl = `const light = 'hsl(321 12% 48%)';
const base = 'hsl(321 12% 29%)';
const dark = 'hsl(119 22% 44%)';`;
