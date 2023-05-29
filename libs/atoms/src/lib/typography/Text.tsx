import { TYPOGRAPHY_CLASSES, TypographyVariant } from './core-type-classes';
import { test } from 'ramda';

export type TextTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'p'
  | 'em'
  | 'b'
  | 'small';

type TextProps = {
  variant: TypographyVariant;
  as?: TextTag;
};

export function Text({
  variant,
  as: tag,
  className,
  children,
  ...otherProps
}: React.PropsWithChildren<TextProps> & React.HTMLAttributes<HTMLElement>) {
  const Tag = tag ?? getDefaultTag(variant);

  const classes = `${TYPOGRAPHY_CLASSES[variant]} ${className ?? ''}`.trim();

  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

export function TextBuilder<T extends TextTag>(variant: TypographyVariant) {
  function Component({
    children,
    ...props
  }: React.PropsWithChildren<{ as?: T }> & React.HTMLAttributes<HTMLElement>) {
    return (
      <Text variant={variant} {...props}>
        {children}
      </Text>
    );
  }

  Component.classes = TYPOGRAPHY_CLASSES[variant];
  return Component;
}

function getDefaultTag(variant: TypographyVariant): TextTag {
  const initial = defaultTag[variant];
  if (initial) {
    return initial;
  }

  if (isBodyVariant(variant)) {
    return 'p';
  }

  if (isInterfaceVariant(variant)) {
    return 'span';
  }

  return 'span';
}

const isBodyVariant = test(/^body.*$/);
const isInterfaceVariant = test(/^interface.*$/);

const defaultTag: Partial<Record<TypographyVariant, TextTag>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};
