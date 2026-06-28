import { ArmorBlock } from './ArmorBlock';
import { HealthAndDeathBlock } from './HealthAndDeathBlock';
import { LevelBlock } from './LevelBlock';
import { NameBlock } from './NameBlock';

export function SheetHeader() {
  return (
    <div className="flex gap-2">
      <NameBlock />
      <LevelBlock />
      <ArmorBlock />
      <HealthAndDeathBlock />
    </div>
  );
}
