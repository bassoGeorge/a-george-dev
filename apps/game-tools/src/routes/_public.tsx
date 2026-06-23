import { ThemeSwitcher } from '@ageorgedev/design-system/theming/ThemeSwitcher';
import { PrinterIcon } from '@phosphor-icons/react';
import {
  createFileRoute,
  Link,
  Outlet,
  useChildMatches,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

function RouteComponent() {
  const childMatches = useChildMatches();
  const isCharacterSheet = childMatches.some((m) =>
    m.routeId.includes('_sheet')
  );

  return (
    <>
      <header className="print:hidden flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
        <Link to="/" className="font-bold text-lg">
          Game Tools
        </Link>
        <nav className="flex grow justify-end gap-4">
          <Link
            to="/dnd/characters"
            className="text-sm hover:text-primary-foreground transition-colors"
          >
            DnD Characters
          </Link>
        </nav>
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
