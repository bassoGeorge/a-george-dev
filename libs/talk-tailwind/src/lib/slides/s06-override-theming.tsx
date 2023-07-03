import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyLg,
  PBodySm,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ComparisonRow,
  ImportantNote,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';
import { Warning } from '@phosphor-icons/react';

export function S06OverrideTheming() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #3
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Theming using overrides
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
      <SlideTypeRegular
        heading={
          <Heading2>
            <em>Bonus 2</em>: About the modern color syntax
          </Heading2>
        }
      >
        <CodeBlock
          lang="css"
          text={modernHslSyntax}
          fontSize="large"
        ></CodeBlock>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>How to make Tailwind more flexible?</Heading2>}
      >
        <div className="flex items-start gap-7">
          <CodeBlock
            className="fragment"
            lang="css"
            text={colorVarsRoot}
          ></CodeBlock>
          <CodeBlock
            className="fragment"
            lang="javascript"
            text={colorVarsUsage}
          ></CodeBlock>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>Using fallbacks for more flexibility</Heading2>}
      >
        <CodeBlock
          lang="javascript"
          text={colorVarsWithDefaults}
          fontSize="large"
        ></CodeBlock>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>About color opacity modifiers</Heading2>}
      >
        <CodeBlock
          lang="html"
          text={tailwindColorOpacityModifiers}
          fontSize="large"
        ></CodeBlock>
        <PBodyLg className="text-cc-alt-accent">
          This fails with our vars setup!
        </PBodyLg>
        <PBody className="font-bold mt-7">
          <Warning className="text-cc-alt-accent block mx-auto" /> It is
          debatable whether color opacity
          <br /> is a good practice from a design perspective{' '}
        </PBody>
      </SlideTypeRegular>

      <SlideTypeRegular
        heading={<Heading2>We can make use of color channels!</Heading2>}
      >
        <div className="flex items-end gap-7">
          <CodeBlock
            lang="css"
            text={colorVarsRootChannels}
            fontSize="large"
            className="basis-3/5"
          ></CodeBlock>
          <ImportantNote
            className="fragment basis-2/5"
            shape="trapLeft"
            data-fragment-index="1"
          >
            <PBody>
              You actually might want to avoid customisable opacities
            </PBody>
            <PBody className="font-bold">Talk to your designer</PBody>
          </ImportantNote>
        </div>
        <CodeBlock
          className="fragment"
          lang="css"
          fontSize="large"
          data-fragment-index="0"
          text={colorVarsWithDefaultsChannels}
        ></CodeBlock>
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

const colorVarsRoot = `/* styles.css */
@layer base {
  :root {
    --color-primary-light: hsl(321 12% 48%);
    --color-primary-base: hsl(321 12% 29%);
    --color-primary-dark: hsl(119 22% 44%);
  }
}`;

const colorVarsUsage = `/* tailwind.config.js */

export default {
  theme: {
    colors: {
      primary: {
        DEFAULT: "var(--color-primary-base)",
        light: "var(--color-primary-light)",
        dark: "var(--color-primary-dark)",
      },
      secondary: {
        DEFAULT: "var(--color-secondary-base)",
        light: "var(--color-secondary-light)",
        dark: "var(--color-secondary-dark)",
      }
    }
  },
};`;

const colorVarsWithDefaults = `primary: {
  DEFAULT: "var(--color-primary-base, hsl(321 12% 29%))",
  light: "var(--color-primary-light, hsl(321 12% 48%))",
  dark: "var(--color-primary-dark, hsl(119 22% 44%))",
}`;

const tailwindColorOpacityModifiers = `<div class='bg-primary-dark/30 text-neutral/60'>...</div>`;

const colorVarsRootChannels = `:root {
  --color-primary-base: 207 49% 65%;
}`;

const colorVarsWithDefaultsChannels = `primary: {
  DEFAULT: "hsl( var(--color-primary-base, 321 12% 29%) / <alpha-value>)",
  light: "hsl( var(--color-primary-light, 321 12% 48%) / <alpha-value>)",
  dark: "hsl( var(--color-primary-dark, 119 22% 44%) / <alpha-value>)",
}`;

const modernHslSyntax = `.selector {
  /* hsl(<hue> <saturation> <lightness>) */
  color: hsl(205 30% 90%)

  /* hsl(<hue> <saturation> <lightness> / <alpha-value>) */
  background: hsl(205 30% 90% / .4)
}`;
