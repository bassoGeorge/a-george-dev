import { useCharacter } from '../CharacterSheet'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

function StatCell({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Panel outerClasses="flex-1" className="flex flex-col items-center py-2">
      <PanelTitle>{label}</PanelTitle>
      <span className="text-2xl">{children}</span>
      {/* <span className="text-xs uppercase tracking-wider text-gray-500 mt-0.5">
        {label}
      </span> */}
    </Panel>
  )
}

export function CombatRow() {
  const { character, derived } = useCharacter()

  return (
    <div className={`flex gap-2`}>
      <StatCell label="Initiative">{formatMod(derived.initiative)}</StatCell>
      <StatCell label="Speed">{character.speed} ft.</StatCell>
      <StatCell label="Size">{character.size ?? 'Medium'}</StatCell>
      <StatCell label="Passive Perception">
        {derived.passivePerception}
      </StatCell>
    </div>
  )
}
