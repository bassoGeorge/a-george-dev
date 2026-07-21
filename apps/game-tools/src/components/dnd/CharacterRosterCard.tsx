import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard';
import { BodyMd } from '@ageorgedev/design-system/typography/typography-components';
import {
  type CharacterClass,
  CLASS_ICONS,
  DndClassColors,
} from '@ageorgedev/dnd-character-sheet';
import { cn } from '@ageorgedev/toolbelt/cn';
import { Link } from '@tanstack/react-router';

type CharacterRosterCardProps = {
  slug: string;
  level: number | undefined;
  name: string;
  species: string;
  classes: CharacterClass[];
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
            'right-0 pointer-events-none absolute top-0 -z-10 h-9 opacity-20',
            DndClassColors[primaryClass].text
          )}
        />
        <BodyMd className="font-bold text-neutral-strong">{name}</BodyMd>
        <p className="text-xs text-sm italic text-neutral-subdued">
          {description ?? species}
        </p>
        <div className="flex flex-wrap gap-1">
          {classes.map((className) => {
            const colors = DndClassColors[className];
            return (
              <span
                key={className}
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-interface font-bold leading-none',
                  colors.surface,
                  colors.onSurfaceText
                )}
              >
                {className}
              </span>
            );
          })}
        </div>
      </TiltCard>
    </Link>
  );
}
