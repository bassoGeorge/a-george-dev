import {
  ABILITY_DETAILS,
  ALL_ABILITIES,
  Skill,
} from '@ageorgedev/dnd-character-sheet/models';
import { Box, Text, useInput } from 'ink';
import { useState } from 'react';

const SAVING_THROW_LABELS = Object.fromEntries(
  ALL_ABILITIES.map((ability) => [ability, ABILITY_DETAILS[ability].label])
);

const AllSkills = Object.keys(Skill);

export interface ProficiencyValues {
  savingThrowProficiencies: string[];
  skillProficiencies: string[];
}

export function ProficienciesStep({
  onComplete,
}: {
  onComplete: (values: ProficiencyValues) => void;
}) {
  const [phase, setPhase] = useState<'saving-throws' | 'skills'>(
    'saving-throws'
  );
  const [cursor, setCursor] = useState(0);
  const [selectedST, setSelectedST] = useState<Set<string>>(new Set());
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const isST = phase === 'saving-throws';
  const list = isST ? ALL_ABILITIES : AllSkills;
  const labels = (isST ? SAVING_THROW_LABELS : Skill) as Record<string, string>;
  const selected = isST ? selectedST : selectedSkills;
  const setSelected = isST
    ? (fn: (s: Set<string>) => Set<string>) => setSelectedST(fn)
    : (fn: (s: Set<string>) => Set<string>) => setSelectedSkills(fn);

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1));
    } else if (key.downArrow) {
      setCursor((c) => Math.min(list.length - 1, c + 1));
    } else if (input === ' ') {
      const item = list[cursor];
      setSelected((s) => {
        const next = new Set(s);
        if (next.has(item)) next.delete(item);
        else next.add(item);
        return next;
      });
    } else if (key.return) {
      if (phase === 'saving-throws') {
        setPhase('skills');
        setCursor(0);
      } else {
        onComplete({
          savingThrowProficiencies: Array.from(selectedST),
          skillProficiencies: Array.from(selectedSkills),
        });
      }
    }
  });

  const title = isST
    ? '── Step 4a: Saving Throw Proficiencies ──────────'
    : '── Step 4b: Skill Proficiencies ─────────────────';

  const count = selected.size;
  const countLabel = count > 0 ? ` (${count} selected)` : ' (none selected)';

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        {title}
      </Text>
      <Box flexDirection="column" marginTop={1}>
        {list.map((item, i) => {
          const isCursor = i === cursor;
          const isSelected = selected.has(item);
          return (
            <Box key={item}>
              <Text color={isCursor ? 'cyan' : 'gray'}>
                {isCursor ? '  ▶ ' : '    '}
              </Text>
              <Text color={isCursor ? 'cyan' : 'gray'}>
                {isSelected ? '[x] ' : '[ ] '}
              </Text>
              <Text color={isCursor ? 'white' : 'gray'}>{labels[item]}</Text>
            </Box>
          );
        })}
      </Box>
      <Box marginTop={1}>
        <Text dimColor> ↑↓ navigate Space toggle Enter confirm</Text>
        <Text dimColor color="gray">
          {countLabel}
        </Text>
      </Box>
    </Box>
  );
}
