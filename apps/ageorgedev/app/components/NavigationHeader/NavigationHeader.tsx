import { ShortNameLogo } from '@ageorgedev/atoms';
import { ThemeSwitcher } from '@ageorgedev/molecules';
import { NavLink } from '@remix-run/react';

export type NavigationHeaderProps = {
  noLinks?: boolean;
};

export default function NavigationHeader(props: NavigationHeaderProps) {
  const HomeLink = props.noLinks ? 'span' : NavLink;
  return (
    <header className="flex justify-between items-center px-3 py-4 bg-cc-page-1">
      <div>
        <HomeLink to="/">
          <ShortNameLogo />
        </HomeLink>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
