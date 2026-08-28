import { ArmorBlock } from './ArmorBlock';
import { HealthAndDeathBlock } from './HealthAndDeathBlock';
import { LevelBlock } from './LevelBlock';
import { NameBlock } from './NameBlock';

export function SheetHeader() {
  return (
    <div className="flex gap-2 max-tablet-landscape:flex-wrap max-tablet-landscape:justify-around max-tablet:grid max-tablet:grid-cols-2">
      <NameBlock />
      <LevelBlock />
      <ArmorBlock />
      <HealthAndDeathBlock />
    </div>
  );
}
