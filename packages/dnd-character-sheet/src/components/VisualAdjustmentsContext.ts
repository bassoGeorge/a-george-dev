import { createContext, useContext } from 'react';

type FullVisualAdjustments = {
  spellRows: number;
  inventoryRows: number;
  classFeaturesFontSize: 'normal' | 'small';
  speciesAndFeatsFontSize: 'normal' | 'small';
};
export type VisualAdjustments = Partial<FullVisualAdjustments>;

export const DEFAULT_VISUAL_ADUSTMENTS: FullVisualAdjustments = {
  spellRows: 20,
  inventoryRows: 10,
  classFeaturesFontSize: 'normal',
  speciesAndFeatsFontSize: 'normal',
};

export const VisualAdjustmentsContext = createContext<FullVisualAdjustments>(
  DEFAULT_VISUAL_ADUSTMENTS
);

export function useVisualAdjustments(): FullVisualAdjustments {
  return useContext(VisualAdjustmentsContext);
}
