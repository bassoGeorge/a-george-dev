import { Heading1, Heading4 } from '@ageorgedev/atoms';
import { article, aside, header, page } from './resume.css';

export default function Resume() {
  return (
    <main className={page}>
      <header className={header}></header>
      <aside className={aside}></aside>
      <article className={article}></article>
    </main>
  );
}
