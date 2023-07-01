import { Heading1, Heading3, PBody, PBodyMd } from '@ageorgedev/atoms';
import {
  SlideTypeCenter,
  SlideTypeSingleHeadingWithCenterContent,
} from '@ageorgedev/reveal-framework';

export function S01Intro() {
  return (
    <>
      <SlideTypeCenter>
        <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
        <PBody>Advanced strategies for production</PBody>
      </SlideTypeCenter>
      <SlideTypeSingleHeadingWithCenterContent
        heading={<Heading1>Why should you care?</Heading1>}
      >
        <PBodyMd className="fragment">
          Tailwind has been the subject of much controversy and you are curious!
        </PBodyMd>
        <PBodyMd className="fragment">
          You want/need/<b>have</b> to use it...
        </PBodyMd>
        <Heading3 className="fragment mt-10 text-rc-p-accent-500 font-bold">
          Welcome to this talk and strap in!
        </Heading3>
      </SlideTypeSingleHeadingWithCenterContent>
    </>
  );
}
