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
        <header className="flex items-center justify-between gap-4 ">
          <div className="flex items-baseline gap-4 flex-1">
            <Link
              to="/"
              className="font-heading font-bold text-xl text-primary-foreground"
            >
              Game Tools
            </Link>
            <HeaderBreadcrumbs />
          </div>
          <DndHeaderActions />
          <ThemeSwitcher />
        </header>
      </TiltCard>
      <main>
        <Outlet />
      </main>
    </>
  );
}
