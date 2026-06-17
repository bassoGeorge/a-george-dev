import { Ability } from '@ageorgedev/dnd-character-sheet/models';
import { Box, Text, useInput } from 'ink';
import { useState } from 'react';
import { DEFAULTS } from '../lib/defaults.js';
import type { AbilityValues } from '../types.js';

const FIELDS: Array<{ key: Ability; label: string }> = [
  { key: Ability.Strength, label: 'Strength     (STR)' },
  { key: Ability.Dexterity, label: 'Dexterity    (DEX)' },
  { key: Ability.Constitution, label: 'Constitution (CON)' },
  { key: Ability.Intelligence, label: 'Intelligence (INT)' },
  { key: Ability.Wisdom, label: 'Wisdom       (WIS)' },
  { key: Ability.Charisma, label: 'Charisma     (CHA)' },
];

const LABEL_WIDTH = 22;

export function AbilitiesStep({
  onComplete,
}: {
  onComplete: (values: AbilityValues) => void;
}) {
  const [fieldIndex, setFieldIndex] = useState(0);
  const [collected, setCollected] = useState<Partial<AbilityValues>>({});
  const [buffer, setBuffer] = useState(String(DEFAULTS.abilityScore));

  const current = FIELDS[fieldIndex];

  useInput((input, key) => {
    if (key.return) {
      const raw = buffer.trim();
      const value = Math.max(
        1,
        Math.min(
          30,
          parseInt(raw || String(DEFAULTS.abilityScore), 10) ||
            DEFAULTS.abilityScore
        )
      );
      const next = { ...collected, [current.key]: value };

      if (fieldIndex < FIELDS.length - 1) {
        setCollected(next);
        setBuffer(String(DEFAULTS.abilityScore));
        setFieldIndex((i) => i + 1);
      } else {
        onComplete(next as AbilityValues);
      }
    } else if (key.backspace || key.delete) {
      setBuffer((b) => b.slice(0, -1));
    } else if (input && !key.ctrl && !key.meta && /[0-9]/.test(input)) {
      setBuffer((b) => (b.length < 2 ? b + input : b));
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        ── Step 2: Ability Scores ────────────────────────
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {FIELDS.slice(0, fieldIndex).map((field) => (
          <Box key={field.key}>
            <Text dimColor>{`  ${field.label.padEnd(LABEL_WIDTH)}`}</Text>
            <Text dimColor>
              {String(collected[field.key] ?? DEFAULTS.abilityScore)}
            </Text>
          </Box>
        ))}
        <Box>
          <Text>{`  ${current.label.padEnd(LABEL_WIDTH)}`}</Text>
          <Text color="white">{buffer}</Text>
          <Text color="cyan">▌</Text>
        </Box>
      </Box>
      <Text dimColor>
        {' '}
        Enter to confirm (default: {DEFAULTS.abilityScore}, range 1–30)
      </Text>
    </Box>
  );
}
