import { useCharacter } from '../CharacterSheet'
import styles from './HitDice.module.css'

export function HitDice() {
  const { character } = useCharacter()
  const { hitDice } = character

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-sheet-border overflow-hidden`}
    >
      <h2 className="bg-sheet-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Hit Dice
      </h2>
      <div className="flex flex-col items-center py-3">
        <span className="text-2xl font-bold text-sheet-dark">
          {hitDice.total}
          {hitDice.dieType}
        </span>
        <span className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
          Total
        </span>
      </div>
    </div>
  )
}
