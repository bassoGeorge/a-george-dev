import { cn } from '@ageorgedev/toolbelt/cn'
import styles from './SubPanel.module.css'

export function SubPanel({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.subPanel, 'h-full', className)} {...props} />
}
