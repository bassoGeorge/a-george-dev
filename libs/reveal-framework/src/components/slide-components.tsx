import { TiltCard, TiltCardProps, CalloutBadge } from '@ageorgedev/atoms';
import {
  Circle,
  Exam,
  Icon,
  Lightning,
  Megaphone,
  PenNib,
  Warning,
} from '@phosphor-icons/react';

type ImportantNoteProps = React.PropsWithChildren<{
  shape?: TiltCardProps['shape'];
  className?: string;
  type?: NoteType;
}>;

type NoteType = 'tip' | 'danger';

export function ImportantNote(props: ImportantNoteProps) {
  const noteType = props.type ?? 'tip';
  const { iconClasses, mainClasses, Icon } = NoteConfigs[noteType];
  return (
    <div className={props.className ?? ''}>
      <TiltCard shape={props.shape} className={`${mainClasses} flex gap-2`}>
        <Icon className={`${iconClasses} text-3xl shrink-0`} />
        <div className="text-left">{props.children}</div>
      </TiltCard>
    </div>
  );
}

const NoteConfigs: Record<
  NoteType,
  { mainClasses: string; iconClasses: string; Icon: Icon }
> = {
  tip: {
    mainClasses: 'bg-rc-p-accent-100 dark:bg-rc-p-accent-500',
    iconClasses: 'text-cc-accent dark:text-cc-neutral',
    Icon: Lightning,
  },
  danger: {
    mainClasses: 'bg-cc-danger-bg text-cc-danger-fg',
    iconClasses: '',
    Icon: Warning,
  },
};

export function CalloutForVD() {
  return <CalloutBadge type="neutral" icon={PenNib} text={'UI/UX'} />;
}

export function CalloutForAdvancedTopic() {
  return <CalloutBadge type="danger" icon={Exam} text={'Advanced'} />;
}

export function CalloutForPersonalOpinion() {
  return <CalloutBadge type="info1" icon={Megaphone} text={'Opinion'} />;
}

export function PointSeperator() {
  return <Circle className="text-3xl text-cc-accent large-desktop:my-3" />;
}
