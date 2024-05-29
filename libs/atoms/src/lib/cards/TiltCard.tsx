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
      className={`
      drop-shadow
      ${skewClass}
      ${skewStrengthClass}
      ${interC} 
      ${outerClassName ?? ''}`}
    >
      <div className={`bg-cc-line ${styles.skewStyle} ${borderC}`}>
        <div
          className={`p-6 bg-cc-page-1 ${styles.skewStyle} ${className ?? ''}`}
        >
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
