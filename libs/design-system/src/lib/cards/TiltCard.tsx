import { cn } from '@ageorgedev/toolbelt';
import styles from './TiltCard.module.css';

export type TiltCardProps = {
  outerClassName?: string;
  shape?: 'trapRight' | 'trapLeft' | 'triUpperRight' | 'triUpperLeft';
  interactive?: boolean;
  skewStrength?: 'small' | 'medium' | 'large';
  border?: 'all' | 'bottom' | 'none';
} & React.HTMLProps<HTMLDivElement>;

export function TiltCard({
  children,
  className,
  outerClassName,
  interactive,
  shape,
  skewStrength,
  border,
  ...htmlProps
}: TiltCardProps) {
  const skewClass = shape ? styles[shape] : '';
  const skewStrengthClass = styles['skew-' + (skewStrength ?? 'medium')];
  const interC = interactive ? styles.interactive : '';
  const borderC = borderClassMap[border ?? 'all'];

  return (
    <div
      {...htmlProps}
      className={cn(
        'elv-raised-md',
        skewClass,
        skewStrengthClass,
        interC,
        outerClassName
      )}
    >
      <div className={cn('bg-line', styles.skewStyle, borderC)}>
        <div className={cn('bg-page-1 p-6', styles.skewStyle, className)}>
          {children}
        </div>
      </div>
    </div>
  );
}

const borderClassMap: Record<Required<TiltCardProps>['border'], string> = {
  all: 'p-thick-line',
  bottom: 'pb-thick-line',
  none: '',
};
