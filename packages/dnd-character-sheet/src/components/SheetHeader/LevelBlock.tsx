import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { LabelUnder } from '../layout/labels';

export function LevelBlock() {
  const { character } = useCharacter();

  return (
    <div className="align-self-stretch flex flex-col gap-1 border-[3px] border-neutral-subdued bg-white items-center py-3 px-6 rounded-full my-2 bg-page-4 z-10 -ml-6">
      <BigNumber>
        {character.classes.reduce((total, cls) => total + cls.level, 0)}
      </BigNumber>
      <LabelUnder className="text-center">Level</LabelUnder>
      <div className="flex-1"></div>
      <LabelUnder className="text-center w-full">Xp</LabelUnder>
    </div>
  );
}
