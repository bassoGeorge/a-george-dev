import { BodyXl } from '@ageorgedev/atoms';
import { TwLogo } from '@ageorgedev/brand-components';
import { DeckFooter, useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';
import { S01Intro } from './slides/s01-intro';
import { S02Fundamentals } from './slides/s02-fundamentals';
import { S03AntiPatterns } from './slides/s03-anti-patterns';

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <div className="reveal w-full h-full" ref={presentationRef}>
      <div className="slides">
        <S01Intro />
        <S02Fundamentals />
        <S03AntiPatterns />
      </div>
      <DeckFooter>
        <TwLogo className="h-full" />
        <BodyXl className="text-cc-neutral-subtle">|</BodyXl>
        <BodyXl className="italic text-cc-neutral-subtle large-desktop:mt-2">
          Unfold UI
        </BodyXl>
      </DeckFooter>
    </div>
  );
}

export default TalkTailwind;
