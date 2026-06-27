import { cn } from '@ageorgedev/toolbelt/cn';
import { ABILITY_DETAILS, type Spell } from '../../lib/models';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import {
  CircleCheck,
  DiamondCheck,
  EmptyCheckList,
} from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { useVisualAdjustments } from '../VisualAdjustmentsContext';

export function SpellList() {
  const {
    character: { spellcasting },
  } = useCharacter();

  const { spellRows } = useVisualAdjustments();
  const emptyRows = spellRows - (spellcasting?.spells.length ?? 0);

  return (
    <Panel outerClasses="flex-1 h-full" className="overflow-hidden">
      <PanelTitle withDivider>Spells</PanelTitle>
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
            <SpellRow spell={spell} key={spell.name} />
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

export function SpellRow({ spell }: { spell: Spell }) {
  const { derived } = useCharacter();
  const vs = [spell.components?.verbal && 'V', spell.components?.somatic && 'S']
    .filter(Boolean)
    .join(',');

  const freeUsesNode = !spell.freeUses ? null : (
    <span key="free-use">
      <em className="text-neutral-subdued">free x{spell.freeUses}</em>{' '}
      <EmptyCheckList className="align-[-.2em]" count={spell.freeUses} />
    </span>
  );

  const notesSection = [
    vs && <span key="vs">{vs}</span>,
    spell.notes && <span key="notes">{spell.notes}</span>,
  ].filter(Boolean);

  const castingTimeText = (() => {
    switch ((spell.castingTime ?? 'Action').toLowerCase()) {
      case 'action':
        return 'Action';
      case 'bonus action':
        return 'Bonus';
      default:
        return spell.castingTime;
    }
  })();

  const altAbilityNode = !spell.alternativeAbility
    ? null
    : (() => {
        const name = ABILITY_DETAILS[spell.alternativeAbility].shortName;
        const abilityMod = derived.abilityModifiers[spell.alternativeAbility];
        const toHit = formatMod(abilityMod + derived.proficiencyBonus);
        const dc = abilityMod + derived.proficiencyBonus + 8;
        return (
          <span className="text-xs italic text-neutral-subdued">
            ({name} spell, {toHit} to Hit, DC {dc})
          </span>
        );
      })();

  return (
    <tr className="border-b border-b-neutral-disabled odd:bg-page-3">
      <Td className="w-[3ch] border-l-0">
        {spell.alwaysPrepared ? (
          <span className="italic text-neutral-subdued font-interface">AP</span>
        ) : spell.level === 0 ? (
          <span />
        ) : (
          <CircleCheck className="align-[-.1em]" />
        )}
      </Td>
      <Td className="w-[2ch] text-sm">{spell.level}</Td>
      <Td>
        <div className="flex justify-between align-baseline flex-wrap">
          <span className="text-sm">{spell.name}</span>
          {freeUsesNode}
          {altAbilityNode}
        </div>
      </Td>
      <Td className="w-[10ch]">{castingTimeText}</Td>
      <Td className="w-[8ch]">{spell.range ?? 'Self'}</Td>
      <Td className="w-[8ch]">{spell.duration ?? 'Instant'}</Td>
      <CRMcell
        c={spell.concentration}
        r={spell.ritual}
        m={spell.components?.materialConsumed}
      />
      <Td className="border-r-0">
        {notesSection.map((node, idx) => (
          <>
            {node}
            {idx === notesSection.length - 1 ? '' : ' | '}
          </>
        ))}
      </Td>
    </tr>
  );
}

function EmptyRow() {
  return (
    <tr className="border-b border-b-neutral-disabled odd:bg-page-3">
      <Td className="border-l-0" />
      <Td className="text-sm">&nbsp;</Td> {/* Adds the text height required */}
      <Td />
      <Td />
      <Td />
      <Td />
      <CRMcell />
      <Td className="border-r-0" />
    </tr>
  );
}

function CRMcell({ c, r, m }: { c?: boolean; r?: boolean; m?: boolean }) {
  return (
    <Td className="w-[16ch]">
      <div className="flex items-center justify-between">
        <span>
          <DiamondCheck checked={c} /> C
        </span>
        <span>
          <DiamondCheck checked={r} /> R
        </span>
        <span>
          <DiamondCheck checked={m} /> M
        </span>
      </div>
    </Td>
  );
}

/** Utils */

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
