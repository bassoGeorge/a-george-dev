import { StandardCharacterSheet } from '@ageorgedev/dnd-character-sheet';
import { createFileRoute } from '@tanstack/react-router';
import { getCharacterBySlugAndLevel } from '../../../../data/dnd-characters';

export const Route = createFileRoute('/_public/dnd/characters/$slug/{-$level}')(
  {
    beforeLoad: () => {
      return {
        title: 'My character name',
      };
    },
    params: {
      parse: ({ slug, level }) => ({
        slug,
        level: level ? parseInt(level, 10) : undefined,
      }),
    },
    loader: ({ params }) => {
      return getCharacterBySlugAndLevel(params.slug, params.level);
    },
    component: RouteComponent,
  }
);

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return <StandardCharacterSheet data={data} />;
}
