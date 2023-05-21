import { useTheme } from './Theme';

// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-async-light';
import {
  darcula as darkTheme,
  solarizedlight as lightTheme,
  // @ts-ignore
} from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  text: string;
};

export function CodeBlock(props: CodeBlockProps) {
  const { theme } = useTheme();
  const codeTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div className="text-left">
      <SyntaxHighlighter
        language="typescript"
        style={codeTheme}
        showLineNumbers={true}
      >
        {props.text}
      </SyntaxHighlighter>
    </div>
  );
}
