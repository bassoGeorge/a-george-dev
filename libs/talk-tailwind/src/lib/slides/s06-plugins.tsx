import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyLg,
  PBodyMd,
} from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  ComparisonRow,
  ImportantNote,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S06Plugins() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #3
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Plugins
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular
        heading={
          <Heading2>
            Understanding <em>@layer</em>
          </Heading2>
        }
      >
        <div className="flex gap-7 items-start">
          <CodeBlock lang="css" text={layerStylesCss} fontSize="small" />
          <div className="flex flex-col gap-6 items-start max-w-[min-content] text-left">
            <PBody className="fragment">
              <em>@layer</em> moves your css into the right spot within tailwind
              stylesheet
            </PBody>
            <ImportantNote
              shape="trapLeft"
              type="danger"
              className="fragment self-end"
            >
              <PBody>
                <em>@layer</em> can only be used within the context of the core
                stylesheet
              </PBody>
            </ImportantNote>
            <ImportantNote shape="trapRight" className="fragment">
              <PBody>
                Classes in <em>@layer</em> only{' '}
                <span className="underline">added to stylsheet if used</span>{' '}
                and they <span className="underline">work with modifiers</span>
              </PBody>
            </ImportantNote>

            <CodeBlock
              lang="html"
              text={layerStylesHtml}
              className="fragment"
            />
          </div>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>Understanding plugins</Heading2>}>
        <ComparisonRow
          left={<CodeBlock lang="javascript" text={basicPluginInstallation} />}
          right={
            <>
              <PBody>Tailwind is built out of plugins</PBody>
              <PBody>
                You can create your own plugins to enable your own kind of CSS
                generation
              </PBody>
              <PBody>There are different types of plugins</PBody>
              <PBody>
                We will only focus on a couple. Read the docs for more.
              </PBody>
              <PBody>
                <a
                  href="https://tailwindcss.com/docs/plugins"
                  target="_blank"
                  className="text-cc-alt-accent"
                  rel="noreferrer"
                >
                  https://tailwindcss.com/docs/plugins
                </a>
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>A plugin for typography</Heading2>}>
        <div className="flex items-center gap-7">
          <CodeBlock lang="javascript" text={typographyPlugin} />
          <div className="flex flex-col gap-7 fragment items-start">
            <CodeBlock fontSize="large" lang="html" text={typographyUsage} />
            <ImportantNote shape="trapRight">
              <PBody>Your utilties can work with Tailwind modifiers!</PBody>
            </ImportantNote>
          </div>
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={<Heading2>Creating your own modifiers</Heading2>}
      >
        <CodeBlock lang="javascript" text={ngInvalidPlugin} />
        <CodeBlock
          lang="html"
          text={ngInvalidPluginUsage}
          className="fragment"
        />
      </SlideTypeRegular>
      <SlideTypeRegular
        heading={
          <Heading2>
            Advanced <em>match*</em> plugins
          </Heading2>
        }
      >
        <div className="flex gap-7 items-center">
          <CodeBlock lang="javascript" text={matchComponentsPlugin} />
          <CodeBlock lang="javascript" text={matchComponentsLayout} />
        </div>
      </SlideTypeRegular>
      <SlideTypeRegular heading={<Heading2>What to use?</Heading2>}>
        <ComparisonRow
          className="px-8"
          left={
            <>
              <Heading3 className="font-bold mb-7">
                <em>@layer</em> styles
              </Heading3>
              <PBodyMd className="fragment" data-fragment-index="1">
                If you are in a single application and need to build simple
                plugins
              </PBodyMd>
            </>
          }
          right={
            <>
              <Heading3 className="font-bold mb-7">plugins</Heading3>
              <PBodyMd className="fragment" data-fragment-index="2">
                If you in a MonoRepo and need to support multiple projects
              </PBodyMd>
              <PBodyMd
                className="fragment text-cc-accent"
                data-fragment-index="2"
              >
                Tailwind presets allow you to share entire tailwind
                configurations including the plugins across projects easily
              </PBodyMd>
            </>
          }
        ></ComparisonRow>
      </SlideTypeRegular>
    </section>
  );
}

const basicPluginInstallation = `/* tailwind.config.js */

const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addUtilities, addComponents, e, config }) {
      // Add your custom styles here
    }),
  ]
}`;

const typographyPlugin = `plugin(({ addBase, theme }) => {
  addBase({
    '.typo-h1': {
      fontSize: theme('fontSize.4xl'),
      fontFamily: theme('fontFamily.serif'),
    },
    '.typo-h2': {
      fontSize: theme('fontSize.3xl'),
      fontFamily: theme('fontFamily.serif'),
      letterSpacing: '0.05em',
    },
    '.typo-body': {
      fontSize: theme('fontSize.base'),
    },
    '.typo-interface': {
      fontSize: theme('fontSize.sm'),
      textTransform: 'uppercase',
    }
  })
})`;

const typographyUsage = `<span class="typo-h2 desktop:typo-h1">
  Some content
</span>`;

const ngInvalidPlugin = `plugin(({ addVariant }) => {
  // Overwrite the default invalid:* modifier to support angular classes
  addVariant('invalid', ['&.ng-invalid.ng-touched', '&:invalid']);

  // For group and peer modifiers
  addVariant('group-invalid', [':merge(.group).ng-invalid.ng-touched &', ':merge(.group):invalid &']);
  addVariant('peer-invalid', [':merge(.peer).ng-invalid.ng-touched ~ &', ':merge(.peer):invalid ~ &']);
});
`;

const ngInvalidPluginUsage = `<app-custom-form-control class="invalid:ring-red-500" ></app-custom-form-control>

<input type="email" class="peer ..."/>
<p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
  Please provide a valid email address.
</p>`;

const layerStylesCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .layout-master {
    grid-template-columns: minmax(200px, 2fr) 8fr;
    grid-template-rows: 100px 1fr 50px;
    grid-template-areas: "header  header"
                         "sidebar main"
                         "footer  footer";
  }

  .layout-master-stacked {
    grid-template-areas: "header"
                         "sidebar"
                         "main"
                         "footer";
  }

  .area-header { grid-area: header; }
  .area-main { grid-area: main; }
}`;

const layerStylesHtml = `<section class="grid layout-master-stacked lg:layout-master">
  <header class="area-header">header</header>
  <section class="area-main">main</section>
  <aside class="area-sidebar">sidebar</aside>
  <footer class="area-footer">footer</footer>
</section>`;

const matchComponentsPlugin = `const gridPlugin = plugin(({ matchComponents, addComponents, theme }) => {
  matchComponents(
    {
      layout: (value) => ({
        gridTemplateAreas: value.areas
          .map((area) => \`"\${area}"\`).join(" "),
        gridTemplateColumns: value.columns,
        gridTemplateRows: value.rows,
      }),
    },
    { values: theme("layouts") }
  );

  addComponents({
    ".area-header": { gridArea: "header" },
    ".area-sidebar": { gridArea: "sidebar" },
    ".area-main": { gridArea: "main" },
    ".area-footer": { gridArea: "footer" },
  });
});`;

const matchComponentsLayout = `plugins: [gridPlugin],
theme: {
  layouts: {
    master: {
      areas: [
          "header header", 
          "sidebar main", 
          "footer footer"
      ],
      columns: "minmax(200px, 2fr) 8fr",
      rows: "100px 1fr 50px",
    },
    ["master-stacked"]: {
      areas: [
        "header", "sidebar", 
        "main", "footer"
      ],
    },
  },
},`;
