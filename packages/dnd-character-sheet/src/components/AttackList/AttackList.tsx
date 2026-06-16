import type { Attack, AttackDamage } from '../../lib/models/attacks'
import type { DerivedStats } from '../../lib/models/derived-stats'
import { useCharacter } from '../CharacterSheet'
import { DiamondCheck } from '../layout/checkables'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

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
              const { bonusText, damageBonus } = calcAttackBonus(
                attack,
                derived
              )

              return (
                <tr
                  key={`attack ${attack.name}`}
                  className="hover:bg-page-0/50"
                >
                  <Td className="font-semibold text-neutral-strong">
                    {attack.name}
                  </Td>
                  <Td>{bonusText}</Td>
                  <Td>{formatDamage(attack.damage, damageBonus)}</Td>
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

function calcAttackBonus(
  attack: Attack,
  derived: DerivedStats
): { bonusText: string; damageBonus: number } {
  switch (attack.kind) {
    case 'weapon': {
      const abilityMod = derived.abilityModifiers[attack.ability]
      const profBonus = attack.notProficient ? 0 : derived.proficiencyBonus
      const base = abilityMod + profBonus + (attack.attackBonusMod ?? 0)
      return {
        bonusText: formatBonus(base),
        damageBonus: abilityMod + (attack.attackBonusMod ?? 0),
      }
    }

    case 'spell-with-attack': {
      let spellAttackBonus = derived.spellAttackBonus ?? 0
      if (attack.ability) {
        const abilityMod = derived.abilityModifiers[attack.ability]
        const profBonus = attack.notProficient ? 0 : derived.proficiencyBonus
        spellAttackBonus = abilityMod + profBonus
      }
      const totalAttackBonus = spellAttackBonus + (attack.attackBonusMod ?? 0)
      return {
        bonusText: formatBonus(totalAttackBonus),
        damageBonus: 0 + (attack.attackBonusMod ?? 0),
      }
    }

    case 'spell-with-save': {
      let spellSaveDC = derived.spellSaveDC ?? 0
      if (attack.ability) {
        const abilityMod = derived.abilityModifiers[attack.ability]
        const profBonus = attack.notProficient ? 0 : derived.proficiencyBonus
        spellSaveDC = 8 + abilityMod + profBonus
      }
      return {
        bonusText: `${attack.saveAbility} save, DC ${spellSaveDC}`,
        damageBonus: 0 + (attack.attackBonusMod ?? 0),
      }
    }
  }
}

function formatDamage(entries: AttackDamage[], mod: number): string {
  return entries
    .map((entry) => {
      const suffix = entry.disableModifier ? '' : formatBonus(mod)
      return `${entry.dice}${suffix} ${entry.type}`
    })
    .join(' + ')
}

function formatBonus(n: number): string {
  return n === 0 ? '' : n > 0 ? `+${n}` : `${n}`
}
