import { Body, Heading1 } from '@ageorgedev/atoms';
import { useRevealFramework } from '@ageorgedev/reveal-framework';

export function TalkTailwind() {
  useRevealFramework();

  return (
    <div>
      <div className="reveal w-full h-screen">
        <div className="slides">
          <section>
            <Heading1>Welcome to The Tailwind Talk</Heading1>
            <Body>Just a testing slide for now</Body>
          </section>
          <section>Slide 2</section>
        </div>
      </div>
    </div>
  );
}

export default TalkTailwind;
