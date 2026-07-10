// biome-ignore-all lint/suspicious/noArrayIndexKey: Not important
import type { Feature } from '../../lib/models/feature';
import { useCharacter } from '../CharacterSheet';
import { EmptyCheckList } from '../layout/checkables';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

type Refresh = NonNullable<Feature['resource']>['refresh'];

export function Resources() {
  const { resources } = useCharacter();

  if (!resources.length) {
    return null;
  }

  return (
    <Panel topLeftCorner="scooped" topRightCorner="scooped">
      <PanelTitle>Resources</PanelTitle>
      <div className="columns-2 gap-4 mt-2">
        {resources.map((r) => (
          <div key={r.name} className="flex items-center text-xs gap-1">
            <span className="font-bold">
              {r.die ? `${r.name} (${r.die})` : r.name}
            </span>
            <em className="text-neutral-subdued">{`[${getRefreshText(r.refresh)}]`}</em>
            <div className="flex-1 border-b border-dotted border-neutral-subdued"></div>
            {r.display === 'dots' ? (
              <EmptyCheckList count={r.count} />
            ) : (
              <>
                <div className="self-stretch border-b border-neutral-subdued w-6"></div>
                <span className="text-base">/ {r.count}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function getRefreshText(refresh: Refresh): string {
  switch (refresh.kind) {
    case 'any-rest':
      return 'Any Rest';

    case 'long-rest':
      return 'Long Rest';

    case 'short-rest':
      return 'Short Rest';

    case 'short-and-long-rest':
      return `${refresh.numberOfRefreshesOnShortRest}/Short Rest, all on Long Rest`;
  }
}
