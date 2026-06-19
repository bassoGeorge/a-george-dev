import { cn } from '@ageorgedev/toolbelt/cn';
import { useMemo } from 'react';
import { ABILITY_DETAILS, type Spell } from '../../lib/models';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { BigNumber } from '../layout/BigNumber';
import {
  CircleCheck,
  DiamondCheck,
  EmptyCheckList,
} from '../layout/checkables';
import { HorizontalDivider } from '../layout/dividers';
import { LabelUnder } from '../layout/labels';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function SpellcastingBlock() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex gap-3 items-end">
        <SpellAbilityPanel />
        <SpellSlotsPanel />
      </div>
      <SpellListAsTable />
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
  const {
    character: { spellcasting },
  } = useCharacter();

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

function SpellListAsTable() {
  const {
    character: { spellcasting },
  } = useCharacter();

  const totalRows = 38; // Eyeballed for typical a4 size
  const emptyRows = totalRows - (spellcasting?.spells.length ?? 0);

  return (
    <Panel outerClasses="flex-1">
      <PanelTitle>Spells</PanelTitle>
      <HorizontalDivider className="mt-2 my-3" />
      <table className="w-full">
        <thead>
          <tr>
            <Th>Prep</Th>
            <Th>Level</Th>
            <Th>&nbsp; Name</Th>
            <Th>Casting Time</Th>
            <Th>Range</Th>
            <Th>Duration</Th>
            <Th>Concentration, Ritual & Material consumed</Th>
            <Th>Notes</Th>
          </tr>
        </thead>
        <tbody>
          {spellcasting?.spells.map((spell) => (
            <SpellTableRow spell={spell} key={spell.name} />
          ))}
          {Array.from({ length: emptyRows }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: not required for this
            <EmptyRow key={i} />
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

function EmptyRow() {
  return (
    <tr className="border-b border-b-neutral-disabled">
      <Td className="border-l-0" />
      <Td className="text-sm">&nbsp;</Td> {/* Adds the text height required */}
      <Td />
      <Td />
      <Td />
      <Td />
      <Td className="w-[16ch]">
        <span className="inline-block mr-2">
          <DiamondCheck /> C
        </span>
        <span className="inline-block mr-2">
          <DiamondCheck /> R
        </span>
        <span className="inline-block">
          <DiamondCheck /> M
        </span>
      </Td>
      <Td className="border-r-0" />
    </tr>
  );
}

function SpellTableRow({ spell }: { spell: Spell }) {
  return (
    <tr className="border-b border-b-neutral-disabled">
      <Td className="w-[3ch] border-l-0">
        {spell.alwaysPrepared ? (
          <span className="italic text-neutral-subdued font-interface">AP</span>
        ) : (
          <CircleCheck className="align-[-.1em]" />
        )}
      </Td>
      <Td className="w-[2ch] text-sm">{spell.level}</Td>
      <Td>
        <div className="flex justify-between align-baseline">
          <span className="text-sm">{spell.name}</span>

          {!!spell.freeUses && (
            <span>
              <em className="text-neutral-subdued">free x{spell.freeUses}</em>{' '}
              <EmptyCheckList
                className="align-[-.2em]"
                count={spell.freeUses}
              />{' '}
              &nbsp;
            </span>
          )}
        </div>
      </Td>
      <Td className="w-[10ch]">{spell.castingTime}</Td>
      <Td className="w-[8ch]">{spell.range}</Td>
      <Td className="w-[8ch]">{spell.duration}</Td>
      <Td className="w-[18ch]">
        <span className="inline-block mr-2">
          <DiamondCheck checked={spell.concentration} /> C
        </span>
        <span className="inline-block mr-2">
          <DiamondCheck checked={spell.ritual} /> R
        </span>
        <span className="inline-block">
          <DiamondCheck /> M
        </span>
      </Td>
      {/* TODO: components */}
      {/* TODO: Alternative ability */}
      <Td className="border-r-0">{spell.notes}</Td>
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
        'text-xs font-interface text-neutral-subdued text-left pb-2 leading-3',
        className
      )}
    />
  );
}

function Td({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={cn(
        'border-x border-neutral-disabled px-2 py-1 text-xs',
        className
      )}
    />
  );
}
