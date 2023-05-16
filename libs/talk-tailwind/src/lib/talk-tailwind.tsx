import { Body, BodyMd, Heading3 } from '@ageorgedev/atoms';
import useRevealJs from './hooks/useRevealJs';

export function TalkTailwind() {
  useRevealJs();

  return (
    <div>
      <div className="reveal w-full h-screen">
        <div className="slides">
          <section>
            <Heading3 className="border border-rc-p-accent-200">
              Welcome to The Tailwid Talk
            </Heading3>
            <Body>Just a testing slide for now</Body>
          </section>
          <section>Slide 2</section>
        </div>
      </div>
    </div>
  );
}

export default TalkTailwind;
