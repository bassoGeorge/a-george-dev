import { Heading3 } from '@ageorgedev/atoms';
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
          <span className={`${Heading3.classes} font-bold`}>
            <span className="text-rc-timber-400 dark:text-rc-parchment-500">
              A
            </span>
            <span
              className="text-rc-p-accent-500 dark:text-rc-p-accent-200"
              style={{ fontSize: '0.85em' }}
            >
              G
            </span>
          </span>
        </HomeLink>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
