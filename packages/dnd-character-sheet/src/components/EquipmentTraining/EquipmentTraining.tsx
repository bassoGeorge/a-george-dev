import { cn } from '@ageorgedev/toolbelt/cn';
import { useCharacter } from '../CharacterSheet';
import { DiamondCheck } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

const ARMOR_TYPES: { key: string; label: string }[] = [
  { key: 'Light armor', label: 'Light' },
  { key: 'Medium armor', label: 'Medium' },
  { key: 'Heavy armor', label: 'Heavy' },
  { key: 'Shields', label: 'Shields' },
];

export function EquipmentTraining() {
  const { character } = useCharacter();

  return (
    <Panel outerClasses="flex-1" className={`flex flex-col divide-y`}>
      <PanelTitle className="pb-2">
        Equipment Training & Proficiencies
      </PanelTitle>
      <div className="py-3 flex flex-row gap-2">
        <SectionTitle className="w-min mr-1">Armor Training</SectionTitle>
        {ARMOR_TYPES.map(({ key, label }) => {
          const trained = character.armorProficiencies.includes(key);
          return (
            <div key={key} className="flex items-center gap-1">
              <DiamondCheck checked={trained} />
              <span className="text-xs">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="py-3">
        <SectionTitle>Weapons</SectionTitle>
        <p className="text-sm">{character.weaponProficiencies.join(', ')}</p>
      </div>

      <div className="py-3">
        <SectionTitle>Tools</SectionTitle>
        <p className="text-sm">{character.toolProficiencies.join(', ')}</p>
      </div>
    </Panel>
  );
}

function SectionTitle({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        'text-xs font-bold font-interface text-neutral-subdued',
        className
      )}
    />
  );
}
