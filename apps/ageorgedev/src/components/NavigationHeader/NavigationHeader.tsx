import {
  InterfaceXl,
  ShortNameLogo,
  ThemeSwitcher,
  TiltCard,
} from '@ageorgedev/design-system';
import Link from 'next/link';
import { cn } from '@ageorgedev/toolbelt';

export type NavigationHeaderProps = {
  noLinks?: boolean;
};

const links = [
  {
    href: '/talks',
    label: 'Talks',
  },
];

export default function NavigationHeader(props: NavigationHeaderProps) {
  const HomeLink = props.noLinks ? 'span' : Link;
  return (
    <TiltCard
      shape="triUpperRight"
      border="bottom"
      outerClassName="relative z-50"
      className="bg-page-1 px-3 py-4"
    >
      <header className="flex items-center justify-between gap-4">
        <div>
          <HomeLink href="/">
            <ShortNameLogo />
          </HomeLink>
        </div>
        <nav className="flex grow justify-end gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                InterfaceXl.classes,
                'focus:text-primary-foreground-0 transition-colors hover:text-primary-foreground'
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
  );
}

function BoxMode({ className, children }: React.HTMLProps<HTMLDivElement>) {
  return <TiltCard className={className}>{children}</TiltCard>;
}
