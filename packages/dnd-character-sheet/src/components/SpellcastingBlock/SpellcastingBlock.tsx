import { SpellAbilityPanel } from './SpellAbilityPanel';
import { SpellList } from './SpellList';
import { SpellSlotsPanel } from './SpellSlotsPanel';

export function SpellcastingBlock() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex gap-3 items-end">
        <SpellAbilityPanel />
        <SpellSlotsPanel />
      </div>
      <SpellList />
    </div>
  );
}
