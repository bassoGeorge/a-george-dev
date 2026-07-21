import {
  Heading4,
  InterfaceLg,
} from '@ageorgedev/design-system/typography/typography-components';
import { createFileRoute } from '@tanstack/react-router';
import { CharacterRosterCard } from '../../../../components/dnd/CharacterRosterCard';
import { AllMyCharactersInBrief } from '../../../../data/dnd-characters';
import { groupCharactersByLevel } from '../../../../lib/group-characters-by-level';

export const Route = createFileRoute('/_public/dnd/characters/')({
  component: RouteComponent,
  beforeLoad: () => ({ title: undefined }),
  loader: () => AllMyCharactersInBrief,
});

function RouteComponent() {
  const characterMap = Route.useLoaderData();
  const levelGroups = groupCharactersByLevel(characterMap);

  return (
    <div className="p-8">
      <Heading4 as="h1" className="text-center mb-8">
        D&D 5.5e Characters
      </Heading4>

      <div className="flex flex-col gap-8">
        {levelGroups.map(({ level, characters }) => (
          <section key={level}>
            <InterfaceLg as="h2" className="text-neutral-strong mb-3">
              Level {level}
            </InterfaceLg>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
              {characters.map((c) => (
                <CharacterRosterCard
                  key={`${c.slug}-${c.brief.level}`}
                  slug={c.slug}
                  level={c.hasMultipleLevels ? c.brief.level : undefined}
                  name={c.brief.name}
                  species={c.brief.species}
                  classes={c.brief.classes}
                  primaryClass={c.brief.primaryClass}
                  description={c.brief.description}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
