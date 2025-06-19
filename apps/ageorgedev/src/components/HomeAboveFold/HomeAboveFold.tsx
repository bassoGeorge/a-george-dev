'use client';

import {
  Heading3,
  Heading4,
  InterfaceXl,
  NameLogo,
  ThemeSwitcher,
} from '@ageorgedev/design-system';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import styles from './HomeAboveFold.module.css';

export function HomeAboveFold() {
  return (
    <main
      className={`${styles.container} relative grid w-screen place-items-stretch overflow-hidden`}
    >
      <div className={'absolute top-3 right-3 z-10'}>
        <ThemeSwitcher />
      </div>

      <section
        className={`${styles.nameSection} flex items-end justify-center p-4 tablet:items-center tablet:px-7 tablet:pb-6`}
      >
        <NameLogo className={`text-[23vw] tablet:text-[11vw]`} />
      </section>
      <section
        className={`${styles.paper} ${styles.subTextSection} phone-landscape-only:pb-3 relative flex flex-col justify-start tablet:justify-end tablet:p-6 tablet:pb-10`}
      >
        <div className="phone-only:px-4 text-center tablet:text-right">
          <Heading3 className="font-bold text-cc-alt-accent-subtle">
            Web Developer
          </Heading3>
          <Heading4 as="p" className="text-cc-neutral-subtle">
            Architecting web experiences since 2016
          </Heading4>
        </div>
        <div className="mt-5 flex justify-center gap-3 tablet:justify-end">
          <a
            href="https://github.com/bassoGeorge"
            target="_blank"
            rel="noreferrer"
            className="text-2xl leading-none text-cc-neutral-subtlest transition-colors hover:text-cc-accent-subtle"
            aria-label="Github"
          >
            <GithubLogo weight="duotone" />
          </a>
          <a
            href="https://linkedin.com/in/anishbassogeorge"
            target="_blank"
            rel="noreferrer"
            className="text-2xl leading-none text-cc-neutral-subtlest transition-colors hover:text-cc-accent-subtle"
            aria-label="Linkedin"
          >
            <LinkedinLogo weight="duotone" />
          </a>
        </div>
      </section>
      <section
        className={`${styles.paper} ${styles.conSection} ${InterfaceXl.classes} relative flex justify-center gap-3 p-4 pb-6 tablet:col-span-2 tablet:text-2xl`}
      >
        <Link
          href="/talks"
          className="transition-colors hover:text-cc-alt-accent focus:text-cc-alt-accent"
        >
          Talks
        </Link>
      </section>
    </main>
  );
}
