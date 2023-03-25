import {
  conSection,
  container,
  nameSection,
  subTextSection,
  name,
  arch,
  webDev,
} from './SiteUnderConstruction.css';
import { ThemeSwitcher } from '@ageorgedev/molecules';
import { NameLogo } from '@ageorgedev/atoms';
import { Barricade } from '@phosphor-icons/react';

export function SiteUnderConstruction() {
  return (
    <main
      className={`${container} grid w-screen h-screen place-items-stretch relative overflow-hidden relative`}
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
          <h3
            className={`${webDev} font-heading text-2xl tablet:text-3xl desktop:text-4xl font-bold`}
          >
            Web Developer
          </h3>
          <p
            className={`${arch} text-xl tablet:text-2xl desktop:text-3xl really`}
          >
            Architecting web experiences since 2016
          </p>
        </div>
      </section>
      <section
        className={`${conSection} p-4 tablet:col-span-2 flex justify-center gap-3 relative font-interface text-lg tablet:text-2xl`}
      >
        <Barricade weight="duotone" className="text-rc-p-accent-400" />
        <p>Site under construction</p>
        <Barricade weight="duotone" className="text-rc-p-accent-400" />
      </section>
    </main>
  );
}
