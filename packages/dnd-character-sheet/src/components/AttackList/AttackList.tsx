import type { Attack, AttackDamage } from '../../types/character'
import { useCharacter } from '../CharacterSheet'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

function formatBonus(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`
}

function formatDamage(entries: AttackDamage[], mod: number): string {
  return entries
    .map((entry, i) => {
      if (i === 0) {
        const suffix = entry.disableModifier ? '' : formatBonus(mod)
        return `${entry.dice}${suffix} ${entry.type}`
      }
      return `+ ${entry.dice} ${entry.type}`
    })
    .join(' ')
}

function calcAttackBonus(
  attack: Attack,
  abilityMod: number,
  profBonus: number
): string {
  const base = abilityMod + profBonus + (attack.attackBonusOverride ?? 0)
  return formatBonus(base)
}

export function AttackList() {
  const { character, derived } = useCharacter()

  if (character.attacks.length === 0) return null

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Attacks</PanelTitle>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-sheet-parchment border-b border-sheet-border">
              <Th>Name</Th>
              <Th>Bonus</Th>
              <Th>Damage</Th>
              <Th>Mastery</Th>
              <Th>Notes</Th>
            </tr>
          </thead>
          <tbody>
            {character.attacks.map((attack, i) => {
              const abilityMod =
                attack.abilityKey === 'STR'
                  ? derived.abilityModifiers.strength
                  : derived.abilityModifiers.dexterity
              const bonus = calcAttackBonus(
                attack,
                abilityMod,
                derived.proficiencyBonus
              )

              return (
                <tr
                  key={i}
                  className="border-b border-sheet-border last:border-0 hover:bg-sheet-parchment/50"
                >
                  <Td className="font-semibold text-sheet-dark">
                    {attack.name}
                  </Td>
                  <Td className="font-bold text-sheet-red text-center">
                    {bonus}
                  </Td>
                  <Td>{formatDamage(attack.damage, abilityMod)}</Td>
                  <Td>{attack.masteryProperty ?? '—'}</Td>
                  <Td>{attack.notes ?? '—'}</Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-1.5 text-left font-bold uppercase tracking-wider text-gray-500">
      {children}
    </th>
  )
}

function Td({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <td className={`px-3 py-1.5 ${className}`}>{children}</td>
}
