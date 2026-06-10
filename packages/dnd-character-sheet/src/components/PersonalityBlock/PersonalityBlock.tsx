import { useCharacter } from '../CharacterSheet'
import styles from './PersonalityBlock.module.css'

const FIELDS = [
  { key: 'traits', label: 'Personality Traits' },
  { key: 'ideals', label: 'Ideals' },
  { key: 'bonds', label: 'Bonds' },
  { key: 'flaws', label: 'Flaws' },
] as const

export function PersonalityBlock() {
  const { character } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-[var(--s-parchment-400)] overflow-hidden`}
    >
      <h2 className="bg-destructive-surface-2 text-destructive-onsurface-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Personality
      </h2>
      <div className="p-3 flex flex-col gap-2">
        {FIELDS.map(({ key, label }) => (
          <div
            key={key}
            className="border border-[var(--s-parchment-400)] rounded p-2"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-subdued mb-1">
              {label}
            </p>
            <p className="text-xs text-neutral-strong leading-relaxed">
              {character.personality[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
