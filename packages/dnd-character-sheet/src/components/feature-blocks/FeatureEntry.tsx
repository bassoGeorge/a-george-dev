import type { Feature } from '../../lib/models/feature';
import { RichTextDisplay } from '../RichTextDisplay/RichTextDisplay';

export function FeatureEntry({ data: feat }: { data: Feature }) {
  return (
    <div className="text-sm">
      <span className="font-bold">{feat.name}.</span>
      {feat.cost && (
        <em className="text-neutral-subdued">(Cost: {feat.cost})</em>
      )}
      &nbsp;
      {/* <span>&nbsp;{feat.description}</span> */}
      <RichTextDisplay element="span" content={feat.description} />
    </div>
  );
}
