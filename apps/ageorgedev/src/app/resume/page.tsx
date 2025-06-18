'use client';
import {
  Body,
  BodyLg,
  BodySm,
  BodyXs,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  NameLogo,
} from '@ageorgedev/atoms';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { Skill, humanSkills, techSkills, toolSkills } from './Skill';
import { SocialLink } from './SocialLink';
import styles from './page.module.css';
import './resume.global.css';

const education: { period: string; institute: string; programme: string }[] = [
  {
    period: '2012-2015',
    programme: 'Bachelors in Computer Application',
    institute: 'Maharaja Surajmal Institute | New Delhi',
  },
  {
    period: '2011-2012',
    programme: 'Senior Secondary (Science)',
    institute: 'Fr. Agnel School | New Delhi',
  },
  {
    period: '2009-2010',
    programme: 'Higher Secondary',
    institute: 'Fr. Agnel School | New Delhi',
  },
];

function Imp({ children }: React.PropsWithChildren) {
  return <span className="text-cc-alt-accent italic">{children}</span>;
}

export default function Resume() {
  const socialLinksBlockClasses = 'flex flex-col gap-2';
  return (
    <main className={styles.page}>
      <header className={`${styles.header} ${styles.paper}`}>
        <NameLogo
          shadowDirection="left"
          className="-mb-4 self-end text-[4rem]"
        />
        <BodySm className="absolute top-[9.5rem] left-[13.75rem] mb-2 text-cc-neutral-subtlest italic">
          (He/Him)
        </BodySm>
        <div className={`${socialLinksBlockClasses} mt-3`}>
          <SocialLink type="email" full={true} />
          <SocialLink type="phone" full={true} />
        </div>
      </header>
      <aside className={`${styles.aside} ${styles.paper}`}>
        <section className="mr-1">
          <Heading4
            as={'h2'}
            className="font-medium text-rc-s-accent-400 italic"
          >
            Frontend Architect
          </Heading4>
          <Body className="mt-2">
            Developing web experiences for over 7 years across various tech
            stacks with a deep commitment for code quality and
            <br /> a track record of providing effective training in a range of
            technical areas.
          </Body>
        </section>
        <section className={`${socialLinksBlockClasses} -mt-2 -mr-6`}>
          <SocialLink type="location" full={true} />
          <SocialLink type="github" full={true} />
          <SocialLink type="linkedin" full={true} />
        </section>
        <section>
          <Heading6 as={'h3'} className="mb-2">
            Skills
          </Heading6>
          <div className="-mr-2 flex flex-wrap gap-2">
            {toolSkills.map((props, index) => (
              <Skill key={index} {...props} />
            ))}
          </div>
          <div className="mt-2 -mr-4 flex flex-wrap gap-2">
            {techSkills.map((props, index) => (
              <Skill key={index} {...props} />
            ))}
          </div>
          <div className="mt-2 -mr-7 flex flex-wrap gap-2">
            {humanSkills.map((props, index) => (
              <Skill key={index} {...props} />
            ))}
          </div>
        </section>
        <section>
          <Heading6 as={'h3'} className="mb-2">
            Talks
          </Heading6>
          <a
            href="https://confengine.com/conferences/functional-conf-2019/proposal/10768/demystifying-function-sub-typing"
            target="_blank"
            rel="noreferrer"
          >
            <BodySm className="font-interface">
              Demystifying Function Sub-typing
              <ArrowSquareOut
                weight="duotone"
                className="relative -top-px ml-2 inline text-rc-p-accent-400"
              />
            </BodySm>
            <BodyXs className="text-cc-neutral-subtlest">
              Functional Conf Bangalore | 2019
            </BodyXs>
          </a>
        </section>
        <section className="-mr-8">
          <Heading6 as={'h3'} className="mb-2">
            Education
          </Heading6>
          <div className={styles.eduGrid}>
            {education.map((edu) => (
              <>
                <BodyXs>{edu.period}</BodyXs>
                <div>
                  <BodySm className="font-interface">{edu.programme}</BodySm>
                  <BodyXs className="text-cc-neutral-subtlest">
                    {edu.institute}
                  </BodyXs>
                </div>
              </>
            ))}
          </div>
        </section>
        <section className="-mr-6">
          <BodySm className="font-thin text-cc-neutral italic">
            I built this resume using HTML / CSS and it follows my new design
            language.
          </BodySm>
        </section>
      </aside>
      <article className={`${styles.article} ${styles.paper}`}>
        <section className={styles.expGrid}>
          <BodyLg className="justify-self-end font-bold tracking-wider text-rc-p-accent-500">
            2018 - 2023
          </BodyLg>
          <Heading3 className="font-medium">Thoughtworks</Heading3>
          <div className="self-start justify-self-end text-right">
            <p className="font-interface text-md leading-[1.2rem] text-cc-neutral-subtle">
              Lead UI Developer
            </p>
            <p className="-mt-1 pb-1 text-xs leading-[1.2rem] text-cc-neutral-subtlest">
              2021
            </p>
            <p className="font-interface text-xs leading-[1.2rem] text-cc-neutral-subtle">
              Senior UI Developer
            </p>
            <p className="-mt-1 pb-1 text-xs leading-[1.2rem] text-cc-neutral-subtlest">
              2019
            </p>
            <p className="font-interface text-xs leading-[1.2rem] text-cc-neutral-subtle">
              UI Developer
            </p>
            <p className="-mt-1 pb-1 text-xs leading-[1.2rem] text-cc-neutral-subtlest">
              2018
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Body>
              I am currently working with a client in the Hospitality sector,
              where I architected a brand new <Imp>Design System</Imp> and
              helped set up an <Imp>Nx MonoRepo</Imp> for all future
              applications and libraries. The Design System prioritizes
              developer productivity and is based on{' '}
              <Imp>Atomic design principles</Imp>. This approach has proven to
              accelerate delivery speed. During a release rush, we implemented a
              design philosophy change smoothly and quickly, thanks to the
              scalable architecture of this system.
            </Body>
            <Body>
              At the same client, I led a team of developers in creating a new
              business intelligence application. We{' '}
              <Imp>
                completed the project a month ahead of their estimated timeline
              </Imp>
              , and the quality of our code and testing exceeded their
              expectations. Our work was so exceptional that they asked me to
              help train their developers. For this, I ran a few training
              sessions and created some learning resources to get their team up
              to speed.
            </Body>
            <Body>
              Was brought in to rescue a struggling internal project at
              Thoughtworks, where I{' '}
              <Imp>revamped and polished the UI in just one week</Imp> before
              the showcase.
            </Body>
            <Body>
              Led discovery and inception workshops for several accounts, and
              took ownership of the frontend stream of work on multiple projects
              for a large business consultancy firm.
            </Body>

            <Heading5 className="mt-4 font-light">
              Community initiatives
            </Heading5>
            <Body>
              Helped organise <Imp>Unfold UI</Imp>, an external-facing event
              showcasing UI best practices, and also conducted a VueJS workshop
              during the event.
            </Body>
            <Body>
              Designed and conducted the <Imp>CSS Level Zero Bootcamp</Imp>, a
              crash course aimed at non-UI developers to learn CSS and
              contribute better to frontend development.
            </Body>
            <Body>
              Helped design and execute the recurring{' '}
              <Imp>Frontend Architect Programme</Imp>, aimed at UI Developers
              seeking to take on a more architect role. As a regular trainer, I
              have participated in all seven batches of the programme which has
              a 100% satisfaction record.
            </Body>
            <Body>
              Part of a team which curated{' '}
              <Imp>learning resources for UI developers</Imp> across the
              organisation. I was responsible for curating resources for
              HTML/CSS and Angular.
            </Body>
            <Body>
              Contributed to multiple volumes of the{' '}
              <Imp>Thoughtworks Tech Radar</Imp>.
            </Body>
            <Body>
              Heavily involved in recruitment initiatives, regularly taking
              interviews and contributing to the{' '}
              <Imp>revamping of the UI Developer recruitment process</Imp> for
              the global recruitment team.
            </Body>
          </div>
        </section>
        <section className={styles.expGrid}>
          <BodyLg className="justify-self-end font-bold tracking-wider text-rc-p-accent-500">
            2016 - 2018
          </BodyLg>
          <Heading3 className="font-medium">Ignite Solutions</Heading3>
          <div className="self-start justify-self-end text-right">
            <p className="font-interface text-md leading-[1.2rem] text-cc-neutral-subtle">
              Full Stack
              <br />
              Developer
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Body>
              Worked with multiple clients across various tech stacks, including
              Angular frontend and Python-based backends.
            </Body>
            <Body>
              Navigated through <Imp>legacy code</Imp> written in a mixture of
              CakePHP and Angular 1.x, adding new features, refactoring, and
              finding vulnerabilities.
            </Body>
            <Body>
              Led the <Imp>internationalization</Imp> efforts for an existing
              project, including setting up the architecture and managing the
              flow of work.
            </Body>
            <Body>Built MS Office add-ins and Skype bot integrations.</Body>
          </div>
        </section>
        <section className={styles.expGrid}>
          <BodyLg className="justify-self-end font-bold tracking-wider text-rc-p-accent-500">
            mid 2015
          </BodyLg>
          <Heading3 className="font-medium">JLabs</Heading3>
          <div className="self-start justify-self-end text-right">
            <p className="font-interface text-md leading-[1.2rem] text-cc-neutral-subtle">
              Developer
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Body>
              At the beginning of my career, I worked at JLabs, a startup in
              Delhi. This was a great opportunity for me to gain experience
              working with <Imp>hybrid mobile apps</Imp> using the Ionic
              framework, as well as developing Django backend systems.
            </Body>
          </div>
        </section>
      </article>
    </main>
  );
}
