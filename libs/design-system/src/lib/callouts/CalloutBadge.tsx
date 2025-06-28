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
    <div className={`${className ?? 'inline-block p-5'}`}>
      <div className="drop-shadow-normal">
        <div
          className={`relative flex h-10 w-10 -rotate-12 flex-col items-center justify-center gap-1 before:absolute before:inset-0 before:-z-1 before:rotate-45 ${typeClasses}`}
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
  info1: 'before:bg-accent text-neutral-inverse',
  info2: 'before:bg-accent-subtle text-neutral-inverse',
  info3: 'before:bg-alt-accent-subtle text-neutral-inverse',
  neutral: 'before:bg-neutral text-neutral-inverse',
  danger: 'before:bg-danger-bg text-danger-fg',
};
