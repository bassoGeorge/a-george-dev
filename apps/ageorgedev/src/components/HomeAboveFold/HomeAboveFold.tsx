import { Heading3, Heading4, NameLogo } from '@ageorgedev/design-system';
import { cn } from '@ageorgedev/toolbelt';
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react/ssr';
import styles from './HomeAboveFold.module.css';

export function HomeAboveFold() {
  return (
    <div
      className={cn(
        styles.container,
        'relative -mt-2 grid w-full place-items-stretch overflow-hidden'
      )}
    >
      <section
        className={cn(
          styles.nameSection,
          'flex items-end justify-center p-4 tablet:items-center tablet:px-7 tablet:pb-6'
        )}
      >
        <NameLogo className={`text-[23vw] tablet:text-[11vw]`} />
      </section>
      <section
        style={{ '--elv-offset-x': '-2px' }}
        className={cn(
          styles.paper,
          styles.subTextSection,
          'p-4 tablet:justify-end tablet:p-6 desktop:pb-10',
          'relative flex flex-col justify-start tablet:elv-raised-sm'
        )}
      >
        <div className="text-center tablet:text-right">
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
    </div>
  );
}
