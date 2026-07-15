import { createFileRoute } from '@tanstack/react-router';
import { CharacterRosterCard } from '../../../../components/dnd/CharacterRosterCard';
import { AllMyCharactersInBrief } from '../../../../data/dnd-characters';

export const Route = createFileRoute('/_public/dnd/characters/')({
  component: RouteComponent,
  beforeLoad: () => ({ title: undefined }),
  loader: () => AllMyCharactersInBrief,
});

function RouteComponent() {
  const characterMap = Route.useLoaderData();

  const snapshots = Object.values(characterMap).flatMap((characters) =>
    characters.map((c) => ({
      ...c,
      hasMultipleLevels: characters.length > 1,
    }))
  );

  const levels = [...new Set(snapshots.map((s) => s.brief.level))].sort(
    (a, b) => a - b
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Characters</h1>

      <div className="flex flex-col gap-8">
        {levels.map((level) => {
          const atLevel = snapshots
            .filter((s) => s.brief.level === level)
            .sort((a, b) => a.brief.name.localeCompare(b.brief.name));

          return (
            <section key={level}>
              <h2 className="text-lg font-bold text-neutral-strong mb-3">
                Level {level}
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                {atLevel.map((c) => (
                  <CharacterRosterCard
                    key={`${c.slug}-${c.brief.level}`}
                    slug={c.slug}
                    level={c.hasMultipleLevels ? c.brief.level : undefined}
                    name={c.brief.name}
                    species={c.brief.species}
                    classes={c.brief.classes}
                    description={c.brief.description}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
