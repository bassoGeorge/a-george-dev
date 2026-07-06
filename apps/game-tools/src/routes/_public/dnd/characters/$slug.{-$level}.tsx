import { StandardCharacterSheet } from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { getCharacterBySlugAndLevel } from '../../../../data/dnd-characters';

export const Route = createFileRoute('/_public/dnd/characters/$slug/{-$level}')(
  {
    params: {
      parse: ({ slug, level }) => ({
        slug,
        level: level ? parseInt(level, 10) : undefined,
      }),
    },

    // I know we are calling the same data fetching stuff twice, but context needs
    // to be serializable so cant put Character type in there
    beforeLoad: ({ params }) => {
      const pack = getCharacterBySlugAndLevel(params.slug, params.level);
      return {
        title: `${pack.brief.name} (level ${pack.brief.level})`,
        spellBook: pack.spellBook,
      };
    },
    // NOTE: Not using a loader for character pack. Although its more appropriate,
    // we have functions in there that are going to not be serialisable.
    // leads to the bigger question of serialisation if we move to APIs

    // TS requires this function to follow in last only
    head: ({ match: { context } }) => {
      return {
        meta: [
          {
            title: context.title,
          },
        ],
      };
    },

    component: RouteComponent,
  }
);

function RouteComponent() {
  const { slug, level } = Route.useParams();
  const { data, visualAdjustments } = useMemo(
    () => getCharacterBySlugAndLevel(slug, level),
    [slug, level]
  );

  return (
    <StandardCharacterSheet data={data} visualAdjustments={visualAdjustments} />
  );
}
