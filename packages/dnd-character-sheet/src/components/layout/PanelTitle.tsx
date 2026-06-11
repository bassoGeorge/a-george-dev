import { cn } from '@ageorgedev/toolbelt/cn'

export function PanelTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'uppercase text-center block font-interface text-sm font-bold',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}
