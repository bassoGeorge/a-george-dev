// biome-ignore-all lint/suspicious/noExplicitAny: Easiest way to handle svg
import 'react';

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
