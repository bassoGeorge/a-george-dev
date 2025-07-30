import { cn } from '@ageorgedev/toolbelt';
import { Icon } from '@phosphor-icons/react';
import { InterfaceXl } from '../typography/typography-components';

type CalloutBadgeProps = {
  text: string;
  icon: Icon;
  className?: string;
  type?: CalloutType;
};

export function CalloutBadge({
  text,
  icon: Icon,
  type,
  className,
}: CalloutBadgeProps) {
  const typeClasses = StyleClasses[type ?? 'info1'];
  return (
    <div className={cn('inline-block p-5', className)}>
      <div className="drop-shadow-normal">
        <div
          className={cn(
            'relative flex h-10 w-10 -rotate-12 flex-col items-center justify-center gap-1 before:absolute before:inset-0 before:-z-1 before:rotate-45',
            typeClasses
          )}
        >
          <Icon weight="bold" className="text-5xl" />
          <InterfaceXl className="max-w-[80%] text-center">{text}</InterfaceXl>
        </div>
      </div>
    </div>
  );
}

type CalloutType = 'info1' | 'info2' | 'info3' | 'danger' | 'neutral';

const StyleClasses: Record<CalloutType, string> = {
  info1: 'before:bg-primary-surface-2 text-primary-onsurface-2',
  info2: 'before:bg-primary-surface text-primary-onsurface',
  info3: 'before:bg-primary-surface-0 text-primary-onsurface-0',
  neutral: 'before:bg-info-surface text-info-onsurface', // TODO
  danger: 'before:bg-destructive-surface text-destructive-onsurface',
};
