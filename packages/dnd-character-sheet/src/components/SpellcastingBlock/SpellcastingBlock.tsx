import { ABILITY_DETAILS } from '../../lib/models';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { EmptyCheckList } from '../layout/checkables';
import { LabelUnder } from '../layout/labels';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function SpellcastingBlock() {
  return (
    <div className="flex gap-3 items-end">
      <SpellAbilityPanel />
      <SpellSlotsPanel />
    </div>
  );
}

function SpellAbilityPanel(props: PanelProps) {
  const { character, derived } = useCharacter();

  if (!character.spellcasting) {
    return null;
  }

  return (
    <Panel topLeftCorner="scooped" {...props}>
      <h3 className="text-xl text-center">
        {ABILITY_DETAILS[character.spellcasting.ability].label}
      </h3>
      <LabelUnder className="text-center">Spellcasting Ability</LabelUnder>

      <div className="grid grid-cols-[3fr_1fr] items-baseline gap-x-3 gap-y-1">
        <span className="font-interface">Spellcasting Modifier</span>
        <BigNumber className="text-2xl text-right">
          {formatMod(derived.abilityModifiers[character.spellcasting.ability])}
        </BigNumber>

        <span className="font-interface">Spellcasting Save DC</span>
        <BigNumber className="text-2xl text-right">
          {derived.spellSaveDC}
        </BigNumber>

        <span className="font-interface">Spellcasting Attack Bonus</span>
        <BigNumber className="text-2xl text-right">
          {formatMod(derived.spellAttackBonus ?? 0)}
        </BigNumber>
      </div>
    </Panel>
  );
}

function SpellSlotsPanel(props: PanelProps) {
  const { character } = useCharacter();
  const { spellcasting } = character;
  if (!spellcasting) return null;

  const slotLevels = spellcasting.slots
    ? (Object.entries(spellcasting.slots) as [string, number][]).sort(
        ([a], [b]) => Number(a) - Number(b)
      )
    : [];

  return (
    <Panel {...props}>
      <PanelTitle>Spell Slots</PanelTitle>

      <div className="columns-2 gap-3 *:mt-1 *:first:mt-0 mt-3">
        {spellcasting.pactMagic && (
          <div className="flex gap-1 items-center">
            <span className="text-xs text-neutral-subdued">
              Pact Magic level {spellcasting.pactMagic.level}
            </span>
            <div className="flex-1 border-b border-dotted border-neutral-subdued"></div>
            <EmptyCheckList count={spellcasting.pactMagic.slots} />
          </div>
        )}

        {slotLevels.map(([level, count]) => (
          <div key={level} className="flex gap-1 items-center">
            <span className="text-xs text-neutral-subdued">Level {level}</span>
            <div className="flex-1 border-b border-dotted border-neutral-subdued"></div>
            <EmptyCheckList count={count} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

// export function SpellcastingBlock() {
//   const { character } = useCharacter();
//   const { spellcasting } = character;
//   if (!spellcasting) return null;

//   // Collect all levels that have spells or defined slots
//   const spellsByLevel = new Map<number, Spell[]>();

//   for (const spell of spellcasting.spells) {
//     const bucket = spellsByLevel.get(spell.level) ?? [];
//     bucket.push(spell);
//     spellsByLevel.set(spell.level, bucket);
//   }

//   // Ensure levels with slots but no spells still appear
//   if (spellcasting.slots) {
//     for (const levelStr of Object.keys(spellcasting.slots)) {
//       const level = Number(levelStr);
//       if (!spellsByLevel.has(level)) {
//         spellsByLevel.set(level, []);
//       }
//     }
//   }

//   const sortedLevels = [...spellsByLevel.keys()].sort((a, b) => a - b);

//   return (
//     <Panel className={`overflow-hidden`}>
//       <PanelTitle className="px-3 py-1.5">Spellcasting</PanelTitle>
//       <SpellcastingHeader />
//       <div>
//         {sortedLevels.map((level) => (
//           <SpellLevelSection
//             key={level}
//             level={level}
//             spells={spellsByLevel.get(level) ?? []}
//           />
//         ))}
//       </div>
//     </Panel>
//   );
// }
