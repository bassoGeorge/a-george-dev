import { useCharacter } from '../CharacterSheet'
import { DiamondCheck } from '../layout/DiamondCheck'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

const ARMOR_TYPES: { key: string; label: string }[] = [
  { key: 'Light armor', label: 'Light' },
  { key: 'Medium armor', label: 'Medium' },
  { key: 'Heavy armor', label: 'Heavy' },
  { key: 'Shields', label: 'Shields' },
]

export function EquipmentTraining() {
  const { character } = useCharacter()

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Equipment Training</PanelTitle>
      <div className="p-3 flex flex-col gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-subdued mb-1.5">
            Armor
          </p>
          <div className="flex flex-row gap-3">
            {ARMOR_TYPES.map(({ key, label }) => {
              const trained = character.armorProficiencies.includes(key)
              return (
                <div key={key} className="flex items-center gap-1.5">
                  <DiamondCheck checked={trained} />
                  <span className="text-xs text-neutral-strong">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-[var(--s-parchment-400)] pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-subdued mb-1">
            Weapons
          </p>
          <p className="text-xs text-neutral-strong leading-relaxed">
            {character.weaponProficiencies.join(', ')}
          </p>
        </div>

        <div className="border-t border-[var(--s-parchment-400)] pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-subdued mb-1">
            Tools
          </p>
          <p className="text-xs text-neutral-strong leading-relaxed">
            {character.toolProficiencies.join(', ')}
          </p>
        </div>
      </div>
    </Panel>
  )
}
