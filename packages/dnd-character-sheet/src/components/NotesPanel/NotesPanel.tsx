import { HandWrittenNotes } from '../HandwrittenNotes/HandwrittenNotes';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function NotesPanel(props: PanelProps) {
  return (
    <Panel {...props}>
      <PanelTitle withDivider>Notes</PanelTitle>
      <HandWrittenNotes lineCount={10} className="flex-1" />
    </Panel>
  );
}
