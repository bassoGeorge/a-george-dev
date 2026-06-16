import type { AbilityName } from '../../lib/models/abilities'
import { useCharacter } from '../CharacterSheet'
import styles from './SavingThrows.module.css'

const ABILITIES: { key: AbilityName; label: string }[] = [
  { key: 'strength', label: 'Strength' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'wisdom', label: 'Wisdom' },
  { key: 'charisma', label: 'Charisma' },
]

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function SavingThrows() {
  const { character, derived } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-[var(--s-parchment-400)] overflow-hidden`}
    >
      <h2 className="bg-destructive-surface-2 text-destructive-onsurface-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Saving Throws
      </h2>
      <div className="flex flex-col gap-0.5 p-2">
        {ABILITIES.map(({ key, label }) => {
          const isProficient = character.savingThrowProficiencies.includes(key)
          const total = derived.savingThrows[key]
          return (
            <div key={key} className="flex items-center gap-2 px-1 py-0.5">
              <span
                className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                  isProficient
                    ? 'bg-destructive-surface-2 border-destructive-surface-2'
                    : 'bg-white border-neutral-disabled'
                }`}
              />
              <span className="text-xs font-semibold text-destructive-foreground-3 w-7 text-right">
                {formatMod(total)}
              </span>
              <span className="text-xs text-neutral-strong">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
