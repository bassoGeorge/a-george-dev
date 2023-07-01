import { Heading1, Heading2, Heading3, PBody } from '@ageorgedev/atoms';
import {
  ComparisonRow,
  SlideMediaRow,
  SlideTypeCenter,
  SlideTypeSingleHeadingWithCenterContent,
} from '@ageorgedev/reveal-framework';
import { D01TailwindFilesize } from '../diagrams/D01TailwindFilesize';
import { CodeBlock } from '@ageorgedev/molecules';

const code1 = `<button class="btn btn-primary">
  Cick Me!
</button>`;

const code2 = `<button class="text-white text-lg bg-primary-300 hover:bg-primary-400 rounded">
  Click Me!
</button>`;

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
                text={code1}
                lang="html"
                className="fragment"
                data-fragment-index="1"
              />
              <PBody className="fragment" data-fragment-index="3">
                CSS control over styles
              </PBody>
            </>
          }
          right={
            <>
              <Heading3>Tailwind CSS</Heading3>
              <CodeBlock
                text={code2}
                lang="html"
                className="fragment"
                data-fragment-index="2"
              />
              <PBody className="fragment" data-fragment-index="3">
                HTML is the authoring languagte
              </PBody>
            </>
          }
        ></ComparisonRow>
      </SlideTypeSingleHeadingWithCenterContent>
      <SlideTypeCenter>
        <Heading1>Tailwind only generates the minimum CSS required</Heading1>
        <SlideMediaRow>
          <D01TailwindFilesize />
        </SlideMediaRow>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Tradeoffs</Heading1>
      </SlideTypeCenter>
    </section>
  );
}
