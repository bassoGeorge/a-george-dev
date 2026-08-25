import { TiltCard } from '@ageorgedev/design-system/cards/TiltCard';
import { ThemeSwitcher } from '@ageorgedev/design-system/theming/ThemeSwitcher';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { DndHeaderActions } from '../components/DndHeaderActions';
import { HeaderBreadcrumbs } from '../components/HeaderBreadcrumbs';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TiltCard
        border="bottom"
        outerClassName="print:hidden z-50 relative"
        className="px-3 py-4"
      >
        <header className="flex items-center justify-between gap-4 max-tablet-landscape:grid max-tablet-landscape:grid-cols-[minmax(0,1fr)_auto] max-tablet-landscape:items-center">
          <div className="flex items-baseline gap-4 flex-1 max-tablet:contents">
            <Link
              to="/"
              className="font-heading font-bold text-xl text-primary-foreground max-tablet:col-start-1 max-tablet:row-start-1"
            >
              Game Tools
            </Link>
            <div className="contents max-tablet-landscape::block max-tablet-landscape::col-span-2 max-tablet-landscape::row-start-2 max-tablet-landscape::min-w-0">
              <HeaderBreadcrumbs />
            </div>
          </div>
          <DndHeaderActions />
          <div className="contents max-tablet-landscape:block max-tablet-landscape:col-start-2 max-tablet-landscape:row-start-1">
            <ThemeSwitcher />
          </div>
        </header>
      </TiltCard>
      <main>
        <Outlet />
      </main>
    </>
  );
}
