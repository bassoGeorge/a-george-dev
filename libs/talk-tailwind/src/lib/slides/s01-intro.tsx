import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  NameLogo,
  PBody,
  PBodyLg,
  PBodyMd,
} from '@ageorgedev/design-system';
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
          <span className="text-primary-foreground">Tailwind CSS</span>
        </Heading1>
        <PBodyMd className="italic">Advanced strategies for production</PBodyMd>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <div className="flex items-center gap-10">
          <NameLogo className="text-[9vw]" />
          <div className="flex flex-col items-start gap-5">
            <Heading3 className="mb-7 font-bold text-secondary-foreground">
              Lead UI Developer
            </Heading3>
            <PBody>Built a design system in Angular + Tailwind</PBody>
            <PBody>This site is in Remix + Tailwind + Vanilla-Extract</PBody>
          </div>
        </div>
        <PBodyLg className="mt-7 font-bold text-secondary-foreground">
          <a href="https://ageorge.dev" target="_blank" rel="noreferrer">
            https://ageorge.dev
          </a>
        </PBodyLg>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Why should you care?</Heading1>
        <PBodyMd className="fragment">
          <PointSeperator />
          Tailwind has been the subject of much controversy and you are curious!
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          You want/need/<b>have</b> to use it...
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          Tailwind has pretty much <em>"won"</em> the CSS-framework contest
        </PBodyMd>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>What I'm assuming of you</Heading1>
        <PBodyMd className="fragment">
          <PointSeperator />
          Good with CSS
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          Maybe have tried Tailwind CSS before
        </PBodyMd>
        <PBodyMd className="fragment">
          <PointSeperator />
          Knowledgeable on either React or Angular. Or else some other component
          based fremework.
        </PBodyMd>
      </SlideTypeCenter>

      <SlideTypeRegular heading={<Heading2>How I roll!</Heading2>}>
        <PBodyMd>Slides available at</PBodyMd>
        <a
          href="https://ageorge.dev/talks/tailwind"
          className={`text-secondary-foreground ${PBodyLg.classes}`}
          target="_blank"
          rel="noreferrer"
        >
          https:// <b>ageorge.dev</b> /talks/tailwind
        </a>
        <Heading4 className="mt-7 font-bold">
          Some slides have callouts
        </Heading4>
        <div className="grid max-w-[1200px] grid-cols-3">
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
    </section>
  );
}
