import {
  Heading1,
  Heading2,
  Heading3,
  PBody,
  PBodyLg,
  PBodyMd,
} from '@ageorgedev/design-system';
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
        heading={<Heading2 className="font-bold">Final thoughts</Heading2>}
      >
        <Heading3 className="italic">
          I am a CSS expert, I don't need Tailwind!
        </Heading3>
        <PBody className="fragment">
          <PointSeperator />
          Will your docs be as comprehensive?
        </PBody>
        <PBody className="fragment">
          <PointSeperator />
          Will build tools automatically exclude unused styles?
        </PBody>
        <PBody className="fragment">
          <PointSeperator />
          Will your dev team already have experience with your CSS approach?
        </PBody>
        <PBodyMd className="fragment font-bold text-cc-accent">
          <PointSeperator />
          In fact, most of the time, we build an inferior Tailwind ourselves...
        </PBodyMd>
      </SlideTypeRegular>
      <SlideTypeCenter>
        <Heading2>Tailwind is not a CSS framework..</Heading2>
        <Heading2 className="font-bold">
          it is a framework to <em>build your own CSS framework</em>
        </Heading2>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          that's all folks!
        </Heading3>
        <Heading1 as="h2" className="font-bold text-cc-accent">
          Thank You
        </Heading1>
        <PBodyLg className="mt-7">
          <PointSeperator />
          https://<b>ageorge.dev</b>/talks/tailwind
        </PBodyLg>
      </SlideTypeCenter>
    </section>
  );
}
