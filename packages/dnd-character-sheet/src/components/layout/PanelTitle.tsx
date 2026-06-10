import { cn } from '@ageorgedev/toolbelt/cn'

export function PanelTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'uppercase text-center block font-interface text-sm font-bold',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
