import {
  Body,
  BodyLg,
  BodyMd,
  BodySm,
  BodyXl,
  BodyXs,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Interface,
  InterfaceSm,
  NameLogo,
} from '@ageorgedev/atoms';
import { article, aside, eduGrid, expGrid, header, page } from './resume.css';
import { ArrowSquareOut, GithubLogo } from '@phosphor-icons/react';
import { SocialLink } from './SocialLink';
import { AllSkills, Skill } from './Skill';

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
  return <span className="text-rc-s-accent-400 italic">{children}</span>;
}

export default function Resume() {
  const socialLinksBlockClasses = 'flex flex-col gap-2';
  return (
    <main className={page}>
      <header className={header}>
        <NameLogo className="text-5xl self-end -mb-3" />
        <div className={`${socialLinksBlockClasses} mt-3`}>
          <SocialLink type="email" full={true} />
          <SocialLink type="phone" full={true} />
        </div>
      </header>
      <aside className={aside}>
        <section>
          <Heading5 as={'h2'} className="font-bold text-rc-s-accent-400 mb-2">
            Web Architect
          </Heading5>
          <Body>
            Developing web experiences for over 7 years across various tech
            stacks. Leading web technologists
          </Body>
        </section>
        <section className={`${socialLinksBlockClasses} -mr-6`}>
          <SocialLink type="github" full={true} />
          <SocialLink type="linkedin" full={true} />
        </section>
        <section>
          <Heading6 as={'h3'} className="mb-2">
            Skills
          </Heading6>
          <div className="flex gap-2 flex-wrap">
            {AllSkills.map((props, index) => (
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
                className="inline ml-2 text-rc-p-accent-400"
              />
            </BodySm>
            <BodyXs className="text-cc-neutral-300">
              Functional Conf Bangalore | 2019
            </BodyXs>
          </a>
        </section>
        <section className="-mr-8">
          <Heading6 as={'h3'} className="mb-2">
            Education
          </Heading6>
          <div className={eduGrid}>
            {education.map((edu) => (
              <>
                <BodyXs>{edu.period}</BodyXs>
                <div>
                  <BodySm className="font-interface">{edu.programme}</BodySm>
                  <BodyXs className="text-cc-neutral-300">
                    {edu.institute}
                  </BodyXs>
                </div>
              </>
            ))}
          </div>
        </section>
      </aside>
      <article className={article}>
        <section className={expGrid}>
          <BodyLg className="justify-self-end font-bold text-rc-p-accent-500">
            2018 - 2023
          </BodyLg>
          <Heading3 className="font-medium">Thoughtworks</Heading3>
          <div className="justify-self-end self-start text-right">
            <p className="font-interface text-md leading-[1.2rem] text-cc-neutral-400">
              Lead UI Developer
            </p>
            <p className="text-xs leading-[1.2rem] text-cc-neutral-300 -mt-1 pb-1">
              2021
            </p>
            <p className="font-interface text-xs leading-[1.2rem] text-cc-neutral-400">
              Senior UI Developer
            </p>
            <p className="text-xs leading-[1.2rem] text-cc-neutral-300 -mt-1 pb-1">
              2019
            </p>
            <p className="font-interface text-xs leading-[1.2rem] text-cc-neutral-400">
              UI Developer
            </p>
            <p className="text-xs leading-[1.2rem] text-cc-neutral-300 -mt-1 pb-1">
              2018
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Body>
              Currently working for a client in the Hospitality sector.{' '}
              <Imp>I architected a brand new Design System</Imp> and helped them{' '}
              <Imp>set-up an Nx MonoRepo</Imp> for all future applications and
              libraries. The Design System is built with developer productivity
              in mind. It is based off Atomic design principles with a lot of
              Angular components (preferred tech stack of the client) which have
              proven to boost the speed of delivery. A design philosophy change
              in the middle of a release rush was implemented smoothly due to
              the scalable architecture of this system.
            </Body>
            <Body>
              Was brought in to rescue a struggling Thoughtworks internal
              project.{' '}
              <Imp>
                I revamped and polished the UI in a very short timeframe
              </Imp>{' '}
              (~1 week) before showcase.
            </Body>
            <Body>
              Ran <Imp>discovery and inception</Imp> workshops for a couple of
              accounts.
            </Body>
            <Body>
              Worked on multiple projects for a large business consultancy firm.
              Took ownership of the frontend stream of work.
            </Body>

            <Heading5 className="font-light mt-3">
              Community initiatives
            </Heading5>
            <Body>
              Helped run <Imp>Unfold UI</Imp>, an external facing UI conference
              from Thoughtworks. Also ran a VueJS workshop in the same
            </Body>
            <Body>
              Helped design and run a crash course called{' '}
              <Imp>CSS Level Zero Bootcamp</Imp>, targeting non UI devs to learn
              CSS so that they can contribute better to frontend.
            </Body>
            <Body>
              Helped design and run the recurring{' '}
              <Imp>Frontend Architect Programme</Imp> which targets UI
              Developers who need to take on a more architect role. I'm a
              regular trainer in this programme which is currently on its 7th
              batch.
            </Body>
            <Body>
              Part of a team which curated{' '}
              <Imp>learning resources for UI developers</Imp> at the
              organisation level. I was fully responsible for curating resources
              around HTML/CSS and Angular resources.
            </Body>
            <Body>
              Have contributed to <Imp>Thoughtworks Tech Radar</Imp> on multiple
              volumes.
            </Body>
            <Body>
              Heavily involved in the recruitment initiatives. I take interviews
              regularly and have helped the global recruitment team{' '}
              <Imp>revamp the UI Developer recruitment process</Imp>.
            </Body>
          </div>
        </section>

        <section className={expGrid}>
          <BodyLg className="justify-self-end font-bold text-rc-p-accent-500">
            2016 - 2018
          </BodyLg>
          <Heading3 className="font-medium">Ignite Solutions</Heading3>
          <div className="justify-self-end self-start text-right">
            <p className="font-interface text-md leading-[1.2rem] text-cc-neutral-400">
              Full Stack
              <br />
              Developer
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Body>
              Worked with multiple clients across various tech stacks including
              Angular frontend and Python based backends.
            </Body>
            <Body>
              Navigated through <Imp>legacy code</Imp> written in a mixture of
              CakePHP and Angular 1.x and was able to add new features, refactor
              and find vulnerabilities.
            </Body>
            <Body>
              Lead the <Imp>internationalisation</Imp> work on an existing
              project. This included setting up the architecture and managing
              the flow of work.
            </Body>
            <Body>
              Worked on building MS Office add-ins and Skype bot integrations.
            </Body>
          </div>
        </section>
        <section className={expGrid}>
          <BodyLg className="justify-self-end font-bold text-rc-p-accent-500">
            mid 2015
          </BodyLg>
          <Heading3 className="font-medium">JLabs</Heading3>
          <div className="justify-self-end self-start text-right">
            <p className="font-interface text-md leading-[1.2rem] text-cc-neutral-400">
              Developer
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Body>
              Worked at JLabs, a (nearly) garage startup in Delhi, straight out
              of college. Got the opportunity to work on{' '}
              <Imp>hybrid mobile apps</Imp> using Ionic framework and Django
              backend.
            </Body>
          </div>
        </section>
      </article>
    </main>
  );
}
