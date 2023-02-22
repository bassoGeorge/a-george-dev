import {
  conSection,
  container,
  nameSection,
  subTextSection,
  name,
  arch,
} from './SiteUnderConstruction.css';

export function SiteUnderConstruction() {
  return (
    <main
      className={`${container} grid w-screen h-screen place-items-stretch relative overflow-hidden `}
    >
      <section
        className={`${nameSection} p-10 sm:max-md:pb-4 flex flex-col justify-end md:justify-center bg-[#FFEBC5]`}
      >
        <h1
          className={`${name} font-serif text-center font-bold text-7xl md:text-8xl lg:text-[130px]`}
        >
          Anish George
        </h1>
      </section>
      <section
        className={`${subTextSection} md:p-10 md:pb-40 bg-[#FFEBC5] md:bg-none flex flex-col justify-start md:justify-end relative`}
      >
        <div className="text-center md:text-right">
          <h3 className={`text-3xl md:text-6xl font-bold text-[#C87E88]`}>
            Web Developer
          </h3>
          <p className={`${arch} text-xl md:text-3xl`}>
            Architecting web experiences since 2016
          </p>
        </div>
      </section>
      <section
        className={`${conSection} p-8 md:col-span-2 flex justify-center relative text-3xl text-[#051619]`}
      >
        <p>🚧 Site under construction 🚧</p>
      </section>
    </main>
  );
}
