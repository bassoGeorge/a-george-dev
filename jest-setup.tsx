import '@testing-library/jest-dom'

jest.mock('react-syntax-highlighter', () => ({
  Prism: ({
    children,
    showLineNumbers,
  }: {
    children: React.ReactNode
    showLineNumbers?: boolean
    [key: string]: unknown
  }) => (
    <pre>
      <code>
        {showLineNumbers && <span>1</span>}
        {children}
      </code>
    </pre>
  ),
}))

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  darcula: {},
  solarizedlight: {},
}))
