import {
  ShortNameLogo,
  ThemeSwitcher,
  TiltCard,
} from '@ageorgedev/design-system';
import Link from 'next/link';

export type NavigationHeaderProps = {
  noLinks?: boolean;
};

export default function NavigationHeader(props: NavigationHeaderProps) {
  const HomeLink = props.noLinks ? 'span' : Link;
  return (
    <TiltCard
      shape="triUpperRight"
      border="bottom"
      outerClassName="relative z-50"
      className="bg-page-1 px-3 py-4"
    >
      <header className="flex items-center justify-between">
        <div>
          <HomeLink href="/">
            <ShortNameLogo />
          </HomeLink>
        </div>
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
