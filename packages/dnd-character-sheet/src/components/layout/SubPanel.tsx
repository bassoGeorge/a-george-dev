import { cn } from '@ageorgedev/toolbelt/cn';
import styles from './SubPanel.module.css';

export function VerticalSubPanel({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.vSubPanel, 'h-full', className)} {...props} />
  );
}

export function HorizontalSubPanel({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.hSubPanel, 'w-full', className)} {...props} />
  );
}
