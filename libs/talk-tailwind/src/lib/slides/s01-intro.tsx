import { Heading1, Heading3, PBody, PBodyMd } from '@ageorgedev/atoms';
import { SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S01Intro() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading1>
          Beyond prototyping with{' '}
          <span className="font-bold text-cc-accent">Tailwind CSS</span>
        </Heading1>
        <PBodyMd className="italic">Advanced strategies for production</PBodyMd>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Why should you care?</Heading1>
        <PBodyMd className="fragment">
          Tailwind has been the subject of much controversy and you are curious!
        </PBodyMd>
        <PBodyMd className="fragment">
          You want/need/<b>have</b> to use it...
        </PBodyMd>
        <Heading3 className="fragment mt-10 text-cc-accent font-bold">
          Welcome to this talk and strap in!
        </Heading3>
      </SlideTypeCenter>
      <SlideTypeCenter>
        <Heading1>Topics covered</Heading1>
        <PBody>Fundamentals of Tailwind CSS</PBody>
        <PBody>Anti-patterns</PBody>
        <PBody>strategy: Lean configuration</PBody>
        <PBody>strategy: Componentisation</PBody>
        <PBody>strategy: Theming with overrides</PBody>
        <PBody>strategy: Dark mode</PBody>
        <PBody>strategy: Plugins</PBody>
        <PBody>strategy: CSS-in-JS</PBody>
      </SlideTypeCenter>
    </section>
  );
}
