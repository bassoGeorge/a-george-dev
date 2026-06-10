import { useCharacter } from '../CharacterSheet'
import styles from './EquipmentList.module.css'

const CURRENCY = ['pp', 'gp', 'ep', 'sp', 'cp'] as const

export function EquipmentList() {
  const { character } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-sheet-border overflow-hidden`}
    >
      <h2 className="bg-sheet-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Equipment
      </h2>

      <div className="p-3 border-b border-sheet-border">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
          Currency
        </p>
        <div className="flex gap-3">
          {CURRENCY.map((denom) => (
            <div key={denom} className="flex flex-col items-center">
              <span className="text-sm font-bold text-sheet-dark">
                {character.currency[denom]}
              </span>
              <span className="text-xs uppercase text-gray-400">{denom}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="p-3 flex flex-col gap-0.5">
        {character.equipment.map((item, i) => (
          <li
            key={i}
            className="text-xs text-sheet-dark flex items-start gap-1.5"
          >
            <span className="text-sheet-border mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
