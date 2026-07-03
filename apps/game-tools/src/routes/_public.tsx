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
      <header className="print:hidden flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
        <div className="flex items-baseline gap-4 flex-1">
          <Link to="/" className="font-bold text-lg">
            Game Tools
          </Link>
          <HeaderBreadcrumbs />
        </div>
        <DndHeaderActions />
        <ThemeSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
