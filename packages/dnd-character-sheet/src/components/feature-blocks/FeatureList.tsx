import { cn } from '@ageorgedev/toolbelt/cn';
import type { Feature } from '../../lib/models/feature';
import { FeatureEntry } from './FeatureEntry';

type FeatureListProps = React.HTMLAttributes<HTMLDivElement> & {
  features: Feature[];
};

export function FeatureList({
  className,
  features,
  ...props
}: FeatureListProps) {
  if (!features.length) {
    return (
      <div className="h-8 flex items-center justify-center">
        <span className="text-neutral-disabled italic">No features</span>
      </div>
    );
  }
  return (
    <div {...props} className={cn('*:mt-2 *:first:mt-0', className)}>
      {features.map((feature) => (
        <FeatureEntry key={feature.name} data={feature} />
      ))}
    </div>
  );
}
