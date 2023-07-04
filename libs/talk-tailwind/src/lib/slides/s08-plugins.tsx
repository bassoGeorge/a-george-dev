import { Heading1, Heading2, Heading3, PBody } from '@ageorgedev/atoms';
import { SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S08Plugins() {
  return (
    <section>
      <SlideTypeCenter>
        <Heading3 as="h1" className="italic">
          strategy #5
        </Heading3>
        <Heading1 as="h2" className="font-bold">
          Plugins
        </Heading1>
      </SlideTypeCenter>
    </section>
  );
}
