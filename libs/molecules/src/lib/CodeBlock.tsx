type CodeBlockProps = {
  text: string;
};

export function CodeBlock(props: CodeBlockProps) {
  return (
    <pre>
      <code className="px-6 py-6" data-trim data-noescape>
        {props.text}
      </code>
    </pre>
  );
}
