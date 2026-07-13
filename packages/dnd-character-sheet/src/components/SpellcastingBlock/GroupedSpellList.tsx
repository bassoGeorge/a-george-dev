import { cn } from '@ageorgedev/toolbelt/cn';
import { groupBy, sortBy } from 'ramda';
import { ABILITY_DETAILS, type Spell } from '../../lib/models';
import { formatMod } from '../../lib/utils';
import { useCharacter } from '../CharacterSheet';
import { CircleCheck, EmptyCheckList } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function GroupedSpellList() {
  const {
    character: { spellcasting },
  } = useCharacter();

  const spells = spellcasting?.spells ?? [];
  const sorted = sortBy(
    (s) => [s.level, s.alwaysPrepared ? 0 : 1, s.name] as unknown as number,
    spells
  );
  const grouped = groupBy((s) => String(s.level), sorted);
  const levels = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Panel outerClasses="flex-1 h-full" className="overflow-hidden">
      <PanelTitle withDivider>Spells</PanelTitle>
      <div className="flex flex-col gap-4">
        {levels.map((level) => (
          <LevelGroup
            key={level}
            level={level}
            spells={grouped[String(level)]}
          />
        ))}
      </div>
    </Panel>
  );
}

function LevelGroup({ level, spells }: { level: number; spells: Spell[] }) {
  return (
    <div>
      <h3 className="text-xs font-interface text-neutral-subdued pb-1 border-b border-neutral-disabled mb-2">
        {level === 0 ? 'Cantrips' : `Level ${level}`}
      </h3>
      <div className="grid grid-cols-3 gap-x-3 gap-y-1">
        {spells.map((spell) => (
          <SpellCell key={spell.name} spell={spell} isCantrip={level === 0} />
        ))}
      </div>
    </div>
  );
}

function SpellCell({ spell, isCantrip }: { spell: Spell; isCantrip: boolean }) {
  const { derived } = useCharacter();

  const crmLetters = [
    spell.concentration && 'C',
    spell.ritual && 'R',
    spell.components?.materialConsumed && 'M',
  ]
    .filter(Boolean)
    .join(', ');

  const altAbilityText = spell.alternativeAbility
    ? (() => {
        const name = ABILITY_DETAILS[spell.alternativeAbility].shortName;
        const abilityMod = derived.abilityModifiers[spell.alternativeAbility];
        const toHit = formatMod(abilityMod + derived.proficiencyBonus);
        const dc = abilityMod + derived.proficiencyBonus + 8;
        return `${name} spell, ${toHit} to Hit, DC ${dc}`;
      })()
    : null;

  return (
    <div className="flex items-start gap-1 py-0.5 break-inside-avoid">
      <div className="flex-shrink-0 w-4 mt-0.5">
        {isCantrip ? null : spell.alwaysPrepared ? (
          <span className="italic text-neutral-subdued font-interface text-xs">
            AP
          </span>
        ) : (
          <CircleCheck checked="suggested" className="align-[-.1em]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-1 flex-wrap">
          <span className="text-xs">{spell.name}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {spell.freeUses ? (
              <span className="text-xs">
                <em className="text-neutral-subdued">free x{spell.freeUses}</em>{' '}
                <EmptyCheckList
                  className="align-[-.2em]"
                  count={spell.freeUses}
                />
              </span>
            ) : null}
            {crmLetters ? (
              <span className={cn('text-xs text-neutral-subdued')}>
                {crmLetters}
              </span>
            ) : null}
          </div>
        </div>
        {(spell.notes || altAbilityText) && (
          <div className="text-xs text-neutral-subdued italic leading-tight">
            {spell.notes && <span>{spell.notes}</span>}
            {spell.notes && altAbilityText && <span> · </span>}
            {altAbilityText && <span>{altAbilityText}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
