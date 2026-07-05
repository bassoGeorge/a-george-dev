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

function deriveCrumbsV2(matches: ReturnType<typeof useMatches>): Crumb[] {
  const crumbs: Crumb[] = matches
    .filter((m) => m.context.title)
    .map((m) => ({ label: m.context.title as string, to: m.pathname }));

  if (crumbs.length > 0) {
    crumbs[crumbs.length - 1] = { label: crumbs[crumbs.length - 1].label };
  }
  return crumbs;
}

export function HeaderBreadcrumbs() {
  const matches = useMatches();
  const crumbs = deriveCrumbsV2(matches);

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
