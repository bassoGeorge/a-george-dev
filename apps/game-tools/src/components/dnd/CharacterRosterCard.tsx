import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard';
import { BodyMd } from '@ageorgedev/design-system/typography/typography-components';
import {
  type CharacterClass,
  CLASS_COLORS,
  CLASS_ICONS,
} from '@ageorgedev/dnd-character-sheet';
import { cn } from '@ageorgedev/toolbelt/cn';
import { Link } from '@tanstack/react-router';

type CharacterRosterCardProps = {
  slug: string;
  level: number | undefined;
  name: string;
  species: string;
  classes: string[];
  primaryClass: CharacterClass;
  description?: string;
};

export function CharacterRosterCard({
  slug,
  level,
  name,
  species,
  classes,
  primaryClass,
  description,
}: CharacterRosterCardProps) {
  const PrimaryClassIcon = CLASS_ICONS[primaryClass];

  return (
    <Link
      to="/dnd/characters/$slug/{-$level}"
      params={{ slug, level }}
      className="block h-full"
    >
      <TiltCard
        interactive
        outerClassName="h-full"
        className="relative isolate flex h-full flex-col gap-2 p-4"
      >
        <PrimaryClassIcon
          className={cn(
            '-right-10 -translate-y-1/2 pointer-events-none absolute top-1/2 -z-10 h-56 w-56 opacity-10',
            CLASS_COLORS[primaryClass]
          )}
        />
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
