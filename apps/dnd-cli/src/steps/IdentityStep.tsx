import { Box, Text, useInput } from 'ink'
import { useState } from 'react'
import { DEFAULTS } from '../lib/defaults.js'

export interface IdentityValues {
  name: string
  characterClass: string
  subclass: string
  level: number
  species: string
  background: string
  experiencePoints: number
}

interface FieldDef {
  key: keyof IdentityValues
  label: string
  hint: string
  defaultValue: string
  required: boolean
  numeric: boolean
}

const FIELDS: FieldDef[] = [
  {
    key: 'name',
    label: 'Name',
    hint: '',
    defaultValue: '',
    required: true,
    numeric: false,
  },
  {
    key: 'characterClass',
    label: 'Class',
    hint: '',
    defaultValue: '',
    required: true,
    numeric: false,
  },
  {
    key: 'subclass',
    label: 'Subclass',
    hint: 'optional',
    defaultValue: '',
    required: false,
    numeric: false,
  },
  {
    key: 'level',
    label: 'Level',
    hint: `default: ${DEFAULTS.level}`,
    defaultValue: String(DEFAULTS.level),
    required: true,
    numeric: true,
  },
  {
    key: 'species',
    label: 'Species',
    hint: '',
    defaultValue: '',
    required: true,
    numeric: false,
  },
  {
    key: 'background',
    label: 'Background',
    hint: '',
    defaultValue: '',
    required: true,
    numeric: false,
  },
  {
    key: 'experiencePoints',
    label: 'Experience Points',
    hint: `default: ${DEFAULTS.experiencePoints}`,
    defaultValue: String(DEFAULTS.experiencePoints),
    required: true,
    numeric: true,
  },
]

const LABEL_WIDTH = 24

export function IdentityStep({
  onComplete,
}: {
  onComplete: (values: IdentityValues) => void
}) {
  const [fieldIndex, setFieldIndex] = useState(0)
  const [collected, setCollected] = useState<Partial<IdentityValues>>({})
  const [buffer, setBuffer] = useState(FIELDS[0].defaultValue)
  const [error, setError] = useState('')

  const current = FIELDS[fieldIndex]

  useInput((input, key) => {
    if (key.return) {
      const raw = buffer.trim() !== '' ? buffer.trim() : current.defaultValue
      if (current.required && !raw) {
        setError('Required')
        return
      }
      const value = current.numeric ? parseInt(raw || '0', 10) : raw
      const next = { ...collected, [current.key]: value }

      if (fieldIndex < FIELDS.length - 1) {
        setCollected(next)
        setBuffer(FIELDS[fieldIndex + 1].defaultValue)
        setFieldIndex((i) => i + 1)
        setError('')
      } else {
        onComplete(next as IdentityValues)
      }
    } else if (key.backspace || key.delete) {
      setBuffer((b) => b.slice(0, -1))
      setError('')
    } else if (input && !key.ctrl && !key.meta) {
      setBuffer((b) => b + input)
      setError('')
    }
  })

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        ── Step 1: Identity ──────────────────────────────
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {FIELDS.slice(0, fieldIndex).map((field) => (
          <Box key={String(field.key)}>
            <Text dimColor>{`  ${field.label.padEnd(LABEL_WIDTH)}`}</Text>
            <Text dimColor>{String(collected[field.key] ?? '')}</Text>
          </Box>
        ))}
        <Box>
          <Text>{`  ${current.label.padEnd(LABEL_WIDTH)}`}</Text>
          <Text color="white">{buffer}</Text>
          <Text color="cyan">▌</Text>
          {current.hint ? <Text dimColor> ({current.hint})</Text> : null}
        </Box>
      </Box>
      {error ? (
        <Text color="red"> {error}</Text>
      ) : (
        <Text dimColor> Enter to confirm</Text>
      )}
    </Box>
  )
}
