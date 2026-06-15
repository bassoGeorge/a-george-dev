import { cn } from '@ageorgedev/toolbelt/cn'
import { useCharacter } from '../CharacterSheet'
import { DiamondCheck } from '../layout/checkables'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'
import { HorizontalSubPanel } from '../layout/SubPanel'

const ARMOR_TYPES: { key: string; label: string }[] = [
  { key: 'Light armor', label: 'Light' },
  { key: 'Medium armor', label: 'Medium' },
  { key: 'Heavy armor', label: 'Heavy' },
  { key: 'Shields', label: 'Shields' },
]

export function EquipmentTraining() {
  const { character } = useCharacter()

  return (
    <Panel className={`overflow-hidden flex flex-col`}>
      <HorizontalSubPanel className="py-2">
        <PanelTitle>Equipment Training & Proficiencies</PanelTitle>
      </HorizontalSubPanel>
      {/* <div className="p-3 flex flex-col gap-2"> */}
      <HorizontalSubPanel className="py-3 flex flex-row gap-2">
        <SectionTitle className="w-min mr-1">Armor Training</SectionTitle>
        {ARMOR_TYPES.map(({ key, label }) => {
          const trained = character.armorProficiencies.includes(key)
          return (
            <div key={key} className="flex items-center gap-1">
              <DiamondCheck checked={trained} />
              <span className="text-xs">{label}</span>
            </div>
          )
        })}
      </HorizontalSubPanel>

      <HorizontalSubPanel className="py-3">
        <SectionTitle>Weapons</SectionTitle>
        <p className="text-xs">{character.weaponProficiencies.join(', ')}</p>
      </HorizontalSubPanel>

      <HorizontalSubPanel className="py-3">
        <SectionTitle>Tools</SectionTitle>
        <p className="text-xs">{character.toolProficiencies.join(', ')}</p>
      </HorizontalSubPanel>
      {/* </div> */}
    </Panel>
  )
}

function SectionTitle({
  className,
  ...props
}: React.HtmlAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        'text-xs font-bold font-interface text-neutral-subdued',
        className
      )}
    />
  )
}
