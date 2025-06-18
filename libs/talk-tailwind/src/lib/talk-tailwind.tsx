import { BodyXl } from '@ageorgedev/design-system';
import { TwLogo } from '@ageorgedev/brand-components';
import { DeckFooter, useRevealFramework } from '@ageorgedev/reveal-framework';
import { useRef } from 'react';
import { S01Intro } from './slides/s01-intro';
import { S02Fundamentals } from './slides/s02-fundamentals';
import { S03AntiPatterns } from './slides/s03-anti-patterns';
import { S04LeanConfig } from './slides/s04-lean-config';
import { S05ClassManagement } from './slides/s05-class-mgt';
import { S07OverrideTheming } from './slides/s07-override-theming';
import { IconContext } from '@phosphor-icons/react';
import { S08DarkMode } from './slides/s08-dark-mode';
import { S09CssInJs } from './slides/s09-css-in-js';
import { S06Plugins } from './slides/s06-plugins';
import { S10Outro } from './slides/s10-outro';
import { S04BCognitiveLoad } from './slides/s04b-cognitive-load';

export function TalkTailwind() {
  const presentationRef = useRef(null);
  useRevealFramework(presentationRef);

  return (
    <IconContext.Provider value={{ weight: 'duotone', size: '1em' }}>
      <div className="h-screen w-full">
        <div className="reveal" ref={presentationRef}>
          <div className="slides">
            <S01Intro />
            <S02Fundamentals />
            <S03AntiPatterns />
            <S04LeanConfig />
            <S04BCognitiveLoad />
            <S05ClassManagement />
            <S06Plugins />
            <S07OverrideTheming />
            <S08DarkMode />
            <S09CssInJs />
            <S10Outro />
          </div>
          <DeckFooter>
            <TwLogo className="h-full" />
            <BodyXl className="text-cc-neutral-subtle">|</BodyXl>
            <BodyXl className="text-cc-neutral-subtle italic large-desktop:mt-2">
              Unfold UI
            </BodyXl>
          </DeckFooter>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default TalkTailwind;
