import {
  Body,
  BodyLg,
  BodyMd,
  BodySm,
  BodyXl,
  BodyXs,
  Heading2,
  Heading4,
  Heading5,
  Heading6,
  NameLogo,
} from '@ageorgedev/atoms';
import { article, aside, eduGrid, header, page } from './resume.css';
import { GithubLogo } from '@phosphor-icons/react';
import { SocialLink } from './SocialLink';

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
          <Heading6 as={'h3'}>Skills</Heading6>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dolore?
        </p>
        <p>A ad cupiditate enim est explicabo nisi odio omnis vitae.</p>
        <p>
          Alias consequatur doloribus eaque, ex iure neque possimus quasi
          veritatis?
        </p>
        <p className="bg-cc-page-0">
          Dicta distinctio eum itaque maxime molestias nisi nobis nostrum,
          voluptatem.
        </p>
        <p className="flex gap-3 justify-start items-center">
          <a
            href="https://github.com/bassoGeorge"
            target="_blank"
            className={BodyMd.classes}
            rel="noreferrer"
          >
            <GithubLogo weight="duotone"></GithubLogo>
          </a>
          <a
            href="https://github.com/bassoGeorge"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/bassoGeorge
          </a>
        </p>
      </article>
    </main>
  );
}
