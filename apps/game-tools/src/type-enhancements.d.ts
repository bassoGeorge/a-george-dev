declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    character?: {
      name: string;
      description: string;
      level: number;
    };
  }
}

// important, makes this file a module for ts, not an ambient script which will replace the above module entirely
export {};
