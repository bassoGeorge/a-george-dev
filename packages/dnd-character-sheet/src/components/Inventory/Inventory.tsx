import { useCharacter } from '../CharacterSheet';
import { HandWrittenNotes } from '../HandwrittenNotes/HandwrittenNotes';
import { HorizontalDivider } from '../layout/dividers';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function Inventory(props: PanelProps) {
  const { character } = useCharacter();
  return (
    <Panel {...props} className="flex flex-col">
      <PanelTitle>Equipment</PanelTitle>
      <HorizontalDivider className="mt-1 mb-3" />
      {character.equipment.map((e) => (
        <div key={e}>{e}</div>
      ))}
      <HandWrittenNotes lineCount={10} className="flex-1" />
      <div>
        <h4>Magic Item Attunement</h4>
      </div>
    </Panel>
  );
}
