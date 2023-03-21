import {
  conSection,
  container,
  nameSection,
  subTextSection,
  name,
  arch,
  webDev,
} from './SiteUnderConstruction.css';
import { ThemeSwitcher } from './ThemeSwitcher';

export function SiteUnderConstruction() {
  return (
    <main
      className={`${container} grid w-screen h-screen place-items-stretch relative overflow-hidden `}
    >
      <section
        className={`${nameSection} p-4 tablet:pb-6 tablet:px-7 flex flex-col justify-end tablet:justify-center`}
      >
        <h1
          className={`${name} font-heading text-center font-bold text-7xl tablet:text-8xl desktop:text-[130px]`}
        >
          Anish George
        </h1>
      </section>
      <section
        className={`${subTextSection} phone-landscape-only:pb-3 tablet:p-6 tablet:pb-10 flex flex-col justify-start tablet:justify-end relative`}
      >
        <div className={'absolute top-3 right-3'}>
          <ThemeSwitcher />
        </div>
        <div className="text-center tablet:text-right">
          <h3 className={`${webDev} type-heading-2 tablet:text-6xl font-bold`}>
            Web Developer
          </h3>
          <p className={`${arch} text-xl tablet:text-3xl really`}>
            Architecting web experiences since 2016
          </p>
        </div>
      </section>
      <section
        className={`${conSection} p-4 tablet:col-span-2 flex justify-center relative text-3xl`}
      >
        <p>🚧 Site under construction 🚧</p>
      </section>
    </main>
  );
}
