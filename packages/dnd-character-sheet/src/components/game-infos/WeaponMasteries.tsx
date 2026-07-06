import { filter, map, uniq } from 'ramda';
import { useMemo } from 'react';
import type { WeaponMasteryProperty } from '../../lib/models/weapon-properties';
import { useCharacter } from '../CharacterSheet';
import { GameInfoPanel, GameInfoPanelTitle } from '../layout/GameInfoPanel';

export function WeaponMasteries() {
  const { character } = useCharacter();
  const allMasteries = useMemo(
    () =>
      uniq(
        filter(
          Boolean,
          map((atk) => atk.masteryProperty, character.attacks)
        )
      ) as WeaponMasteryProperty[],
    [character]
  );

  if (allMasteries.length < 1) {
    return null;
  }

  return (
    <GameInfoPanel>
      <GameInfoPanelTitle>Weapon Mastery Properties</GameInfoPanelTitle>
      <div className="columns-3 gap-2 text-xs">
        {allMasteries.map((m) => (
          <div key={m}>
            <span className="font-bold">{m}. </span>
            <span>{Descriptions[m]}</span>
          </div>
        ))}
      </div>
    </GameInfoPanel>
  );
}

const Descriptions: Record<WeaponMasteryProperty, string> = {
  Cleave:
    'Once per turn, If you hit a creature with a melee attack roll using this weapon, you can make a melee attack roll with the weapon against a second creature within 5 ft of the first, that is also within your reach. On a hit, the second creature takes weapon damage without your ability modifier (unless the modifier is negative).',
  Graze:
    'If your attack roll with this weapon misses a creature, you ca n deal damage to the creature = ability modifier you used to make the attack roll.  Damage type = weapon damage type.',
  Nick: 'Once per turn, when you make the extra attack of the Light property, you can make it as part of the Attack action instead of as a Bonus action.',
  Push: 'If you hit a creature with this weapon, you can push the creature up to 10ft straight away from yourself if it is Large or smaller.',
  Sap: 'If you hit a creature with this weapon, that creature has Disadvantage on its next attack roll before the start of your next turn.',
  Slow: 'If you hit and deal damage to a creature with this weapon, you can reduce its Speed by 10ft until the start of your next turn. Speed reduction does not exceed 10ft for multiple hits with weapons of this property.',
  Topple:
    'If you hit a creature with this weapon, you can force a Con. saving throw (DC 8 + ability mod used to make this roll + proficiency bonus). On a failed save, the creature has Prone condition.',
  Vex: 'If you hit and deal damage to a creature with this weapon, you have Advantage on your next attack roll against that creature before the end of your next turn.',
};
