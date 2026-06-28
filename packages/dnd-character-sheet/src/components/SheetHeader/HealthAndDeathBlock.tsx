import { useCharacter } from '../CharacterSheet';
import { EmptyCheckList } from '../layout/checkables';
import { VerticalDivider } from '../layout/dividers';
import { BasicLabel, LabelUnder } from '../layout/labels';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { VerticalSubPanel } from '../layout/SubPanel';

export function HealthAndDeathBlock() {
  const { character, derived } = useCharacter();
  return (
    <Panel className="flex p-0" topRightCorner="scooped">
      <VerticalSubPanel className="py-2 px-3 grid grid-rows-[max-content_1fr] grid-cols-[1fr_max-content_1fr] gap-2 items-end">
        <PanelTitle className="col-span-3">Hit Points</PanelTitle>
        <LabelUnder>Current</LabelUnder>
        <VerticalDivider />
        <div>
          <LabelUnder className="mb-2">Temp</LabelUnder>
          <span className="text-md">{character.hitPoints.maximum}</span>
          <LabelUnder>Max</LabelUnder>
        </div>
      </VerticalSubPanel>
      <VerticalSubPanel className="py-2 px-3 grid grid-rows-[max-content_1fr] grid-cols-1 gap-2 items-end">
        <PanelTitle>Hit Dice</PanelTitle>
        <div>
          <LabelUnder className="mb-2">Spent</LabelUnder>
          <span className="text-md">
            {derived.hitDice.map((d) => `${d.count}${d.dice}`).join(' + ')}
          </span>
          <LabelUnder>Max</LabelUnder>
        </div>
      </VerticalSubPanel>
      <VerticalSubPanel className="py-2 px-3 flex flex-col justify-start w-25">
        <PanelTitle className="text-left">
          Death
          <br />
          Saves
        </PanelTitle>
        <div>
          <EmptyCheckList count={3} kind="diamond" className="mb-1" />
          <BasicLabel>Successes</BasicLabel>
        </div>
        <div>
          <EmptyCheckList count={3} kind="diamond" className="mb-1" />
          <BasicLabel>Failures</BasicLabel>
        </div>
      </VerticalSubPanel>
    </Panel>
  );
}
