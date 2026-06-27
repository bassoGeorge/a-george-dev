import { HandWrittenNotes } from '../HandwrittenNotes/HandwrittenNotes';
import { Panel, type PanelProps } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

export function CoinBlock(props: PanelProps) {
  return (
    <Panel {...props}>
      <PanelTitle withDivider>Coins & Treasure</PanelTitle>
      <div className="flex justify-between gap-3 align-bottom">
        <CoinSlot name="CP" />
        <CoinSlot name="SP" />
        <CoinSlot name="EP" />
        <CoinSlot name="GP" />
        <CoinSlot name="PP" />
      </div>
      <HandWrittenNotes className="mt-2" lineCount={5} />
    </Panel>
  );
}

function CoinSlot({ name }: { name: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <span className="text-neutral-disabled font-interface">{name}</span>
      <div className="border border-neutral-disabled p-2 rounded-bl-[1em] rounded-br-[1em] w-full h-[3em]"></div>
    </div>
  );
}
