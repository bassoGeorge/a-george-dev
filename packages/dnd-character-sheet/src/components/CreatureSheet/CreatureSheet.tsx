import type { Creature } from '../../lib/models/creature';
import { CreatureStatBlock } from '../CreatureStatBlock/CreatureStatBlock';
import { Page } from '../layout/Page';

export function CreatureSheet({ creatures }: { creatures: Creature[] }) {
  if (!creatures.length) return null;

  return (
    <Page allowPrintOverflow className="py-6">
      <div className="grid grid-cols-2 items-start gap-4 max-tablet:grid-cols-1">
        {creatures.map((creature, index) => (
          <CreatureStatBlock
            // Creatures are static, ordered display data and do not have IDs.
            // biome-ignore lint/suspicious/noArrayIndexKey: the index distinguishes intentionally duplicated stat blocks
            key={index}
            creature={creature}
          />
        ))}
      </div>
    </Page>
  );
}
