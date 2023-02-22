import {
  conSection,
  container,
  nameSection,
  subTextSection,
} from './SiteUnderConstruction.css';

export function SiteUnderConstruction() {
  return (
    <main
      className={`${container} grid w-screen h-screen place-items-stretch relative overflow-hidden `}
    >
      <section
        className={`${nameSection} flex flex-col justify-end md:justify-center bg-[#FFEBC5]`}
      >
        <h1 className="font-serif text-center">Name</h1>
      </section>
      <section
        className={`${subTextSection} md:p-10 bg-[#FFEBC5] md:bg-none flex flex-col justify-start md:justify-end relative`}
      >
        <div className="text-center md:text-right">
          <h3>Web Developer</h3>
          <p>Architecting web experiences since 2016</p>
        </div>
      </section>
      <section
        className={`${conSection} p-10 md:col-span-2 flex justify-center relative`}
      >
        <p>🚧 Site under construction 🚧</p>
      </section>
    </main>
  );
}
