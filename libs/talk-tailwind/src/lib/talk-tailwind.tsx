import { Body, Heading3 } from '@ageorgedev/atoms';
import useRevealJs from './hooks/useRevealJs';

export function TalkTailwind() {
  useRevealJs();

  return (
    <div>
      <div className="reveal w-full h-screen">
        <div className="slides">
          <section>
            <Heading3>Welcome to The Tailwid Talk</Heading3>
            <Body>Hopefully this picks up the styles</Body>
          </section>
          <section>Slide 2</section>
        </div>
      </div>
    </div>
  );
}

export default TalkTailwind;
