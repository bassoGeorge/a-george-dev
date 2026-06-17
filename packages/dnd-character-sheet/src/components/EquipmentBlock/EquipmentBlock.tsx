import { useCharacter } from '../CharacterSheet';
import { Panel } from '../layout/Panel';
import { PanelTitle } from '../layout/PanelTitle';

const CURRENCY = [
  { key: 'pp', label: 'PP' },
  { key: 'gp', label: 'GP' },
  { key: 'ep', label: 'EP' },
  { key: 'sp', label: 'SP' },
  { key: 'cp', label: 'CP' },
] as const;

export function EquipmentBlock() {
  const { character } = useCharacter();

  return (
    <Panel className={`overflow-hidden`}>
      <PanelTitle className="px-3 py-1.5">Equipment</PanelTitle>

      <div className="p-3 border-b border-[var(--s-parchment-400)]">
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-subdued mb-1.5">
          Currency
        </p>
        <div className="flex gap-3">
          {CURRENCY.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center">
              <span className="text-sm font-bold text-neutral-strong">
                {character.currency[key]}
              </span>
              <span className="text-xs uppercase text-neutral-subdued">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="p-3 flex flex-col gap-0.5">
        {character.equipment.map((item) => (
          <li
            key={item}
            className="text-xs text-neutral-strong flex items-start gap-1.5"
          >
            <span className="text-[var(--s-parchment-400)] mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
