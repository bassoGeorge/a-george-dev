import { createContext, useContext } from 'react';

interface VisualAdjustments {
  spellRows: number;
  inventoryRows: number;
}

export const DEFAULT_VISUAL_ADUSTMENTS: VisualAdjustments = {
  spellRows: 48,
  inventoryRows: 10,
};

export const VisualAdjustmentsContext = createContext<VisualAdjustments>(
  DEFAULT_VISUAL_ADUSTMENTS
);

export function useVisualAdjustments(): VisualAdjustments {
  return useContext(VisualAdjustmentsContext);
}
