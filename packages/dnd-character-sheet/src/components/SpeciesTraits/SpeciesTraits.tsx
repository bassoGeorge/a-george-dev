import { useCharacter } from '../CharacterSheet'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

export function SpeciesTraits() {
  const { character } = useCharacter()
  const traits = character.speciesTraits ?? []

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Species Traits</PanelTitle>
      <div className="p-3 flex flex-col gap-2">
        {traits.length === 0 ? (
          <p className="text-xs text-gray-400 italic text-center py-2">
            No species traits
          </p>
        ) : (
          traits.map((trait, i) => (
            <div key={i} className="border border-sheet-border rounded p-2">
              <p className="text-xs font-bold text-sheet-dark leading-tight">
                {trait.name}
              </p>
              <p className="text-xs text-gray-500 mb-0.5">{trait.source}</p>
              <p className="text-xs text-sheet-dark leading-relaxed">
                {trait.description}
              </p>
            </div>
          ))
        )}
      </div>
    </Panel>
  )
}
