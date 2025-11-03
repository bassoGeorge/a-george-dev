import {
  Heading3,
  Heading4,
  InterfaceXl,
  NameLogo,
  ThemeSwitcher,
} from '@ageorgedev/design-system';
import { cn } from '@ageorgedev/toolbelt';
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import styles from './HomeAboveFold.module.css';

export function HomeAboveFold() {
  return (
    <main
      className={cn(
        styles.container,
        'relative grid w-screen place-items-stretch overflow-hidden'
      )}
    >
      <div className={'absolute top-3 right-3 z-10'}>
        <ThemeSwitcher />
      </div>

      <section
        className={cn(
          styles.nameSection,
          'flex items-end justify-center p-4 tablet:items-center tablet:px-7 tablet:pb-6'
        )}
      >
        <NameLogo className={`text-[23vw] tablet:text-[11vw]`} />
      </section>
      <section
        style={{ '--elv-offset-x': '-2px', '--elv-offset-y': '-0.25rem' }}
        className={cn(
          styles.paper,
          styles.subTextSection,
          'phone-landscape-only:pb-3 relative flex elv-raised-sm translate-y-0 flex-col justify-start tablet:justify-end tablet:p-6 tablet:pb-10'
        )}
      >
        <div className="phone-only:px-4 text-center tablet:text-right">
          <Heading3 className="font-bold text-secondary-foreground">
            Web Developer
          </Heading3>
          <Heading4 as="p" className="text-neutral-subdued">
            Architecting web experiences since 2016
          </Heading4>
        </div>
        <div className="mt-5 flex justify-center gap-3 tablet:justify-end">
          <a
            href="https://github.com/bassoGeorge"
            target="_blank"
            rel="noreferrer"
            className="text-2xl leading-none text-neutral-subdued transition-colors hover:text-primary-foreground"
            aria-label="Github"
          >
            <GithubLogoIcon weight="duotone" />
          </a>
          <a
            href="https://linkedin.com/in/anishbassogeorge"
            target="_blank"
            rel="noreferrer"
            className="text-2xl leading-none text-neutral-subdued transition-colors hover:text-primary-foreground"
            aria-label="Linkedin"
          >
            <LinkedinLogoIcon weight="duotone" />
          </a>
        </div>
      </section>
      <section
        style={{ '--elv-offset-y': '-0.5rem', '--elv-offset-x': '-0.25rem' }}
        className={cn(
          styles.paper,
          styles.conSection,
          InterfaceXl.classes,
          'relative flex elv-raised-md translate-y-0 justify-center gap-3 p-4 pb-6 tablet:col-span-2 tablet:text-2xl'
        )}
      >
        <Link
          href="/talks"
          className="focus:text-primary-foreground-0 transition-colors hover:text-primary-foreground"
        >
          Talks
        </Link>
      </section>
    </main>
  );
}
