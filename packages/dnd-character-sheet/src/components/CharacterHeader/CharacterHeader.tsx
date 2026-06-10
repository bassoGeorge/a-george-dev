import { useCharacter } from '../CharacterSheet'
import styles from './CharacterHeader.module.css'

export function CharacterHeader() {
  const { character } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-sheet-red rounded-lg shadow-lg overflow-hidden mb-4`}
    >
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          {character.name}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2">
          <Field label="Class">
            {character.class}
            {character.subclass && ` (${character.subclass})`}
          </Field>
          <Field label="Level">{character.level}</Field>
          <Field label="Species">{character.species}</Field>
          <Field label="Background">{character.background}</Field>
          {character.alignment && (
            <Field label="Alignment">{character.alignment}</Field>
          )}
          <Field label="XP">
            {character.experiencePoints.toLocaleString()}
          </Field>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-widest text-red-200 font-semibold">
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{children}</span>
    </div>
  )
}
