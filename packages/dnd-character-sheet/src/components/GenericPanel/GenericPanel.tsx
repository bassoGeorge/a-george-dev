import { HorizontalDivider } from '../layout/dividers';
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
      <PanelTitle>{heading}</PanelTitle>
      <HorizontalDivider className="mt-1 mb-3" />
      <RichTextDisplay content={htmlContent} />
    </Panel>
  );
}
