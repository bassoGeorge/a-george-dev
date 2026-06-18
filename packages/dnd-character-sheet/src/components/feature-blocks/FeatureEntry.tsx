import type { Feature } from '../../lib/models/feature';

export function FeatureEntry({ data: feat }: { data: Feature }) {
  return (
    <div className="text-sm">
      <span className="font-bold">{feat.name}.</span>
      {feat.cost && (
        <em className="text-neutral-subdued">(Cost: {feat.cost})</em>
      )}
      <span>&nbsp;{feat.description}</span>
    </div>
  );
}
