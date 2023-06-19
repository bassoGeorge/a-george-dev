import { BodyLg, Heading1 } from '@ageorgedev/atoms';
import { TwLogo } from '@ageorgedev/brand-components';

export function S01Intro() {
  return (
    <>
      <section className="h-full">
        <div className="flex flex-col h-full pt-8 pb-6 px-6 gap-2">
          <div className="grow flex flex-col justify-center">
            <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
            <BodyLg className="mt-5">Advanced strategies for production</BodyLg>
          </div>
          <footer className="flex justify-center gap-2 h-7">
            <TwLogo />
          </footer>
        </div>
      </section>
      <section>
        <Heading1>Why should you care?</Heading1>
        <BodyLg className="mt-5">
          Tailwind has been the subject of much controversy
        </BodyLg>
        <BodyLg className="mt-5">
          If you want/need/have to use it, welcome to this talk!
        </BodyLg>
      </section>
    </>
  );
}
