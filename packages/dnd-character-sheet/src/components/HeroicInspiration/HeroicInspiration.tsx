import { DiamondCheck } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function HeroicInspiration() {
  return (
    <Panel
      outerClasses="flex-1"
      bottomRightCorner="scooped"
      bottomLeftCorner="scooped"
    >
      <PanelTitle className="px-3 py-1.5">Heroic Inspiration</PanelTitle>
      <div className="flex items-center justify-center py-4">
        <DiamondCheck />
      </div>
    </Panel>
  );
}
