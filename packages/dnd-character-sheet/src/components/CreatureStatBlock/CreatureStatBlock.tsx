import { ABILITY_DETAILS, ALL_ABILITIES } from '../../lib/models/abilities';
import type { Creature, CreatureEntry } from '../../lib/models/creature';
import { formatMod } from '../../lib/utils';
import { RichTextDisplay } from '../RichTextDisplay/RichTextDisplay';
import styles from './CreatureStatBlock.module.css';

export function CreatureStatBlock({ creature }: { creature: Creature }) {
  const abilities = ALL_ABILITIES.filter(
    (ability) => creature.abilities?.[ability] !== undefined
  );
  const skills = Object.entries(creature.skills ?? {});
  const taxonomy = [creature.size, creature.creatureType, creature.alignment]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={`${styles.statBlock} rounded-md border-2 border-neutral-subdued bg-page-1 p-4 font-body text-neutral-strong`}
      data-testid="creature-stat-block"
    >
      <header className="border-b-medium-line border-primary-foreground pb-2">
        <h2 className="font-heading text-3xl leading-none text-primary-foreground uppercase tracking-wide">
          {creature.name}
        </h2>
        {taxonomy && (
          <p className="mt-1 text-lg italic text-neutral-subdued">{taxonomy}</p>
        )}
        {creature.description && (
          <RichTextDisplay
            className="mt-1 text-sm text-neutral-subdued"
            content={creature.description}
          />
        )}
      </header>

      <CombatSummary creature={creature} />

      {!!abilities.length && (
        <fieldset
          className="mt-3 grid grid-cols-3 gap-2"
          aria-label="Abilities"
        >
          {abilities.map((ability) => {
            const score = creature.abilities?.[ability];
            if (score === undefined) return null;
            const modifier = Math.floor((score - 10) / 2);
            const savingThrow = creature.savingThrows?.[ability] ?? modifier;
            return (
              <div
                className="grid grid-cols-[1fr_auto_auto] items-baseline gap-1 bg-page-3 px-2 py-1"
                key={ability}
              >
                <b className="font-heading text-primary-foreground">
                  {ability}
                </b>
                <span title={`${ABILITY_DETAILS[ability].label} modifier`}>
                  {formatMod(modifier)}
                </span>
                <span
                  className="text-neutral-subdued"
                  title={`${ABILITY_DETAILS[ability].label} save`}
                >
                  {formatMod(savingThrow)}
                </span>
              </div>
            );
          })}
        </fieldset>
      )}

      <div className="mt-3 space-y-1 text-sm">
        {!!skills.length && (
          <DetailRow
            label="Skills"
            value={skills
              .map(([skill, modifier]) => `${skill} ${formatMod(modifier)}`)
              .join(', ')}
          />
        )}
        {!!creature.senses?.length && (
          <DetailRow label="Senses" value={creature.senses.join('; ')} />
        )}
        {!!creature.languages?.length && (
          <DetailRow label="Languages" value={creature.languages.join(', ')} />
        )}
        {creature.challengeRating !== undefined && (
          <DetailRow label="CR" value={formatChallenge(creature)} />
        )}
        {creature.details?.map(({ label, value }) => (
          <DetailRow key={`${label}-${value}`} label={label} value={value} />
        ))}
      </div>

      <RulesSection title="Traits" entries={creature.traits} />
      <RulesSection title="Actions" entries={creature.actions} />
      <RulesSection title="Bonus Actions" entries={creature.bonusActions} />
      <RulesSection title="Reactions" entries={creature.reactions} />
    </article>
  );
}

function CombatSummary({ creature }: { creature: Creature }) {
  const items = [
    creature.armorClass !== undefined && ['AC', creature.armorClass],
    creature.initiative !== undefined && [
      'Initiative',
      `${formatMod(creature.initiative)} (${10 + creature.initiative})`,
    ],
    creature.hitPoints && [
      'HP',
      `${creature.hitPoints.maximum}${
        creature.hitPoints.dice ? ` (${creature.hitPoints.dice})` : ''
      }`,
    ],
    creature.speed !== undefined && ['Speed', creature.speed],
  ].filter((item): item is [string, string | number] => Boolean(item));

  if (!items.length) return null;

  return (
    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-base max-tablet:grid-cols-1">
      {items.map(([label, value]) => (
        <div className="flex gap-1" key={label}>
          <dt className="font-bold text-primary-foreground">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <b className="text-primary-foreground">{label}</b> {value}
    </p>
  );
}

function RulesSection({
  title,
  entries,
}: {
  title: string;
  entries?: CreatureEntry[];
}) {
  if (!entries?.length) return null;

  return (
    <section className="mt-4">
      <h3 className="border-b border-primary-foreground pb-1 font-heading text-2xl uppercase tracking-wide text-primary-foreground">
        {title}
      </h3>
      <div className="mt-2 space-y-2 text-base">
        {entries.map((entry) => (
          <div key={`${entry.name}-${entry.description}`}>
            <b className="italic">{entry.name}.</b>{' '}
            <RichTextDisplay element="span" content={entry.description} />
          </div>
        ))}
      </div>
    </section>
  );
}

function formatChallenge(creature: Creature): string {
  const notes = [
    creature.experiencePoints !== undefined &&
      `XP ${creature.experiencePoints.toLocaleString()}`,
    creature.proficiencyBonus !== undefined &&
      `PB ${formatMod(creature.proficiencyBonus)}`,
  ].filter(Boolean);

  return `${creature.challengeRating}${
    notes.length ? ` (${notes.join('; ')})` : ''
  }`;
}
