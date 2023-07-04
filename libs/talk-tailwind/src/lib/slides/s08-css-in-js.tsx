import { Heading1, Heading2, PBody, Heading3 } from '@ageorgedev/atoms';
import { SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S08CssInJs() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #5
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          CSS-in-JS shenanigans
        </Heading1>
      </SlideTypeCenter>
    </section>
  );
}
