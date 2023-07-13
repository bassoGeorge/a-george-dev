import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyMd,
} from '@ageorgedev/atoms';
import {
  PointSeperator,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S10Outro() {
  return (
    <section>
      <SlideTypeRegular
        callout="Opinion"
        heading={<Heading2>Final thoughts</Heading2>}
      >
        <Heading3>I am a CSS expert, I don't need Tailwind!</Heading3>
        <PointSeperator />
        <PBody className="fragment">Will your docs be as comprehensive?</PBody>
        <PointSeperator />
        <PBody className="fragment">
          Will build tools automatically exclude unused styles?
        </PBody>
        <PointSeperator />
        <PBody className="fragment">
          Will your dev team already have experience with your CSS approach?
        </PBody>
        <PointSeperator />
        <PBodyMd className="fragment font-bold text-cc-accent">
          In fact, most of the time, we build an inferior Tailwind ourselves...
        </PBodyMd>
      </SlideTypeRegular>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          that's all folks!
        </Heading3>
        <Heading1 as="h2" className="font-bold text-cc-alt-accent">
          Thank You
        </Heading1>
      </SlideTypeCenter>
    </section>
  );
}
