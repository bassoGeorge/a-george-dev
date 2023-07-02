import { Heading1, Heading3, PBody, PBodyMd } from '@ageorgedev/atoms';
import {
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S01Intro() {
  return (
    <>
      <SlideTypeCenter>
        <Heading1>
          Beyond prototyping with{' '}
          <span className="font-bold text-rc-p-accent-500 dark:text-rc-p-accent-300">
            Tailwind CSS
          </span>
        </Heading1>
        <PBodyMd className="italic">Advanced strategies for production</PBodyMd>
      </SlideTypeCenter>
      <SlideTypeRegular heading={<Heading1>Why should you care?</Heading1>}>
        <PBodyMd className="fragment">
          Tailwind has been the subject of much controversy and you are curious!
        </PBodyMd>
        <PBodyMd className="fragment">
          You want/need/<b>have</b> to use it...
        </PBodyMd>
        <Heading3 className="fragment mt-10 text-rc-p-accent-500 font-bold">
          Welcome to this talk and strap in!
        </Heading3>
      </SlideTypeRegular>
    </>
  );
}
