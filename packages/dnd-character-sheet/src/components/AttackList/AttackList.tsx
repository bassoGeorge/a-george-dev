import type { Attack, AttackDamage } from '../../types/character'
import { useCharacter } from '../CharacterSheet'
import { DiamondCheck } from '../layout/checkables'
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
    <Panel>
      <PanelTitle className="mb-2">Weapons & Damage Cantrips</PanelTitle>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <Th>Name</Th>
              <Th>Attack Bonus / DC</Th>
              <Th>Damage & Type</Th>
              <Th>Mastery</Th>
              <Th>Notes</Th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {character.attacks.map((attack) => {
              const abilityMod = derived.abilityModifiers[attack.ability]
              const bonus = calcAttackBonus(
                attack,
                abilityMod,
                derived.proficiencyBonus
              )

              return (
                <tr
                  key={`attack ${attack.name}`}
                  className="hover:bg-page-0/50"
                >
                  <Td className="font-semibold text-neutral-strong">
                    {attack.name}
                  </Td>
                  <Td>{bonus}</Td>
                  <Td>{formatDamage(attack.damage, abilityMod)}</Td>
                  {attack.masteryProperty ? (
                    <Td>
                      <DiamondCheck /> &nbsp; {attack.masteryProperty}
                    </Td>
                  ) : (
                    <Td>—</Td>
                  )}
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
    <th className="px-3 py-1.5 text-left font-bold tracking-wider text-neutral-subdued">
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
