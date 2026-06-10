import { useCharacter } from '../CharacterSheet'
import styles from './EquipmentList.module.css'

const CURRENCY = ['pp', 'gp', 'ep', 'sp', 'cp'] as const

export function EquipmentList() {
  const { character } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-[var(--s-parchment-400)] overflow-hidden`}
    >
      <h2 className="bg-destructive-surface-2 text-destructive-onsurface-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Equipment
      </h2>

      <div className="p-3 border-b border-[var(--s-parchment-400)]">
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-subdued mb-1.5">
          Currency
        </p>
        <div className="flex gap-3">
          {CURRENCY.map((denom) => (
            <div key={denom} className="flex flex-col items-center">
              <span className="text-sm font-bold text-neutral-strong">
                {character.currency[denom]}
              </span>
              <span className="text-xs uppercase text-neutral-subdued">
                {denom}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="p-3 flex flex-col gap-0.5">
        {character.equipment.map((item, i) => (
          <li
            key={i}
            className="text-xs text-neutral-strong flex items-start gap-1.5"
          >
            <span className="text-[var(--s-parchment-400)] mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
