import { BodyMd } from '@ageorgedev/atoms';
import { article, aside, header, page } from './resume.css';
import { GithubLogo } from '@phosphor-icons/react';

export default function Resume() {
  return (
    <main className={page}>
      <header className={header}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
          tempore!
        </p>
        <p>
          Consequuntur id nihil non pariatur voluptatum. Atque iste minus
          obcaecati!
        </p>
        <p className="text-rc-p-accent-300">
          Ab commodi dicta dolores, minus nihil officia perspiciatis quam
          soluta.
        </p>
      </header>
      <aside className={aside}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni nam
          quas suscipit ullam!
        </p>
        <p>
          Aliquam blanditiis cupiditate iste molestiae nesciunt nihil, omnis
          quisquam sed tenetur voluptatem! Omnis.
        </p>
        <p>
          Aut autem enim eveniet excepturi illo, libero quae, quidem quis, sunt
          tempora totam!
        </p>
        <p>
          At autem cum eius harum ipsum nihil reiciendis sequi sunt? Dolorum,
          magni, velit.
        </p>
        <p>
          Dignissimos facilis in neque tempora! Animi dicta explicabo fugiat,
          laboriosam maiores ratione unde.
        </p>
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
