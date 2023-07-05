import { Card } from '@ageorgedev/atoms';
import { useTheme } from './theming/theme-provider';

// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import {
  darcula as darkTheme,
  solarizedlight as lightTheme,
  // @ts-ignore
} from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  text: string;
  lang?: 'typescript' | 'html' | 'css' | 'jsx' | 'tsx' | 'javascript';
  fontSize?: 'normal' | 'small' | 'large';
} & React.HTMLProps<HTMLDivElement>;

export function CodeBlock({
  lang,
  text,
  fontSize,
  className,
  ...otherProps
}: CodeBlockProps) {
  const { theme } = useTheme();
  const codeTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Card
      className={`text-left ${className ?? ''} ${
        fontSizeMap[fontSize ?? 'normal']
      }`}
      {...otherProps}
    >
      <SyntaxHighlighter
        language={lang ?? 'typescript'}
        style={codeTheme}
        showLineNumbers={true}
        customStyle={{ margin: 0, borderRadius: 0 }}
      >
        {text}
      </SyntaxHighlighter>
    </Card>
  );
}

const fontSizeMap: Record<Required<CodeBlockProps>['fontSize'], string> = {
  large: 'text-2xl',
  normal: 'text-lg large-desktop:text-xl',
  small: 'text-lg',
};
