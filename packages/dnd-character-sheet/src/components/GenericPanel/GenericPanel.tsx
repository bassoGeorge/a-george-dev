import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';
import { RichTextDisplay } from '../RichTextDisplay/RichTextDisplay';

export type GenericPanelProps = {
  heading: string;
  htmlContent: string;
} & PanelProps;

export function GenericPanel({
  heading,
  htmlContent,
  ...props
}: GenericPanelProps) {
  return (
    <Panel {...props}>
      <PanelTitle withDivider>{heading}</PanelTitle>
      <RichTextDisplay content={htmlContent} className="text-sm" />
    </Panel>
  );
}
