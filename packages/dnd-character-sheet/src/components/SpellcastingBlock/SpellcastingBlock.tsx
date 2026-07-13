import { useVisualAdjustments } from '../VisualAdjustmentsContext';
import { GroupedSpellList } from './GroupedSpellList';
import { SpellAbilityPanel } from './SpellAbilityPanel';
import { SpellList } from './SpellList';
import { SpellSlotsPanel } from './SpellSlotsPanel';

export function SpellcastingBlock() {
  const { spellListMode } = useVisualAdjustments();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-end">
        <SpellAbilityPanel />
        <SpellSlotsPanel />
      </div>
      {spellListMode === 'grouped' ? <GroupedSpellList /> : <SpellList />}
    </div>
  );
}
