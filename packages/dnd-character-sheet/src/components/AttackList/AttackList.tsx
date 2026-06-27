import { cn } from '@ageorgedev/toolbelt/cn';
import { ABILITY_DETAILS } from '../../lib/models/abilities';
import type { Attack, AttackDamage } from '../../lib/models/attacks';
import type { DerivedStats } from '../../lib/models/derived-stats';
import { formatModIgnoreZero } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { DiamondCheck } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function AttackList() {
  const { character, derived } = useCharacter();

  if (character.attacks.length === 0) return null;

  const showMasteries = character.attacks.some((atk) => atk.masteryProperty);

  return (
    <Panel topLeftCorner="scooped" topRightCorner="scooped">
      <PanelTitle>Weapons & Damage Cantrips</PanelTitle>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <Th>Name</Th>
              <Th>Atk / DC</Th>
              <Th>Damage & Type</Th>
              {showMasteries && <Th>Mastery</Th>}
              <Th>Notes</Th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {character.attacks.map((attack) => {
              const { bonusText, damageBonus } = calcAttackBonus(
                attack,
                derived
              );

              return (
                <tr
                  key={`attack ${attack.name}`}
                  className="border-b border-b-neutral-disabled odd:bg-page-3"
                >
                  <Td className="text-neutral-strong">{attack.name}</Td>
                  <Td>{bonusText}</Td>
                  <Td>{formatDamage(attack.damage, damageBonus)}</Td>
                  {attack.masteryProperty ? (
                    <Td>
                      <DiamondCheck className="align-[-.1em]" /> &nbsp;{' '}
                      {attack.masteryProperty}
                    </Td>
                  ) : showMasteries ? (
                    <Td></Td>
                  ) : null}
                  <Td className="text-xs">{attack.notes}</Td>
                </tr>
              );
            })}
            <EmptyRow showMastery={showMasteries} />
            <EmptyRow showMastery={showMasteries} />
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function EmptyRow({ showMastery }: { showMastery: boolean }) {
  return (
    <tr className="border-b border-b-neutral-disabled odd:bg-page-3">
      <Td>&nbsp;</Td>
      <Td />
      <Td />
      {showMastery && <Td />}
      <Td />
    </tr>
  );
}

function Th({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={cn(
        'px-1 py-1.5 text-left font-bold tracking-wider uppercase text-neutral-subdued text-xs',
        className
      )}
    />
  );
}

function Td({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={cn('px-1 py-1.5 text-sm', className)} />;
}

function calcAttackBonus(
  attack: Attack,
  derived: DerivedStats
): { bonusText: string; damageBonus: number } {
  switch (attack.kind) {
    case 'weapon': {
      const abilityMod = derived.abilityModifiers[attack.ability];
      const profBonus = attack.notProficient ? 0 : derived.proficiencyBonus;
      const base = abilityMod + profBonus + (attack.attackBonusMod ?? 0);
      return {
        bonusText: formatModIgnoreZero(base),
        damageBonus: abilityMod + (attack.attackBonusMod ?? 0),
      };
    }

    case 'spell-with-attack': {
      let spellAttackBonus = derived.spellAttackBonus ?? 0;
      if (attack.ability) {
        const abilityMod = derived.abilityModifiers[attack.ability];
        const profBonus = attack.notProficient ? 0 : derived.proficiencyBonus;
        spellAttackBonus = abilityMod + profBonus;
      }
      const totalAttackBonus = spellAttackBonus + (attack.attackBonusMod ?? 0);
      return {
        bonusText: formatModIgnoreZero(totalAttackBonus),
        damageBonus: 0 + (attack.attackBonusMod ?? 0),
      };
    }

    case 'spell-with-save': {
      let spellSaveDC = derived.spellSaveDC ?? 0;
      if (attack.ability) {
        const abilityMod = derived.abilityModifiers[attack.ability];
        const profBonus = attack.notProficient ? 0 : derived.proficiencyBonus;
        spellSaveDC = 8 + abilityMod + profBonus;
      }
      return {
        bonusText: `${ABILITY_DETAILS[attack.saveAbility].shortName} save, DC ${spellSaveDC}`,
        damageBonus: 0 + (attack.attackBonusMod ?? 0),
      };
    }
  }
}

function formatDamage(entries: AttackDamage[], mod: number): string {
  return entries
    .map((entry) => {
      const suffix = entry.disableModifier ? '' : formatModIgnoreZero(mod);
      return `${entry.dice}${suffix} ${entry.type}`;
    })
    .join(' + ');
}
