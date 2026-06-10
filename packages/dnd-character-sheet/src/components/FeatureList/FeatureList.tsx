import { useCharacter } from '../CharacterSheet'
import styles from './FeatureList.module.css'

export function FeatureList() {
  const { character } = useCharacter()

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-sheet-border overflow-hidden`}
    >
      <h2 className="bg-sheet-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Features &amp; Traits
      </h2>
      <div className="p-3 flex flex-col gap-3">
        {character.features.map((feature, i) => (
          <div
            key={i}
            className="border-b border-sheet-border/50 pb-2 last:border-0 last:pb-0"
          >
            <div className="flex items-baseline justify-between gap-2 mb-0.5">
              <span className="text-sm font-bold text-sheet-dark">
                {feature.name}
              </span>
              <span className="text-xs text-gray-400 italic flex-shrink-0">
                {feature.source}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
