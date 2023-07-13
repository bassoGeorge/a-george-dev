import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  NameLogo,
  PBody,
  PBodyLg,
  PBodyMd,
} from '@ageorgedev/atoms';
import {
  CalloutForAdvancedTopic,
  CalloutForPersonalOpinion,
  CalloutForVD,
  PointSeperator,
  SlideTypeCenter,
  SlideTypeRegular,
} from '@ageorgedev/reveal-framework';

export function S01Intro() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1 className="font-bold">
          Beyond prototyping with{' '}
          <span className="text-cc-accent">Tailwind CSS</span>
        </Heading1>
        <PBodyMd className="italic">Advanced strategies for production</PBodyMd>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <div className="flex gap-10 items-center">
          <NameLogo className="text-[9vw]" />
          <div className="flex flex-col gap-5 items-start">
            <Heading3 className="font-bold text-cc-alt-accent mb-7">
              Lead UI Developer
            </Heading3>
            <PBody>Built a design system in Angular + Tailwind</PBody>
            <PBody>This site is in Remix + Tailwind + Vanilla-Extract</PBody>
          </div>
        </div>
        <PBodyLg className="mt-7 font-bold text-cc-alt-accent">
          <a href="https://ageorge.dev" target="_blank" rel="noreferrer">
            https://ageorge.dev
          </a>
        </PBodyLg>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Why should you care?</Heading1>
        <PBodyMd className="fragment">
          Tailwind has been the subject of much controversy and you are curious!
        </PBodyMd>
        <PBodyMd className="fragment">
          You want/need/<b>have</b> to use it...
        </PBodyMd>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Topics covered</Heading1>
        <PBody>Fundamentals of Tailwind CSS</PBody>
        <PBody>Anti-patterns</PBody>
        <PBody>Lean configuration</PBody>
        <PBody>Cognitive load</PBody>
        <PBody>Componentisation</PBody>
        <PBody>Plugins</PBody>
        <PBody>Theming with overrides</PBody>
        <PBody>Dark mode</PBody>
        <PBody>CSS-in-JS</PBody>
      </SlideTypeCenter>
      <SlideTypeRegular heading={<Heading2>How I roll!</Heading2>}>
        <PBodyMd>
          Slides available at{' '}
          <a
            href="https://ageorge.dev/talks/tailwind"
            className={`text-cc-alt-accent font-bold ${PBodyLg.classes}`}
            target="_blank"
            rel="noreferrer"
          >
            https://ageorge.dev/talks/tailwind
          </a>
        </PBodyMd>
        <PointSeperator />
        <PBodyMd>Lots of code snippets, some demos</PBodyMd>
        <PointSeperator />
        <Heading4 className="font-bold">Some slides have callouts</Heading4>
        <div className="grid grid-cols-3 max-w-[1200px]">
          <div>
            <CalloutForVD />
            <PBodyMd className="mt-5">
              Information presented is more relevant to UX/VD professionals.
            </PBodyMd>
          </div>
          <div>
            <CalloutForAdvancedTopic />
            <PBodyMd className="mt-5">
              Advanced or Niche topic. Safe to skip.
            </PBodyMd>
          </div>
          <div>
            <CalloutForPersonalOpinion />
            <PBodyMd className="mt-5">
              My subjective opinion. I may be utterly wrong about this.
            </PBodyMd>
          </div>
        </div>
      </SlideTypeRegular>
    </section>
  );
}
