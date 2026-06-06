import {
  InterfaceXl,
  ShortNameLogo,
  ThemeSwitcher,
  TiltCard,
} from '@ageorgedev/design-system'
import { cn } from '@ageorgedev/toolbelt'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

const links = [
  {
    // todo
    to: '/talks',
    label: 'Talks',
  },
]

function RouteComponent() {
  return (
    <>
      <TiltCard
        shape="triUpperRight"
        border="bottom"
        outerClassName="relative z-50"
        className="bg-page-1 px-3 py-4"
      >
        <header className="flex items-center justify-between gap-4">
          <div>
            <Link to="/">
              <ShortNameLogo />
            </Link>
          </div>
          <nav className="flex grow justify-end gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  InterfaceXl.classes,
                  'focus:text-primary-foreground-0 hover:text-primary-foreground transition-colors'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div>
            <ThemeSwitcher />
          </div>
        </header>
      </TiltCard>
      <main>
        <Outlet />
      </main>
    </>
  )
}
