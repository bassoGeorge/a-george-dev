import { HandWrittenNotes } from '../HandwrittenNotes/HandwrittenNotes';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { useVisualAdjustments } from '../VisualAdjustmentsContext';

export function NotesPanel(props: PanelProps) {
  const { notesRows } = useVisualAdjustments();
  return (
    <Panel {...props}>
      <PanelTitle withDivider>Notes</PanelTitle>
      <HandWrittenNotes lineCount={notesRows} className="flex-1" />
    </Panel>
  );
}
