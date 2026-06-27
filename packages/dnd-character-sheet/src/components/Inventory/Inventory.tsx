import { useCharacter } from '../CharacterSheet';
import { HandWrittenNotes } from '../HandwrittenNotes/HandwrittenNotes';
import { DiamondCheck } from '../layout/checkables';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { useVisualAdjustments } from '../VisualAdjustmentsContext';

export function Inventory(props: PanelProps) {
  const { character } = useCharacter();
  const { inventoryRows } = useVisualAdjustments();
  return (
    <Panel {...props} className="flex flex-col">
      <PanelTitle withDivider>Equipment</PanelTitle>
      {character.equipment.map((e) => (
        <div key={e} className="text-sm">
          {e}
        </div>
      ))}
      <HandWrittenNotes lineCount={inventoryRows} className="flex-1" />
      <div>
        <h4 className="text-xs font-bold font-interface text-neutral-subdued">
          Magic Item Attunement
        </h4>

        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Not important
            <div key={i} className="flex items-end gap-2">
              <DiamondCheck />
              <div className="border-b border-dotted border-neutral-disabled flex-1">
                &nbsp;
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
