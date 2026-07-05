import { createFileRoute, Link } from '@tanstack/react-router';
import { Fragment } from 'react';
import { AllMyCharacters } from '../../../../data/dnd-characters';

export const Route = createFileRoute('/_public/dnd/characters/')({
  component: RouteComponent,
  loader: () => AllMyCharacters,
});

function RouteComponent() {
  const characterMap = Route.useLoaderData();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Characters</h1>

      <div className="flex flex-col items-center gap-3 text-center">
        {Object.values(characterMap).map((characters) => {
          const addLevel = characters.length > 1;
          return (
            <Fragment key={characters[0].slug}>
              {characters.map((c) => (
                <Link
                  key={`${c.slug}-${c.brief.level}`}
                  to={'/dnd/characters/$slug/{-$level}'}
                  params={{
                    slug: c.slug,
                    level: addLevel ? c.brief.level : undefined,
                  }}
                  className="block border border-border rounded-lg p-4 hover:bg-accent transition-colors w-fit bg-page-1 hover:bg-page-2"
                >
                  <p className="font-bold text-neutral-strong text-md">
                    {c.brief.name}
                  </p>
                  <p className="text text-neutral-subdued mt-1">
                    Level {c.brief.level} - {c.brief.description}
                  </p>
                </Link>
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
