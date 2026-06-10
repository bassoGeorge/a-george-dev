import type { AbilityName, Spell } from '../../types/character'
import { CircleCheck } from '../layout/CircleCheck'

const ABILITY_SHORT: Record<AbilityName, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
}

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
  return <span className="text-gray-500 text-xs">{flags.join(' ')}</span>
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded px-1 py-0.5 text-[10px] font-semibold bg-sheet-parchment border border-sheet-border text-sheet-dark leading-none">
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
        <div className="px-2 py-1 flex items-center border-b border-sheet-border">
          <CircleCheck checked={spell.alwaysPrepared ? 'special' : false} />
        </div>
      ) : null}
      <div className="px-3 py-1 font-semibold text-sheet-dark text-xs border-b border-sheet-border">
        {spell.name}
      </div>
      <div className="px-2 py-1 text-xs border-b border-sheet-border">
        <ComponentFlags spell={spell} />
      </div>
      <div className="px-2 py-1 text-xs text-gray-600 border-b border-sheet-border">
        {spell.castingTime}
      </div>
      <div className="px-2 py-1 text-xs text-gray-600 border-b border-sheet-border">
        {spell.range}
      </div>
      <div className="px-2 py-1 text-xs text-gray-600 border-b border-sheet-border">
        {spell.duration}
      </div>
      <div className="px-2 py-1 border-b border-sheet-border">
        <div className="flex flex-wrap gap-0.5">
          {spell.concentration && <Badge>C</Badge>}
          {spell.ritual && <Badge>R</Badge>}
          {spell.alwaysPrepared && <Badge>★</Badge>}
          {spell.freeUses != null && <Badge>free×{spell.freeUses}</Badge>}
          {spell.alternativeAbility && (
            <Badge>{ABILITY_SHORT[spell.alternativeAbility]}</Badge>
          )}
        </div>
      </div>
    </>
  )
}
