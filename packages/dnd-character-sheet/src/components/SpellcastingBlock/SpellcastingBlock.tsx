import { cn } from '@ageorgedev/toolbelt/cn';
import { useMemo } from 'react';
import { ABILITY_DETAILS } from '../../lib/models';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import { EmptyCheckList } from '../layout/checkables';
import { HorizontalDivider } from '../layout/dividers';
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

        <HorizontalDivider className="col-span-2" />

        <span className="font-interface">Spellcasting Save DC</span>
        <BigNumber className="text-2xl text-right">
          {derived.spellSaveDC}
        </BigNumber>

        <HorizontalDivider className="col-span-2" />

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

  const allSlots = useMemo(() => {
    const spellSlots = spellcasting?.slots
      ? (Object.entries(spellcasting.slots) as [string, number][])
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([level, slots]) => [`Level ${level}`, slots] as const)
      : [];

    const pactMagicSlots = spellcasting?.pactMagic
      ? [
          [
            `Pact Magic level ${spellcasting.pactMagic.level}`,
            spellcasting.pactMagic.slots,
          ] as const,
        ]
      : [];

    return [...pactMagicSlots, ...spellSlots];
  }, [spellcasting]);

  const columnStyle = useMemo(() => {
    switch (allSlots.length) {
      case 0:
      case 1:
        return '';
      case 2:
      case 4:
        return 'columns-2';
      default:
        return 'columns-3';
    }
  }, [allSlots]);

  if (!spellcasting) return null;

  return (
    <Panel
      outerClasses="flex-1"
      {...props}
      className="flex flex-col gap-3"
      topRightCorner="scooped"
    >
      <PanelTitle>Spell Slots</PanelTitle>
      <div className="text-xs text-neutral-subdued">
        Cantrips:{' '}
        <span className="text-neutral">
          {spellcasting.numberOfCantrips ?? 0}
        </span>
        , Prepared Spells:{' '}
        <span className="text-neutral">
          {spellcasting.numberOfPreparedSpells ?? 0}
        </span>
      </div>

      <div className={cn(columnStyle, 'gap-3 *:mt-1 *:first:mt-0')}>
        {allSlots.map(([name, count]) => (
          <div key={name} className="flex gap-1 items-center">
            <span className="text-xs text-neutral-subdued">{name}</span>
            <div className="flex-1 border-b border-dotted border-neutral-subdued"></div>
            <EmptyCheckList count={count} />
          </div>
        ))}
        {!allSlots.length && (
          <div className="text-xs text-neutral-subdued italic text-center">
            No Slots
          </div>
        )}
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
