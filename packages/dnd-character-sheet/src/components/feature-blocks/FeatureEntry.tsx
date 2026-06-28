import type { Feature } from '../../lib/models/feature';
import { RichTextDisplay } from '../RichTextDisplay/RichTextDisplay';

export function FeatureEntry({ data: feat }: { data: Feature }) {
  const notes = [
    feat.castingTime,
    feat.duration,
    feat.cost && `Cost: ${feat.cost}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="text-sm">
      <span className="font-bold">{feat.name}.</span>
      {notes && <em className="text-neutral-subdued">({notes})</em>}
      &nbsp;
      {/* <span>&nbsp;{feat.description}</span> */}
      <RichTextDisplay element="span" content={feat.description} />
    </div>
  );
}
