import { TiltCard, TiltCardProps } from '@ageorgedev/atoms';
import { Lightning } from '@phosphor-icons/react';

type ImportantNoteProps = React.PropsWithChildren<{
  shape?: TiltCardProps['shape'];
  className?: string;
}>;

export function ImportantNote(props: ImportantNoteProps) {
  return (
    <div className={props.className ?? ''}>
      <TiltCard
        shape={props.shape}
        className="bg-rc-p-accent-100 dark:bg-rc-p-accent-500 flex gap-2"
      >
        <Lightning
          weight="duotone"
          className="text-3xl text-cc-accent dark:text-cc-neutral"
        />
        <div className="text-left">{props.children}</div>
      </TiltCard>
    </div>
  );
}
