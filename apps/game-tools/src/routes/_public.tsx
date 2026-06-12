import { ThemeSwitcher } from '@ageorgedev/design-system/theming/ThemeSwitcher'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <header className="print:hidden flex items-center justify-between gap-4 px-4 py-3 border-b border-border">
        <Link to="/" className="font-semibold text-lg">
          Game Tools
        </Link>
        <nav className="flex grow justify-end gap-4">
          <Link
            to="/dnd/characters"
            className="text-sm hover:text-primary transition-colors"
          >
            DnD Characters
          </Link>
        </nav>
        <ThemeSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
