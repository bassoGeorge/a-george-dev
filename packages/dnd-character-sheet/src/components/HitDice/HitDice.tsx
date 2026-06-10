import { useCharacter } from '../CharacterSheet'
import styles from './HitDice.module.css'

export function HitDice() {
  const { character } = useCharacter()
  const { hitDice } = character

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-[var(--s-parchment-400)] overflow-hidden`}
    >
      <h2 className="bg-destructive-surface-2 text-destructive-onsurface-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Hit Dice
      </h2>
      <div className="flex flex-col items-center py-3">
        <span className="text-2xl font-bold text-neutral-strong">
          {hitDice.total}
          {hitDice.dieType}
        </span>
        <span className="text-xs text-neutral-subdued uppercase tracking-wide mt-0.5">
          Total
        </span>
      </div>
    </div>
  )
}
