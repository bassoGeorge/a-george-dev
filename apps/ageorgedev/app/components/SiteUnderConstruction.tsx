import { testDrive } from './SiteUnderConstruction.css';

export function SiteUnderConstruction() {
  return (
    <main className="grid items-center w-screen h-screen bg-[#FFF1D8]">
      <section className="text-center text-[#0D2124]">
        <h1 className="font-serif text-[140px]">Anish George</h1>
        <small className={'text-[40px] ' + testDrive}>
          🚧 Site under construction 🚧
        </small>
      </section>
    </main>
  );
}
