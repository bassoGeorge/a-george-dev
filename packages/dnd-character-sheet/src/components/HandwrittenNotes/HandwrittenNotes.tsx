import { cn } from '@ageorgedev/toolbelt/cn';

type HandWrittenNotesProps = {
  lineCount: number;
} & Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'children'>;

export function HandWrittenNotes({
  lineCount,
  className,
  ...props
}: HandWrittenNotesProps) {
  return (
    <div className={cn('', className)} {...props}>
      {Array.from({ length: lineCount }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: not required
          key={i}
          className="text-base border-b border-dotted border-neutral-disabled"
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
}
