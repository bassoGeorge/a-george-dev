import { Heading1, Heading2, Heading3, PBody } from '@ageorgedev/atoms';
import { CodeBlock } from '@ageorgedev/molecules';
import {
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S07DarkAndLight() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #4
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Dark mode
        </Heading1>
      </SlideTypeCenter>
      <SlideTypeRegular heading={<Heading2>Full Tailwind support</Heading2>}>
        <div className="flex items-start gap-7">
          <CodeBlock
            fontSize="large"
            lang="javascript"
            text={darkModeConfig}
          ></CodeBlock>
          <CodeBlock
            fontSize="large"
            className="fragment"
            lang="html"
            text={darkModeHtml}
          ></CodeBlock>
        </div>
        <CodeBlock
          fontSize="large"
          className="fragment"
          lang="html"
          text={darkModeBasicUsage}
        ></CodeBlock>
      </SlideTypeRegular>
    </section>
  );
}

// Code blocks
const darkModeConfig = `/* tailwind.config.js */
export default {
  darkMode: 'class'
  // ... rest of the config
}`;

const darkModeHtml = `<html class="dark">
<!-- ... -->
</html>`;

const darkModeBasicUsage = `<button class="bg-primary-100 dark:bg-primary-800 dark:text-white">
  Click me
</button>`;
