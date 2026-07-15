import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard';
import { BodyMd } from '@ageorgedev/design-system/typography/typography-components';
import { Link } from '@tanstack/react-router';

type CharacterRosterCardProps = {
  slug: string;
  level: number | undefined;
  name: string;
  species: string;
  classes: string[];
  description?: string;
};

export function CharacterRosterCard({
  slug,
  level,
  name,
  species,
  classes,
  description,
}: CharacterRosterCardProps) {
  return (
    <Link
      to="/dnd/characters/$slug/{-$level}"
      params={{ slug, level }}
      className="block h-full"
    >
      <TiltCard
        interactive
        outerClassName="h-full"
        className="flex h-full flex-col gap-2 p-4"
      >
        <BodyMd className="font-bold text-neutral-strong">{name}</BodyMd>
        <p className="text-xs text-sm italic text-neutral-disabled">
          {description ?? species}
        </p>
        <div className="flex flex-wrap gap-1">
          {classes.map((className) => (
            <span
              key={className}
              className="rounded-full bg-primary-surface-2 px-2 py-0.5 text-xs font-interface font-bold text-primary-onsurface-2 leading-none"
            >
              {className}
            </span>
          ))}
        </div>
      </TiltCard>
    </Link>
  );
}
