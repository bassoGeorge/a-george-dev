export const ColorCombinations = {
  primary: {
    text: 'text-primary-foreground',
    surface: 'bg-primary-surface',
    onSurfaceText: 'text-primary-onsurface',
    bgAsText: 'bg-primary-foreground',
  },
  secondary: {
    text: 'text-secondary-foreground',
    surface: 'bg-secondary-surface',
    onSurfaceText: 'text-secondary-onsurface',
    bgAsText: 'bg-secondary-foreground',
  },
  info: {
    text: 'text-info-foreground',
    surface: 'bg-info-surface',
    onSurfaceText: 'text-info-onsurface',
    bgAsText: 'bg-info-foreground',
  },
  warning: {
    text: 'text-warning-foreground',
    surface: 'bg-warning-surface',
    onSurfaceText: 'text-warning-onsurface',
    bgAsText: 'bg-warning-foreground',
  },
  destructive: {
    text: 'text-destructive-foreground',
    surface: 'bg-destructive-surface',
    onSurfaceText: 'text-destructive-onsurface',
    bgAsText: 'bg-destructive-foreground',
  },
  dataRed: {
    text: 'text-data-red-foreground',
    surface: 'bg-data-red-surface',
    onSurfaceText: 'text-data-red-onsurface',
    bgAsText: 'bg-data-red-foreground',
  },
  dataOrange: {
    text: 'text-data-orange-foreground',
    surface: 'bg-data-orange-surface',
    onSurfaceText: 'text-data-orange-onsurface',
    bgAsText: 'bg-data-orange-foreground',
  },
  dataYellow: {
    text: 'text-data-yellow-foreground',
    surface: 'bg-data-yellow-surface',
    onSurfaceText: 'text-data-yellow-onsurface',
    bgAsText: 'bg-data-yellow-foreground',
  },
  dataGreen: {
    text: 'text-data-green-foreground',
    surface: 'bg-data-green-surface',
    onSurfaceText: 'text-data-green-onsurface',
    bgAsText: 'bg-data-green-foreground',
  },
  dataCyan: {
    text: 'text-data-cyan-foreground',
    surface: 'bg-data-cyan-surface',
    onSurfaceText: 'text-data-cyan-onsurface',
    bgAsText: 'bg-data-cyan-foreground',
  },
  dataBlue: {
    text: 'text-data-blue-foreground',
    surface: 'bg-data-blue-surface',
    onSurfaceText: 'text-data-blue-onsurface',
    bgAsText: 'bg-data-blue-foreground',
  },
  dataPurple: {
    text: 'text-data-purple-foreground',
    surface: 'bg-data-purple-surface',
    onSurfaceText: 'text-data-purple-onsurface',
    bgAsText: 'bg-data-purple-foreground',
  },
  dataMagenta: {
    text: 'text-data-magenta-foreground',
    surface: 'bg-data-magenta-surface',
    onSurfaceText: 'text-data-magenta-onsurface',
    bgAsText: 'bg-data-magenta-foreground',
  },
  dataPink: {
    text: 'text-data-pink-foreground',
    surface: 'bg-data-pink-surface',
    onSurfaceText: 'text-data-pink-onsurface',
    bgAsText: 'bg-data-pink-foreground',
  },
};

export type ColorWay = keyof typeof ColorCombinations;
export type ColorWaySections = (typeof ColorCombinations)[ColorWay];
