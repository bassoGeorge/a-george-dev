/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: handled through dompurify */
import { cn } from '@ageorgedev/toolbelt/cn';
// import dompurify from 'dompurify';
// import { useMemo } from 'react';
import styles from './RichTextDisplay.module.css';

type RichTextDisplayProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  content: string;
  element?: 'span' | 'div';
};

export function RichTextDisplay({
  className,
  element: Element = 'div',
  content,
  ...props
}: RichTextDisplayProps) {
  // const cleanHtml = useMemo(() => dompurify.sanitize(content), [content]);
  return (
    <Element
      {...props}
      className={cn(styles.Container, className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
