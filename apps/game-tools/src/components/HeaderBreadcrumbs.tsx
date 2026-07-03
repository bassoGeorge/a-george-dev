import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ageorgedev/design-system/ui/breadcrumb';
import { Link, useMatches } from '@tanstack/react-router';
import { Fragment } from 'react';

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

export function HeaderBreadcrumbs() {
  const matches = useMatches();
  const crumbs = deriveCrumbs(matches);

  if (crumbs.length === 0) {
    return null;
  }

  return (
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
  );
}
