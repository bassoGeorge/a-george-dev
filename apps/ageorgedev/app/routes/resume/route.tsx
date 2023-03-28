import {
  Body,
  BodyMd,
  Heading2,
  Heading4,
  Heading5,
  NameLogo,
} from '@ageorgedev/atoms';
import { article, aside, header, page } from './resume.css';
import { GithubLogo } from '@phosphor-icons/react';
import { SocialLink } from './SocialLink';

export default function Resume() {
  return (
    <main className={page}>
      <header
        className={`${header} flex items-start justify-between px-5 pt-4`}
      >
        <NameLogo className="text-5xl self-end -mb-3" />
        <div className="flex flex-col gap-2 mt-3">
          <SocialLink type="email" full={true} />
          <SocialLink type="phone" full={true} />
        </div>
      </header>
      <aside className={aside}>
        <div>
          <Heading5 as={'h2'} className="font-bold text-rc-s-accent-400">
            Web Developer
          </Heading5>
          <Body>Architecting web experiences since 2016</Body>
        </div>
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
