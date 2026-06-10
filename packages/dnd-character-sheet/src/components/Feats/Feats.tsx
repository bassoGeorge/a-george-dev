import { useCharacter } from '../CharacterSheet'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

export function Feats() {
  const { character } = useCharacter()
  const feats = character.feats ?? []

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Feats</PanelTitle>
      <div className="p-3 flex flex-col gap-2">
        {feats.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-2">
            No feats
          </p>
        ) : (
          feats.map((feat, i) => (
            <div key={i} className="border border-sheet-border rounded p-2">
              <p className="text-xs font-bold text-sheet-dark leading-tight">
                {feat.name}
              </p>
              <p className="text-xs text-gray-500 mb-0.5">{feat.source}</p>
              <p className="text-xs text-sheet-dark leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))
        )}
      </div>
    </Panel>
  )
}
