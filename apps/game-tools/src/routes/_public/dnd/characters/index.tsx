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
    return Object.values(router.routesById).filter(
      (o) => o.id.startsWith(currentId) && o.id !== currentId
    ) as RouteType[];
  }, [router.routesById, currentRouteMatch.routeId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Characters</h1>

      {allCharacters.map(({ Link, ...r }) => (
        <Link
          key={r.originalIndex}
          className="block border border-border rounded-lg p-4 hover:bg-accent transition-colors w-fit"
        >
          <p className="font-medium">
            {r.options.staticData?.name ?? 'Character NAME'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">TODO</p>
        </Link>
      ))}
    </div>
  );
}
