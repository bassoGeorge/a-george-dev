import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyMd,
} from '@ageorgedev/design-system';
import { CodeBlock } from '@ageorgedev/design-system';
import {
  ComparisonRow,
  ImportantNote,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S07OverrideTheming() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #4
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
            <div className="flex h-full flex-col justify-center gap-2">
              <Heading3 className="font-bold text-destructive-foreground">
                Inflexible
              </Heading3>
              <PBody>You can't change colors at run-time.</PBody>
            </div>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={
          <Heading2>
            Side note: <em>HSL rocks!</em>
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
        callout="Advanced"
        heading={<Heading2>Using fallbacks for more flexibility</Heading2>}
      >
        <CodeBlock
          lang="javascript"
          text={colorVarsWithDefaults}
          fontSize="large"
        ></CodeBlock>
      </SlideTypeRegular>
      <SlideTypeRegular
        callout="Advanced"
        heading={<Heading2>About color opacity modifiers</Heading2>}
      >
        <CodeBlock
          lang="html"
          text={tailwindColorOpacityModifiers}
          fontSize="large"
        ></CodeBlock>
        <PBodyMd className="mb-7 text-destructive-foreground">
          This fails with our vars setup!
        </PBodyMd>
        <ImportantNote type="danger" shape="triUpperRight">
          <PBody>
            It is debatable whether color opacity is a good practice from a
            design perspective
          </PBody>
          <PBody className="mt-3 font-bold">Talk to your designer!</PBody>
        </ImportantNote>
      </SlideTypeRegular>

      <SlideTypeRegular
        callout="Advanced"
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
              You actually might want to hardcode opacities into colors instead
            </PBody>
            <PBody className="mt-3 font-bold">Talk to your designer!</PBody>
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
  DEFAULT: "hsl( var(--color-primary-base) / <alpha-value>)",
}`;

const modernHslSyntax = `.selector {
  /* hsl(<hue> <saturation> <lightness>) */
  color: hsl(205 30% 90%)

  /* hsl(<hue> <saturation> <lightness> / <alpha-value>) */
  background: hsl(205 30% 90% / .4)
}`;
