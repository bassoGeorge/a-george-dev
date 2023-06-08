import { BodyLg, Heading1 } from '@ageorgedev/atoms';
import { TwLogo } from '@ageorgedev/brand-components';
import { useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <div className="reveal w-full h-full" ref={presentationRef}>
      <div className="slides">
        <section>
          <Heading1>Beyond prototyping with Tailwind CSS</Heading1>
          <BodyLg className="mt-5">Advanced strategies for production</BodyLg>

          <footer className="flex justify-center gap-2 h-5 mt-10">
            <TwLogo />
          </footer>
        </section>
        <section>
          <Heading1>Slide 2</Heading1>
        </section>
      </div>
    </div>
  );
}

export default TalkTailwind;
