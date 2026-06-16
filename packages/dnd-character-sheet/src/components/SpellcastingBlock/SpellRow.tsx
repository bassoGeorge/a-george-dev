import { ABILITY_DETAILS } from '../../lib/models/abilities'
import type { Spell } from '../../lib/models/spellcasting'
import { CircleCheck } from '../layout/checkables'

function ComponentFlags({ spell }: { spell: Spell }) {
  const { components } = spell
  if (!components) return null
  const flags: string[] = []
  if (components.verbal) flags.push('V')
  if (components.somatic) flags.push('S')
  if (components.materialConsumed) flags.push('M*')
  else if (
    'materialConsumed' in components &&
    components.materialConsumed === false
  )
    flags.push('M')
  if (flags.length === 0) return null
  return <span className="text-neutral-subdued text-xs">{flags.join(' ')}</span>
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded px-1 py-0.5 text-[10px] font-semibold bg-page-0 border border-[var(--s-parchment-400)] text-neutral-strong leading-none">
      {children}
    </span>
  )
}

interface SpellRowProps {
  spell: Spell
  showPrepared: boolean
}

export function SpellRow({ spell, showPrepared }: SpellRowProps) {
  return (
    <>
      {showPrepared ? (
        <div className="px-2 py-1 flex items-center border-b border-[var(--s-parchment-400)]">
          <CircleCheck checked={spell.alwaysPrepared ? 'special' : false} />
        </div>
      ) : null}
      <div className="px-3 py-1 font-semibold text-neutral-strong text-xs border-b border-[var(--s-parchment-400)]">
        {spell.name}
      </div>
      <div className="px-2 py-1 text-xs border-b border-[var(--s-parchment-400)]">
        <ComponentFlags spell={spell} />
      </div>
      <div className="px-2 py-1 text-xs text-neutral-subdued border-b border-[var(--s-parchment-400)]">
        {spell.castingTime}
      </div>
      <div className="px-2 py-1 text-xs text-neutral-subdued border-b border-[var(--s-parchment-400)]">
        {spell.range}
      </div>
      <div className="px-2 py-1 text-xs text-neutral-subdued border-b border-[var(--s-parchment-400)]">
        {spell.duration}
      </div>
      <div className="px-2 py-1 border-b border-[var(--s-parchment-400)]">
        <div className="flex flex-wrap gap-0.5">
          {spell.concentration && <Badge>C</Badge>}
          {spell.ritual && <Badge>R</Badge>}
          {spell.alwaysPrepared && <Badge>★</Badge>}
          {spell.freeUses != null && <Badge>free×{spell.freeUses}</Badge>}
          {spell.alternativeAbility && (
            <Badge>{ABILITY_DETAILS[spell.alternativeAbility].shortName}</Badge>
          )}
        </div>
      </div>
    </>
  )
}
