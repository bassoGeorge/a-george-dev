import { cn } from '@ageorgedev/toolbelt/cn';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

function StatCell({
  label,
  children,
  className,
  ...props
}: {
  label: string;
} & PanelProps) {
  return (
    <Panel
      outerClasses="flex-1"
      className={cn('flex flex-col items-center py-2', className)}
      {...props}
    >
      <PanelTitle className="mb-0">{label}</PanelTitle>
      <span className="text-xl">{children}</span>
    </Panel>
  );
}

export function CombatRow() {
  const { character, derived } = useCharacter();

  return (
    <div className={`flex gap-2`}>
      <StatCell label="Initiative" bottomLeftCorner="scooped">
        {formatMod(derived.initiative)}
      </StatCell>
      <StatCell label="Speed">{character.speed} ft.</StatCell>
      <StatCell label="Size">{character.size ?? 'Medium'}</StatCell>
      <StatCell label="Passive Perception" bottomRightCorner="scooped">
        {derived.passivePerception}
      </StatCell>
    </div>
  );
}
