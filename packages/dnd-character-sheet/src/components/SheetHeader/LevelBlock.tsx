import { cn } from '@ageorgedev/toolbelt/cn';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { LabelUnder } from '../layout/labels';
import { Panel } from '../layout/Panel';
import styles from './LevelBlock.module.css';

export function LevelBlock() {
  const { character } = useCharacter();

  return (
    <Panel
      outerClasses={cn(
        'align-self-stretch my-3 z-10 -ml-7',
        styles.ShieldShape
      )}
      className="flex flex-col gap-1 items-center py-3 px-6 bg-page-4"
    >
      <BigNumber>
        {character.classes.reduce((total, cls) => total + cls.level, 0)}
      </BigNumber>
      <LabelUnder className="text-center">Level</LabelUnder>
      <div className="flex-1"></div>
      <LabelUnder className="text-center w-full">Xp</LabelUnder>
    </Panel>
  );
}
