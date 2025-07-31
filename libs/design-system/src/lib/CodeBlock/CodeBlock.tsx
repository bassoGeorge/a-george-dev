import { cn } from '@ageorgedev/toolbelt';
import { Card } from '../cards/Card';
import { useTheme } from '../theming/ThemeContext';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async-light';
import {
  darcula as darkTheme,
  solarizedlight as lightTheme,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeBlockProps = {
  text: string;
  lang?: 'typescript' | 'html' | 'css' | 'jsx' | 'tsx' | 'javascript';
  fontSize?: 'normal' | 'small' | 'large';
} & React.HTMLProps<HTMLDivElement>;

const fixedLightTheme = fixFont(lightTheme);
const fixedDarkTheme = fixFont(darkTheme);

export function CodeBlock({
  lang,
  text,
  fontSize,
  className,
  ...otherProps
}: CodeBlockProps) {
  const { theme } = useTheme();
  const codeTheme = theme === 'light' ? fixedLightTheme : fixedDarkTheme;

  return (
    <Card
      className={cn('text-left', className, fontSizeMap[fontSize ?? 'normal'])}
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
  large: 'text-xl large-desktop:text-2xl',
  normal: 'text-lg large-desktop:text-xl',
  small: 'text-md large-desktop:text-lg',
};

function fixFont(theme: { [k: string]: React.CSSProperties }) {
  const styleKey1 = 'code[class*="language-"]';
  const styleKey2 = 'pre[class*="language-"]';
  return {
    ...theme,
    [styleKey1]: {
      ...theme[styleKey1],
      fontFamily: '"Source Code Pro", monospace',
    },
    [styleKey2]: {
      ...theme[styleKey2],
      fontFamily: '"Source Code Pro", monospace',
    },
  };
}
