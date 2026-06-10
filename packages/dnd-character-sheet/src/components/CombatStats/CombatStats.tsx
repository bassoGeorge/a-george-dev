import { useCharacter } from '../CharacterSheet'
import styles from './CombatStats.module.css'

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function CombatStats() {
  const { character, derived } = useCharacter()
  const { hitPoints } = character

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-sheet-border overflow-hidden`}
    >
      <h2 className="bg-sheet-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Combat
      </h2>
      <div className="p-3 grid grid-cols-3 gap-2">
        <Stat label="Armor Class">{character.armorClass}</Stat>
        <Stat label="Initiative">{formatMod(derived.initiative)}</Stat>
        <Stat label="Speed">{character.speed} ft</Stat>
      </div>
      <div className="border-t border-sheet-border p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1 text-center">
          Hit Points
        </p>
        <div className="flex justify-center gap-4">
          <Stat label="Maximum">{hitPoints.maximum}</Stat>
          {hitPoints.current !== undefined && (
            <Stat label="Current">{hitPoints.current}</Stat>
          )}
          {hitPoints.temporary !== undefined && hitPoints.temporary > 0 && (
            <Stat label="Temp">{hitPoints.temporary}</Stat>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center border border-sheet-border rounded py-1.5 px-2">
      <span className="text-xl font-bold text-sheet-dark">{children}</span>
      <span className="text-xs text-gray-500 uppercase tracking-wide text-center leading-tight mt-0.5">
        {label}
      </span>
    </div>
  )
}
