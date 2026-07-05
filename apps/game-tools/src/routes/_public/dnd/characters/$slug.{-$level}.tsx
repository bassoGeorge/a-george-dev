import { StandardCharacterSheet } from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
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
    // NOTE: if there are functions in the character, this breaks ssr on local refresh. not sure why
    loader: ({ params }) => {
      return getCharacterBySlugAndLevel(params.slug, params.level);
    },

    // Some ts issues stop me from organising this before the other functions, need to investigate
    head: ({ params }) => {
      const pack = getCharacterBySlugAndLevel(params.slug, params.level);
      return {
        meta: [
          {
            title: `${pack.brief.name} - level ${pack.brief.level}`,
          },
        ],
      };
    },

    component: RouteComponent,
  }
);

function RouteComponent() {
  const { data, visualAdjustments } = Route.useLoaderData();

  return (
    <StandardCharacterSheet data={data} visualAdjustments={visualAdjustments} />
  );
}
