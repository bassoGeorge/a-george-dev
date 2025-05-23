'use client';

import { Heading3, Heading4, InterfaceXl, NameLogo } from '@ageorgedev/atoms';
import { ThemeSwitcher } from '@ageorgedev/molecules';
import Link from 'next/link';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import styles from './HomeAboveFold.module.css';

export function HomeAboveFold() {
  return (
    <main
      className={`${styles.container} grid w-screen place-items-stretch overflow-hidden relative`}
    >
      <div className={'absolute top-3 right-3 z-10'}>
        <ThemeSwitcher />
      </div>

      <section
        className={`${styles.nameSection} p-4 tablet:pb-6 tablet:px-7 flex justify-center items-end tablet:items-center`}
      >
        <NameLogo className={`text-[23vw] tablet:text-[11vw]`} />
      </section>
      <section
        className={`${styles.paper} ${styles.subTextSection} phone-landscape-only:pb-3 tablet:p-6 tablet:pb-10 flex flex-col justify-start tablet:justify-end relative`}
      >
        <div className="text-center phone-only:px-4 tablet:text-right">
          <Heading3 className="font-bold text-cc-alt-accent-subtle">
            Web Developer
          </Heading3>
          <Heading4 as="p" className="text-cc-neutral-subtle">
            Architecting web experiences since 2016
          </Heading4>
        </div>
        <div className="flex gap-3 justify-center tablet:justify-end mt-5">
          <a
            href="https://github.com/bassoGeorge"
            target="_blank"
            rel="noreferrer"
            className="leading-none text-2xl text-cc-neutral-subtlest hover:text-cc-accent-subtle transition-colors"
            aria-label="Github"
          >
            <GithubLogo weight="duotone" />
          </a>
          <a
            href="https://linkedin.com/in/anishbassogeorge"
            target="_blank"
            rel="noreferrer"
            className="leading-none text-2xl text-cc-neutral-subtlest hover:text-cc-accent-subtle transition-colors"
            aria-label="Linkedin"
          >
            <LinkedinLogo weight="duotone" />
          </a>
        </div>
      </section>
      <section
        className={`${styles.paper} ${styles.conSection} ${InterfaceXl.classes} p-4 pb-6 tablet:col-span-2 flex justify-center gap-3 relative tablet:text-2xl`}
      >
        <Link
          href="/talks"
          className="focus:text-cc-alt-accent hover:text-cc-alt-accent transition-colors"
        >
          Talks
        </Link>
      </section>
    </main>
  );
}
