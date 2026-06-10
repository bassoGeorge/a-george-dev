import { useCharacter } from '../CharacterSheet'
import { CircleCheck } from '../layout/CircleCheck'

const ABILITY_LABELS: Record<string, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
}

function formatBonus(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`
}

export function SpellcastingHeader() {
  const { character, derived } = useCharacter()
  const { spellcasting } = character
  if (!spellcasting) return null

  const abilityLabel =
    ABILITY_LABELS[spellcasting.ability] ?? spellcasting.ability
  const slotLevels = spellcasting.slots
    ? (Object.entries(spellcasting.slots) as [string, number][]).sort(
        ([a], [b]) => Number(a) - Number(b)
      )
    : []

  return (
    <div className="px-3 py-2 border-b border-[var(--s-parchment-400)]">
      <div className="flex gap-4 items-center mb-2">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-neutral-subdued">
            Ability
          </span>
          <span className="text-sm font-bold text-neutral-strong">
            {abilityLabel}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-neutral-subdued">
            Save DC
          </span>
          <span className="text-sm font-bold text-neutral-strong">
            {derived.spellSaveDC ?? '—'}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wider text-neutral-subdued">
            Spell Attack
          </span>
          <span className="text-sm font-bold text-neutral-strong">
            {derived.spellAttackBonus != null
              ? formatBonus(derived.spellAttackBonus)
              : '—'}
          </span>
        </div>
      </div>

      {slotLevels.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-subdued w-10">
            Slots
          </span>
          {slotLevels.map(([level, count]) => (
            <div key={level} className="flex items-center gap-1">
              <span className="text-xs text-neutral-subdued w-3 text-right">
                {level}:
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: count }, (_, i) => (
                  <CircleCheck key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {spellcasting.pactMagic && (
        <div className="flex items-center gap-3 flex-wrap mt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-subdued w-10">
            Pact
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-neutral-subdued w-3 text-right">
              {spellcasting.pactMagic.level}:
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: spellcasting.pactMagic.slots }, (_, i) => (
                <CircleCheck key={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
