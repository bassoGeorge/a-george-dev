import {
  TiltCard,
  TiltCardProps,
  CalloutBadge,
  cn,
} from '@ageorgedev/design-system';
import {
  BracketsAngleIcon,
  ExamIcon,
  Icon,
  LightningIcon,
  MegaphoneIcon,
  PenNibIcon,
  WarningIcon,
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
    <div className={props.className}>
      <TiltCard shape={props.shape} className={cn(mainClasses, 'flex gap-2')}>
        <Icon className={cn(iconClasses, 'shrink-0 text-3xl')} />
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
    mainClasses: 'bg-primary-surface text-primary-on-surface',
    iconClasses: '',
    Icon: LightningIcon,
  },
  danger: {
    mainClasses: 'bg-destructive-surface text-destructive-onsurface',
    iconClasses: '',
    Icon: WarningIcon,
  },
};

export function CalloutForVD() {
  return <CalloutBadge type="neutral" icon={PenNibIcon} text={'UI/UX'} />;
}

export function CalloutForAdvancedTopic() {
  return <CalloutBadge type="danger" icon={ExamIcon} text={'Advanced'} />;
}

export function CalloutForPersonalOpinion() {
  return <CalloutBadge type="info1" icon={MegaphoneIcon} text={'Opinion'} />;
}

export function PointSeperator({ className }: { className?: string }) {
  return (
    <BracketsAngleIcon
      className={cn(
        'mx-auto mt-2 mb-3 block text-xl text-primary-foreground large-desktop:mb-4',
        className
      )}
    />
  );
}
