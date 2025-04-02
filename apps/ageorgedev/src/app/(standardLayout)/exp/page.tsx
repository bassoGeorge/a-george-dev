import { attributes, react as HomeContent } from '../../../content/home.md';

export default function Experiment() {
  return (
    <div>
      <p>Attribute title: {attributes.title}</p>
      <article>
        <HomeContent />
      </article>
    </div>
  );
}
