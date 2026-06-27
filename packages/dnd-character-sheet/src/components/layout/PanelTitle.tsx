import { cn } from '@ageorgedev/toolbelt/cn';
import { HorizontalDivider } from './dividers';

type PanelTitleProps = {
  withDivider?: boolean;
} & React.HTMLAttributes<HTMLHeadingElement>;

export function PanelTitle({
  children,
  className,
  withDivider,
  ...props
}: PanelTitleProps) {
  return (
    <>
      <h3
        className={cn(
          'uppercase text-center block font-interface text-sm font-bold',
          !withDivider && 'mb-3',
          className
        )}
        {...props}
      >
        {children}
      </h3>
      {withDivider && <HorizontalDivider className="mt-1 mb-3" />}
    </>
  );
}
