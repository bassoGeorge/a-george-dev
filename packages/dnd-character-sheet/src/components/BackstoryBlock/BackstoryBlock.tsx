import { useCharacter } from '../CharacterSheet'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'

const PERSONALITY_FIELDS = [
  { key: 'traits', label: 'Personality Traits' },
  { key: 'ideals', label: 'Ideals' },
  { key: 'bonds', label: 'Bonds' },
  { key: 'flaws', label: 'Flaws' },
] as const

export function BackstoryBlock() {
  const { character } = useCharacter()

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">
        Backstory &amp; Personality
      </PanelTitle>
      <div className="p-3 flex flex-col gap-2">
        {PERSONALITY_FIELDS.map(({ key, label }) => (
          <div key={key} className="border border-sheet-border rounded p-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              {label}
            </p>
            <p className="text-xs text-sheet-dark leading-relaxed">
              {character.personality[key]}
            </p>
          </div>
        ))}

        {character.backstory && (
          <div className="border border-sheet-border rounded p-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Backstory
            </p>
            <p className="text-xs text-sheet-dark leading-relaxed">
              {character.backstory}
            </p>
          </div>
        )}

        {character.notes && (
          <div className="border border-sheet-border rounded p-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Notes
            </p>
            <p className="text-xs text-sheet-dark leading-relaxed">
              {character.notes}
            </p>
          </div>
        )}

        {character.languages.length > 0 && (
          <div className="border border-sheet-border rounded p-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Languages
            </p>
            <p className="text-xs text-sheet-dark leading-relaxed">
              {character.languages.join(', ')}
            </p>
          </div>
        )}
      </div>
    </Panel>
  )
}
