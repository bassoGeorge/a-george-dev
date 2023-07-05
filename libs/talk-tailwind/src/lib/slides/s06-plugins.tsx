import { Heading1, Heading2, Heading3, PBody } from '@ageorgedev/atoms';
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
