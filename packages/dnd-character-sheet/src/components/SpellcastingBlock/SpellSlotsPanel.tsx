import { cn } from '@ageorgedev/toolbelt/cn';
import { useMemo } from 'react';
import { useCharacter } from '../CharacterSheet';
import { EmptyCheckList } from '../layout/checkables';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function SpellSlotsPanel(props: PanelProps) {
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
