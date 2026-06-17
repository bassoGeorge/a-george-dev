import { Box, Text, useInput } from 'ink';
import { useState } from 'react';
import { DEFAULTS } from '../lib/defaults.js';
import type { HitDiceType } from '../types.js';

export interface CombatValues {
  armorClass: number;
  speed: number;
  hitPointsMax: number;
  hitDiceType: HitDiceType;
}

const HIT_DICE: HitDiceType[] = ['d6', 'd8', 'd10', 'd12'];

type Phase = 'ac' | 'speed' | 'hp' | 'dice';

const PHASE_CONFIG: Record<
  Exclude<Phase, 'dice'>,
  { label: string; defaultValue: number; hint: string }
> = {
  ac: {
    label: 'Armor Class (AC)',
    defaultValue: DEFAULTS.armorClass,
    hint: `default: ${DEFAULTS.armorClass}`,
  },
  speed: {
    label: 'Speed (ft)',
    defaultValue: DEFAULTS.speed,
    hint: `default: ${DEFAULTS.speed}`,
  },
  hp: { label: 'Hit Points (max)', defaultValue: 0, hint: 'required' },
};

const LABEL_WIDTH = 24;

export function CombatStep({
  onComplete,
}: {
  onComplete: (values: CombatValues) => void;
}) {
  const [phase, setPhase] = useState<Phase>('ac');
  const [ac, setAc] = useState<number | undefined>();
  const [speed, setSpeed] = useState<number | undefined>();
  const [hp, setHp] = useState<number | undefined>();
  const [diceIndex, setDiceIndex] = useState(
    HIT_DICE.indexOf(DEFAULTS.hitDiceType)
  );
  const [buffer, setBuffer] = useState(String(DEFAULTS.armorClass));
  const [error, setError] = useState('');

  useInput((input, key) => {
    if (phase === 'dice') {
      if (key.leftArrow)
        setDiceIndex((i) => (i - 1 + HIT_DICE.length) % HIT_DICE.length);
      else if (key.rightArrow) setDiceIndex((i) => (i + 1) % HIT_DICE.length);
      else if (key.return) {
        onComplete({
          armorClass: ac ?? DEFAULTS.armorClass,
          speed: speed ?? DEFAULTS.speed,
          hitPointsMax: hp ?? 0,
          hitDiceType: HIT_DICE[diceIndex],
        });
      }
      return;
    }

    if (key.return) {
      const cfg = PHASE_CONFIG[phase];
      const raw = buffer.trim();
      if (phase === 'hp' && !raw) {
        setError('Required');
        return;
      }
      const value =
        parseInt(raw || String(cfg.defaultValue), 10) || cfg.defaultValue;
      setError('');

      if (phase === 'ac') {
        setAc(value);
        setBuffer(String(DEFAULTS.speed));
        setPhase('speed');
      } else if (phase === 'speed') {
        setSpeed(value);
        setBuffer('');
        setPhase('hp');
      } else if (phase === 'hp') {
        setHp(value);
        setPhase('dice');
      }
    } else if (key.backspace || key.delete) {
      setBuffer((b) => b.slice(0, -1));
      setError('');
    } else if (input && !key.ctrl && !key.meta && /[0-9]/.test(input)) {
      setBuffer((b) => b + input);
      setError('');
    }
  });

  const completedPhases: Array<{ label: string; value: string }> = [];
  if (ac !== undefined)
    completedPhases.push({ label: 'Armor Class (AC)', value: String(ac) });
  if (speed !== undefined)
    completedPhases.push({ label: 'Speed (ft)', value: String(speed) });
  if (hp !== undefined)
    completedPhases.push({ label: 'Hit Points (max)', value: String(hp) });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        ── Step 3: Combat ────────────────────────────────
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {completedPhases.map(({ label, value }) => (
          <Box key={label}>
            <Text dimColor>{`  ${label.padEnd(LABEL_WIDTH)}`}</Text>
            <Text dimColor>{value}</Text>
          </Box>
        ))}

        {phase !== 'dice' ? (
          <Box>
            <Text>{`  ${PHASE_CONFIG[phase].label.padEnd(LABEL_WIDTH)}`}</Text>
            <Text color="white">{buffer}</Text>
            <Text color="cyan">▌</Text>
          </Box>
        ) : (
          <Box>
            <Text>{'  Hit Dice Type'.padEnd(LABEL_WIDTH + 2)}</Text>
            <Text color="cyan">◀ </Text>
            <Text bold color="white">
              {HIT_DICE[diceIndex]}
            </Text>
            <Text color="cyan"> ▶</Text>
          </Box>
        )}
      </Box>

      {error ? (
        <Text color="red"> {error}</Text>
      ) : phase === 'dice' ? (
        <Text dimColor> ◀ ▶ to cycle Enter to confirm</Text>
      ) : (
        <Text dimColor> Enter to confirm ({PHASE_CONFIG[phase].hint})</Text>
      )}
    </Box>
  );
}
