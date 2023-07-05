import { Heading1, Heading3 } from '@ageorgedev/atoms';
import { SlideTypeCenter } from '@ageorgedev/reveal-framework';

export function S10Outro() {
  return (
    <section>
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
