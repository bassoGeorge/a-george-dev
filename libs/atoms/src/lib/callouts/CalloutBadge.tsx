import { Icon } from '@phosphor-icons/react';
import { InterfaceXl } from '../typography/typography-components';
import { calloutBadgeShape } from './CalloutBadge.css';

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
      <div className="drop-shadow">
        <div className={`${calloutBadgeShape} ${typeClasses}`}>
          <Icon weight="bold" className="text-5xl" />
          <InterfaceXl className="max-w-[80%] text-center">{text}</InterfaceXl>
        </div>
      </div>
    </div>
  );
}

type CalloutType = 'info1' | 'info2' | 'info3' | 'danger' | 'neutral';

const StyleClasses: Record<CalloutType, string> = {
  info1: 'before:bg-cc-accent text-cc-neutral-inverse',
  info2: 'before:bg-cc-accent-subtle text-cc-neutral-inverse',
  info3: 'before:bg-cc-alt-accent-subtle text-cc-neutral-inverse',
  neutral: 'before:bg-cc-neutral text-cc-neutral-inverse',
  danger: 'before:bg-cc-danger-bg text-cc-danger-fg',
};
