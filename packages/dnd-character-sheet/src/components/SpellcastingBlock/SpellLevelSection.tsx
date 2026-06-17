import type { Spell } from '../../lib/models/spellcasting'
import { SpellRow } from './SpellRow'

interface SpellLevelSectionProps {
  level: number
  spells: Spell[]
}

export function SpellLevelSection({ level, spells }: SpellLevelSectionProps) {
  const label = level === 0 ? 'Cantrips' : `Level ${level}`

  return (
    <div>
      <div className="bg-page-0 border-y border-[var(--s-parchment-400)] px-3 py-0.5">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-strong">
          {label}
        </span>
      </div>
      {spells.length > 0 && (
        <div
          className={
            level !== 0
              ? 'grid grid-cols-[auto_3fr_1fr_1fr_1fr_2fr_2fr]'
              : 'grid grid-cols-[3fr_1fr_1fr_1fr_2fr_2fr]'
          }
        >
          {spells.map((spell) => (
            <SpellRow
              key={`spell ${spell.name} ${spell.level}`}
              spell={spell}
              showPrepared={level !== 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}
