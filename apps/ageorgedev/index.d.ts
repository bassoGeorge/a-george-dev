/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '*.md' {
  const attributes: Record<string, string>;
  const react: React.ElementType;
  export { attributes, react };
}
