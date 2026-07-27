import { cn } from '@ageorgedev/toolbelt/cn';
import styles from './Page.module.css';

// TODO: outer container can be used for more than this page only

export function Page({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.PageOuter)}>
      <div
        className={cn(
          styles.PageInner,
          'max-w-[2048px] mx-auto px-6 font-heading flex flex-col min-h-[100vh]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
