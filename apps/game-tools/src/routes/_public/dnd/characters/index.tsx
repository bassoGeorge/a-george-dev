import {
  createFileRoute,
  type Route as RouteType,
  useRouter,
} from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_public/dnd/characters/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const currentRouteMatch = Route.useMatch();

  const allCharacters = useMemo(() => {
    const currentId = currentRouteMatch.routeId;
    return (
      Object.values(router.routesById).filter(
        (o) => o.id.startsWith(currentId) && o.id !== currentId
      ) as RouteType[]
    ).filter((r) => r.options.staticData?.character);
  }, [router.routesById, currentRouteMatch.routeId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Characters</h1>

      <div className="flex flex-col items-center gap-3 text-center">
        {allCharacters.map(({ Link, ...r }) => {
          const characterInfo = r.options.staticData?.character;
          if (!characterInfo) {
            return null;
          }

          return (
            <Link
              key={r.originalIndex}
              className="block border border-border rounded-lg p-4 hover:bg-accent transition-colors w-fit bg-page-1 hover:bg-page-2"
            >
              <p className="font-bold text-neutral-strong text-md">
                {characterInfo.name}
              </p>
              <p className="text text-neutral-subdued mt-1">
                Level {characterInfo.level} - {characterInfo.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
