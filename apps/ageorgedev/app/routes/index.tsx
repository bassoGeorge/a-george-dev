import { Link } from '@remix-run/react';
import { DemoDs } from '@ageorgedev/demo-ds';

export default function Index() {
  return (
    <div>
      <h1 className={'text-xl font-serif text-bold'}>
        Dummy Remix App for testing things out
      </h1>
      <p className={'text-green-600 font-bold'}>
        If tailwind is in play, this text should be green in color
      </p>
      <DemoDs />
      <ul>
        <li>
          <Link to={'/exp'}>Testing Link</Link>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
