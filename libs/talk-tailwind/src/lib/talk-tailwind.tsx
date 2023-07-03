import { BodyXl } from '@ageorgedev/atoms';
import { TwLogo } from '@ageorgedev/brand-components';
import { DeckFooter, useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';
import { S01Intro } from './slides/s01-intro';
import { S02Fundamentals } from './slides/s02-fundamentals';
import { S03AntiPatterns } from './slides/s03-anti-patterns';
import { S04LeanConfig } from './slides/s04-lean-config';
import { S05ClassManagement } from './slides/s05-class-mgt';
import { S06OverrideTheming } from './slides/s06-override-theming';

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <div className="reveal w-full h-full" ref={presentationRef}>
      <div className="slides">
        <S01Intro />
        <S02Fundamentals />
        <S03AntiPatterns />
        <S04LeanConfig />
        <S05ClassManagement />
        <S06OverrideTheming />
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
