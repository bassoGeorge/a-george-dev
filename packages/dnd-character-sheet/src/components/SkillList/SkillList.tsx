import type { SkillName } from '../../types/character'
import { useCharacter } from '../CharacterSheet'
import styles from './SkillList.module.css'

const SKILLS: { key: SkillName; label: string; ability: string }[] = [
  { key: 'acrobatics', label: 'Acrobatics', ability: 'DEX' },
  { key: 'animalHandling', label: 'Animal Handling', ability: 'WIS' },
  { key: 'arcana', label: 'Arcana', ability: 'INT' },
  { key: 'athletics', label: 'Athletics', ability: 'STR' },
  { key: 'deception', label: 'Deception', ability: 'CHA' },
  { key: 'history', label: 'History', ability: 'INT' },
  { key: 'insight', label: 'Insight', ability: 'WIS' },
  { key: 'intimidation', label: 'Intimidation', ability: 'CHA' },
  { key: 'investigation', label: 'Investigation', ability: 'INT' },
  { key: 'medicine', label: 'Medicine', ability: 'WIS' },
  { key: 'nature', label: 'Nature', ability: 'INT' },
  { key: 'perception', label: 'Perception', ability: 'WIS' },
  { key: 'performance', label: 'Performance', ability: 'CHA' },
  { key: 'persuasion', label: 'Persuasion', ability: 'CHA' },
  { key: 'religion', label: 'Religion', ability: 'INT' },
  { key: 'sleightOfHand', label: 'Sleight of Hand', ability: 'DEX' },
  { key: 'stealth', label: 'Stealth', ability: 'DEX' },
  { key: 'survival', label: 'Survival', ability: 'WIS' },
]

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function SkillList() {
  const { character, derived } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-[var(--s-parchment-400)] overflow-hidden`}
    >
      <h2 className="bg-destructive-surface-2 text-destructive-onsurface-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Skills
      </h2>
      <div className="flex flex-col gap-0.5 p-2">
        {SKILLS.map(({ key, label, ability }) => {
          const isProficient = character.skillProficiencies.includes(key)
          const hasExpertise = character.skillExpertise.includes(key)
          const total = derived.skills[key]

          return (
            <div key={key} className="flex items-center gap-1.5 px-1 py-0.5">
              <span
                className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                  hasExpertise
                    ? 'bg-neutral-strong border-neutral-strong'
                    : isProficient
                      ? 'bg-destructive-surface-2 border-destructive-surface-2'
                      : 'bg-white border-neutral-disabled'
                }`}
                title={
                  hasExpertise ? 'Expertise' : isProficient ? 'Proficient' : ''
                }
              />
              <span className="text-xs font-semibold text-destructive-foreground-3 w-7 text-right flex-shrink-0">
                {formatMod(total)}
              </span>
              <span className="text-xs text-neutral-strong flex-1">
                {label}
              </span>
              <span className="text-xs text-neutral-subdued w-7 text-right">
                {ability}
              </span>
            </div>
          )
        })}
      </div>
      <div className="border-t border-[var(--s-parchment-400)] px-3 py-1.5 flex items-center justify-between">
        <span className="text-xs text-neutral-subdued">Passive Perception</span>
        <span className="text-xs font-bold text-neutral-strong">
          {derived.passivePerception}
        </span>
      </div>
    </div>
  )
}
