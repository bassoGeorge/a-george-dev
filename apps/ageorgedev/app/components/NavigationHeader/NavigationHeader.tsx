import { ShortNameLogo, TiltCard } from '@ageorgedev/atoms';
import { ThemeSwitcher } from '@ageorgedev/molecules';
import { NavLink } from '@remix-run/react';

export type NavigationHeaderProps = {
  noLinks?: boolean;
  seemless?: boolean;
};

export default function NavigationHeader(props: NavigationHeaderProps) {
  const HomeLink = props.noLinks ? 'span' : NavLink;
  const paddingClasses = 'px-3 py-4 bg-cc-page-1';
  const Wrapper = props.seemless ? 'div' : BoxMode;
  return (
    <Wrapper className={paddingClasses}>
      <header className="flex justify-between items-center">
        <div>
          <HomeLink to="/">
            <ShortNameLogo />
          </HomeLink>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </header>
    </Wrapper>
  );
}

function BoxMode({ className, children }: React.HTMLProps<HTMLDivElement>) {
  return (
    <TiltCard
      shape="triUpperRight"
      border="bottom"
      className={className}
      outerClassName="mb-4"
    >
      {children}
    </TiltCard>
  );
}
