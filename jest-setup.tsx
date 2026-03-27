import '@testing-library/jest-dom';

// jest.mock('react-syntax-highlighter', () => ({
//   Prism: ({ children }: { children: React.ReactNode }) => (
//     <code>{children}</code>
//   ),
// }));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  darcula: {},
  solarizedlight: {},
}));
