import type { AbilityName } from '../../types/character'
import { useCharacter } from '../CharacterSheet'
import styles from './AbilityScores.module.css'

const ABILITIES: { key: AbilityName; label: string; abbr: string }[] = [
  { key: 'strength', label: 'Strength', abbr: 'STR' },
  { key: 'dexterity', label: 'Dexterity', abbr: 'DEX' },
  { key: 'constitution', label: 'Constitution', abbr: 'CON' },
  { key: 'intelligence', label: 'Intelligence', abbr: 'INT' },
  { key: 'wisdom', label: 'Wisdom', abbr: 'WIS' },
  { key: 'charisma', label: 'Charisma', abbr: 'CHA' },
]

function formatMod(mod: number): string {
  if (mod >= 0) return `+${mod}`
  return `${mod}`
}

export function AbilityScores() {
  const { character, derived } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-[var(--s-parchment-400)] overflow-hidden`}
    >
      <h2 className="bg-destructive-surface-2 text-destructive-onsurface-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Ability Scores
      </h2>
      <div className="flex flex-col gap-1 p-2">
        {ABILITIES.map(({ key, abbr }) => {
          const score = character.abilities[key]
          const mod = derived.abilityModifiers[key]
          return (
            <div
              key={key}
              className="flex items-center justify-between border border-[var(--s-parchment-400)] rounded px-2 py-1"
            >
              <span className="text-xs font-bold text-neutral-strong tracking-wider w-8">
                {abbr}
              </span>
              <span className="text-lg font-bold text-neutral-strong w-8 text-center">
                {score}
              </span>
              <span className="text-sm font-semibold text-destructive-foreground-3 w-8 text-right">
                {formatMod(mod)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
