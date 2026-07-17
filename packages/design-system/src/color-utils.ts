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
  dataLime: {
    text: 'text-data-lime-foreground',
    surface: 'bg-data-lime-surface',
    onSurfaceText: 'text-data-lime-onsurface',
    bgAsText: 'bg-data-lime-foreground',
  },
  dataPlum: {
    text: 'text-data-plum-foreground',
    surface: 'bg-data-plum-surface',
    onSurfaceText: 'text-data-plum-onsurface',
    bgAsText: 'bg-data-plum-foreground',
  },
  dataSea: {
    text: 'text-data-sea-foreground',
    surface: 'bg-data-sea-surface',
    onSurfaceText: 'text-data-sea-onsurface',
    bgAsText: 'bg-data-sea-foreground',
  },
  dataRoyal: {
    text: 'text-data-royal-foreground',
    surface: 'bg-data-royal-surface',
    onSurfaceText: 'text-data-royal-onsurface',
    bgAsText: 'bg-data-royal-foreground',
  },
};

export type ColorWay = keyof typeof ColorCombinations;
export type ColorWaySections = (typeof ColorCombinations)[ColorWay];
