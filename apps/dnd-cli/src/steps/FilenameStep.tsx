import { Box, Text, useInput } from 'ink';
import { useState } from 'react';

export interface FilenameValues {
  filename: string;
}

export function FilenameStep({
  defaultFilename,
  onComplete,
}: {
  defaultFilename: string;
  onComplete: (values: FilenameValues) => void;
}) {
  const [buffer, setBuffer] = useState(defaultFilename);
  const [error, setError] = useState('');

  useInput((input, key) => {
    if (key.return) {
      const filename = buffer.trim() || defaultFilename;
      if (!filename) {
        setError('Filename is required');
        return;
      }
      onComplete({ filename });
    } else if (key.backspace || key.delete) {
      setBuffer((b) => b.slice(0, -1));
      setError('');
    } else if (input && !key.ctrl && !key.meta) {
      setBuffer((b) => b + input);
      setError('');
    }
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        ── Step 5: Output Filename ───────────────────────
      </Text>
      <Box marginTop={1} flexDirection="column">
        <Text dimColor>
          {' '}
          Output directory: packages/dnd-character-sheet/src/characters/
        </Text>
        <Box marginTop={1}>
          <Text>{'  Filename  '}</Text>
          <Text color="white">{buffer}</Text>
          <Text color="cyan">▌</Text>
        </Box>
      </Box>
      {error ? (
        <Text color="red"> {error}</Text>
      ) : (
        <Text dimColor> Enter to write the file</Text>
      )}
    </Box>
  );
}
