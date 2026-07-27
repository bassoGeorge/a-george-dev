import {
  Heading4,
  InterfaceLg,
} from '@ageorgedev/design-system/typography/typography-components';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react';
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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 max-w-[2048px] mx-auto">
        {levelGroups.map(({ level, characters }) => (
          <Fragment key={level}>
            <InterfaceLg
              as="h2"
              className="text-neutral-strong mt-6 col-span-full first:mt-0"
            >
              Level {level}
            </InterfaceLg>
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
          </Fragment>
        ))}
      </div>
    </div>
  );
}
