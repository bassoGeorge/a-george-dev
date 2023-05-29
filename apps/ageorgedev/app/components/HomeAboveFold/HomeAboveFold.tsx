import { Heading3, Heading4, InterfaceXl, NameLogo } from '@ageorgedev/atoms';
import { ThemeSwitcher } from '@ageorgedev/molecules';
import { NavLink } from '@remix-run/react';
import {
  conSection,
  container,
  nameSection,
  subTextSection,
} from './HomeAboveFold.css';

export function HomeAboveFold() {
  return (
    <main
      className={`${container} grid w-screen place-items-stretch overflow-hidden relative`}
    >
      <div className={'absolute top-3 right-3 z-10'}>
        <ThemeSwitcher />
      </div>

      <section
        className={`${nameSection} p-4 tablet:pb-6 tablet:px-7 flex justify-center items-end tablet:items-center`}
      >
        <NameLogo className={`text-[23vw] tablet:text-[11vw]`} />
      </section>
      <section
        className={`${subTextSection} phone-landscape-only:pb-3 tablet:p-6 tablet:pb-10 flex flex-col justify-start tablet:justify-end relative`}
      >
        <div className="text-center phone-only:px-4 tablet:text-right">
          <Heading3 className="font-bold text-rc-s-accent-400">
            Web Developer
          </Heading3>
          <Heading4 as="p" className="text-cc-neutral-300">
            Architecting web experiences since 2016
          </Heading4>
        </div>
      </section>
      <section
        className={`${conSection} ${InterfaceXl.classes} p-4 pb-6 tablet:col-span-2 flex justify-center gap-3 relative tablet:text-2xl`}
      >
        <NavLink to="/talks">Talks</NavLink>
      </section>
    </main>
  );
}
