import { ExampleSheet } from '@ageorgedev/dnd-character-sheet';
import { createRoot } from 'react-dom/client';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing preview root');

createRoot(root).render(<ExampleSheet />);
