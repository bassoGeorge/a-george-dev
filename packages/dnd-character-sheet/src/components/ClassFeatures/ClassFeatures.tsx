import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function ClassFeatures() {
  const { character } = useCharacter();

  return (
    <Panel outerClasses="flex-1" className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Class Features</PanelTitle>
      <div className="p-3 columns-2 gap-3">
        {character.features.map((feature) => (
          <div
            key={feature.name}
            className="break-inside-avoid mb-3 border border-[var(--s-parchment-400)] rounded p-2"
          >
            <p className="text-xs font-bold text-neutral-strong leading-tight">
              {feature.name}
            </p>
            <p className="text-xs text-neutral-subdued mb-1">
              {feature.source}
            </p>
            <p className="text-xs text-neutral-strong leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
