import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

function StatCell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Panel outerClasses="flex-1" className="flex flex-col items-center py-2">
      <PanelTitle className="mb-0">{label}</PanelTitle>
      <span className="text-xl">{children}</span>
    </Panel>
  );
}

export function CombatRow() {
  const { character, derived } = useCharacter();

  return (
    <div className={`flex gap-2`}>
      <StatCell label="Initiative">{formatMod(derived.initiative)}</StatCell>
      <StatCell label="Speed">{character.speed} ft.</StatCell>
      <StatCell label="Size">{character.size ?? 'Medium'}</StatCell>
      <StatCell label="Passive Perception">
        {derived.passivePerception}
      </StatCell>
    </div>
  );
}
