import { useCharacter } from '../CharacterSheet'
import styles from './NotesBlock.module.css'

export function NotesBlock() {
  const { character } = useCharacter()

  if (!character.backstory && !character.notes) return null

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-sheet-border overflow-hidden`}
    >
      <h2 className="bg-sheet-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Notes
      </h2>
      <div className="p-3 flex flex-col gap-3">
        {character.backstory && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Backstory
            </p>
            <p className="text-xs text-sheet-dark leading-relaxed whitespace-pre-wrap">
              {character.backstory}
            </p>
          </div>
        )}
        {character.notes && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Notes
            </p>
            <p className="text-xs text-sheet-dark leading-relaxed whitespace-pre-wrap">
              {character.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
