import { BodyXl } from '@ageorgedev/atoms';
import { TwLogo } from '@ageorgedev/brand-components';
import { DeckFooter, useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';
import { S01Intro } from './slides/s01-intro';
import { S02Fundamentals } from './slides/s02-fundamentals';

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <div className="reveal w-full h-full" ref={presentationRef}>
      <div className="slides">
        <S01Intro />
        <S02Fundamentals />
      </div>
      <DeckFooter>
        <TwLogo className="h-full" />
        <BodyXl className="text-cc-neutral-300">|</BodyXl>
        <BodyXl className="italic text-cc-neutral-300 large-desktop:mt-2">
          Unfold UI
        </BodyXl>
      </DeckFooter>
    </div>
  );
}

export default TalkTailwind;
