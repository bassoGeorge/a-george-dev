import { TwLogo } from '@ageorgedev/brand-components';
import { BodyXl } from '@ageorgedev/design-system';
import { DeckFooter, Presentation } from '@ageorgedev/reveal-framework';
import { IconContext } from '@phosphor-icons/react';
import { S01Intro } from './slides/s01-intro';
import { S02Fundamentals } from './slides/s02-fundamentals';
import { S03AntiPatterns } from './slides/s03-anti-patterns';
import { S04LeanConfig } from './slides/s04-lean-config';
import { S04BCognitiveLoad } from './slides/s04b-cognitive-load';
import { S05ClassManagement } from './slides/s05-class-mgt';
import { S06Plugins } from './slides/s06-plugins';
import { S07OverrideTheming } from './slides/s07-override-theming';
import { S08DarkMode } from './slides/s08-dark-mode';
import { S09CssInJs } from './slides/s09-css-in-js';
import { S10Outro } from './slides/s10-outro';

export function TalkTailwind() {
  return (
    <IconContext.Provider value={{ weight: 'duotone', size: '1em' }}>
      <div className="h-[calc(100vh-90px)] w-full">
        <Presentation.Deck config={presentationConfig}>
          <div className="slides pt-4">
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
            <BodyXl className="text-neutral-subdued">|</BodyXl>
            <BodyXl className="text-neutral-subdued large-desktop:mt-2 italic">
              Unfold UI
            </BodyXl>
          </DeckFooter>
        </Presentation.Deck>
      </div>
    </IconContext.Provider>
  );
}

const presentationConfig: Presentation.DeckProps['config'] = {
  embedded: true,
  keyboardCondition: 'focused',
  controlsTutorial: false,
  disableLayout: true,
  transition: 'fade',
};

export default TalkTailwind;
