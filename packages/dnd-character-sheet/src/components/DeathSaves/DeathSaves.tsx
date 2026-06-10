import { useState } from 'react'
import styles from './DeathSaves.module.css'

export function DeathSaves() {
  const [successes, setSuccesses] = useState([false, false, false])
  const [failures, setFailures] = useState([false, false, false])

  function toggle(
    arr: boolean[],
    index: number,
    setter: React.Dispatch<React.SetStateAction<boolean[]>>
  ) {
    setter(arr.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <div
      className={`${styles.panel} bg-white rounded-lg shadow-md border border-sheet-border overflow-hidden`}
    >
      <h2 className="bg-sheet-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 text-center">
        Death Saves
      </h2>
      <div className="p-3 flex flex-col gap-2">
        <Row
          label="Successes"
          checks={successes}
          color="bg-green-500 border-green-600"
          onToggle={(i) => toggle(successes, i, setSuccesses)}
        />
        <Row
          label="Failures"
          checks={failures}
          color="bg-sheet-red border-red-800"
          onToggle={(i) => toggle(failures, i, setFailures)}
        />
      </div>
    </div>
  )
}

function Row({
  label,
  checks,
  color,
  onToggle,
}: {
  label: string
  checks: boolean[]
  color: string
  onToggle: (i: number) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <div className="flex gap-1.5">
        {checks.map((checked, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className={`w-5 h-5 rounded-full border-2 transition-colors ${
              checked ? color : 'bg-white border-gray-300'
            }`}
            aria-label={`${label} ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
