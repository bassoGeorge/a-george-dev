import { Heading1, Heading2, Heading3, PBody } from '@ageorgedev/atoms';
import {
  ComparisonRow,
  SlideMediaRow,
  SlideTypeCenter,
  SlideTypeSingleHeadingWithCenterContent,
} from '@ageorgedev/reveal-framework';
import { D01TailwindFilesize } from '../diagrams/D01TailwindFilesize';
import { CodeBlock } from '@ageorgedev/molecules';

export function S02Fundamentals() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1>Fundamentals of Tailwind</Heading1>
        <PBody>The quick version</PBody>
      </SlideTypeCenter>
      <SlideTypeSingleHeadingWithCenterContent
        heading={<Heading1>Utility First CSS principles</Heading1>}
      >
        <ComparisonRow
          left={
            <>
              <Heading3>A typical CSS framework</Heading3>
              <CodeBlock
                text={simpleButtonTraditional}
                lang="html"
                className="fragment mb-8"
                data-fragment-index="1"
              />
              <PBody className="fragment" data-fragment-index="3">
                Individual classes encapsulate full sets of styles
              </PBody>
              <PBody className="fragment" data-fragment-index="4">
                Need both HTML and CSS to author the UI
              </PBody>
              <PBody className="fragment" data-fragment-index="5">
                Clean HTML
              </PBody>
              <PBody className="fragment" data-fragment-index="6">
                Styles hidden away
              </PBody>
            </>
          }
          right={
            <>
              <Heading3>Tailwind CSS</Heading3>
              <CodeBlock
                text={simpleButtonTailwind}
                lang="html"
                className="fragment mb-8"
                data-fragment-index="2"
              />
              <PBody className="fragment" data-fragment-index="3">
                Classes are atomic. Each describes a specific CSS property-value
                pair
              </PBody>
              <PBody className="fragment" data-fragment-index="4">
                HTML becomes the authoring language
              </PBody>
              <PBody className="fragment" data-fragment-index="5">
                HTML overloaded with styling
              </PBody>
              <PBody className="fragment" data-fragment-index="6">
                Styles co-located with markup
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeSingleHeadingWithCenterContent>
      <SlideTypeSingleHeadingWithCenterContent
        heading={<Heading1>Oh my, what a mess!</Heading1>}
      >
        <ComparisonRow
          left={
            <>
              <Heading3>The assumption</Heading3>
              <CodeBlock
                text={fullTailwindWithoutComponents}
                lang="jsx"
              ></CodeBlock>
            </>
          }
          right={
            <>
              <Heading3 className="fragment" data-fragment-index="0">
                The Reality
              </Heading3>
              <CodeBlock
                className="fragment"
                data-fragment-index="0"
                text={fixedTailwindWithComponents}
                lang="jsx"
              ></CodeBlock>
            </>
          }
        ></ComparisonRow>
      </SlideTypeSingleHeadingWithCenterContent>

      <SlideTypeCenter>
        <Heading1>Tailwind only generates the minimum CSS required</Heading1>
        <SlideMediaRow>
          <code>Example of jsx</code>
          <code>Corresponding example of css generated...</code>
        </SlideMediaRow>
      </SlideTypeCenter>
      <SlideTypeSingleHeadingWithCenterContent
        heading={<Heading1>CSS file size stays to a minimum</Heading1>}
      >
        <SlideMediaRow>
          <D01TailwindFilesize />
        </SlideMediaRow>
        <PBody className="mt-8">
          After a certain point, the css file stops growing, and is cached by
          the user's browser!
        </PBody>
      </SlideTypeSingleHeadingWithCenterContent>
    </section>
  );
}

// Code snippets

const simpleButtonTraditional = `<button class="btn btn-primary">
  Cick Me!
</button>`;

const simpleButtonTailwind = `<button class="text-white text-lg bg-primary-300 hover:bg-primary-400 rounded">
  Click Me!
</button>`;

const fullTailwindWithoutComponents = `<div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src="http://dummy.com/img.jpeg" alt="User Avatar" />
  <div className="px-6 py-4">
    <h3 className="font-bold text-xl mb-3">
      John Doe
    </h3>
    <p className="text-gray-700 text-base mb-2">
      Professional Web devloper with several years of experience
    </p>
    <p className="text-gray-700 text-base">
      Loves basketball
    </p>
  </div>
  <div className="px-6 py-4 flex gap-2">
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      Web Developer
    </span>
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      UI/UX Designer
    </span>
    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
      Photographer
    </span>
  </div>
</div>`;

const fixedTailwindWithComponents = `<Card>
  <img className="w-full" src="http://dummy.com/img.jpeg" alt="User Avatar" />
  <div className="px-6 py-4">
    <Heading2 className='mb-3'>John Doe</Heading2>
    <Body strength="subtle" className='mb-2'>
      Professional Web devloper with several years of experience
    </Body>
    <Body strength="subtle">
      Loves basketball
    </Body>
  </div>
  <div className="px-6 py-4 flex gap-2">
    <SkillBadge>
      Web Developer
    </SkillBadge>
    <SkillBadge>
      UI/UX Designer
    </SkillBadge>
    <SkillBadge>Photographer</SkillBadge>
  </div>
</Card>`;
