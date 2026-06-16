import type { Spell } from '../../lib/models/character'
import { useCharacter } from '../CharacterSheet'
import { Panel } from '../layout/Panel'
import { PanelTitle } from '../layout/PanelTitle'
import { SpellcastingHeader } from './SpellcastingHeader'
import { SpellLevelSection } from './SpellLevelSection'

export function SpellcastingBlock() {
  const { character } = useCharacter()
  const { spellcasting } = character
  if (!spellcasting) return null

  // Collect all levels that have spells or defined slots
  const spellsByLevel = new Map<number, Spell[]>()

  for (const spell of spellcasting.spells) {
    const bucket = spellsByLevel.get(spell.level) ?? []
    bucket.push(spell)
    spellsByLevel.set(spell.level, bucket)
  }

  // Ensure levels with slots but no spells still appear
  if (spellcasting.slots) {
    for (const levelStr of Object.keys(spellcasting.slots)) {
      const level = Number(levelStr)
      if (!spellsByLevel.has(level)) {
        spellsByLevel.set(level, [])
      }
    }
  }

  const sortedLevels = [...spellsByLevel.keys()].sort((a, b) => a - b)

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Spellcasting</PanelTitle>
      <SpellcastingHeader />
      <div>
        {sortedLevels.map((level) => (
          <SpellLevelSection
            key={level}
            level={level}
            spells={spellsByLevel.get(level) ?? []}
          />
        ))}
      </div>
    </Panel>
  )
}
