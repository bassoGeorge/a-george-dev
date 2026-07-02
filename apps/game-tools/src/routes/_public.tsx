import { ThemeSwitcher } from '@ageorgedev/design-system/theming/ThemeSwitcher';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ageorgedev/design-system/ui/breadcrumb';
import { PrinterIcon } from '@phosphor-icons/react';
import {
  createFileRoute,
  Link,
  Outlet,
  useMatches,
} from '@tanstack/react-router';
import { Fragment } from 'react';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

type Crumb = { label: string; to?: string };
type Matches = ReturnType<typeof useMatches>;

function deriveCrumbs(matches: Matches): Crumb[] {
  const crumbs: Crumb[] = [];

  for (const match of matches) {
    if (/\/dnd\/characters\/?$/.test(match.pathname)) {
      crumbs.push({ label: 'DnD Characters', to: '/dnd/characters' });
      continue;
    }

    if (/\/dnd\/characters\/.+$/.test(match.pathname)) {
      const characterName = match.staticData?.character?.name ?? 'Character';
      const level = match.staticData?.character?.level;
      const label = `${characterName}${level ? ` (Level ${level})` : ''}`;
      crumbs.push({ label, to: match.pathname });
    }
  }

  if (crumbs.length > 0) {
    crumbs[crumbs.length - 1] = { label: crumbs[crumbs.length - 1].label };
  }

  return crumbs;
}

function RouteComponent() {
  const matches = useMatches();
  const crumbs = deriveCrumbs(matches);
  const isCharacterSheet = matches.some((m) => m.routeId.includes('_sheet'));

  return (
    <>
      <header className="print:hidden flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
        <div className="flex items-baseline gap-4 flex-1">
          <Link to="/" className="font-bold text-lg">
            Game Tools
          </Link>
          {crumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {crumbs.map((crumb, index) => (
                  <Fragment key={crumb.to ?? `page:${crumb.label}`}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.to ? (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.to}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
        {isCharacterSheet && (
          <button
            type="button"
            onClick={() => window.print()}
            className="hover:text-primary-foreground transition-colors"
            aria-label="Print character sheet"
          >
            <PrinterIcon size={30} />
          </button>
        )}
        <ThemeSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
