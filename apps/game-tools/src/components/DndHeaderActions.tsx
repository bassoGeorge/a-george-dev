import { BookOpenTextIcon, PrinterIcon } from '@phosphor-icons/react';
import { useMatches } from '@tanstack/react-router';

export function DndHeaderActions() {
  const matches = useMatches();
  const spellBookUrl = matches
    .map((m) => m.staticData?.spellBookUrl)
    .find(Boolean);
  const isCharacterSheet = matches.some((m) => m.routeId.includes('_sheet'));

  if (!spellBookUrl && !isCharacterSheet) {
    return null;
  }

  return (
    <>
      {spellBookUrl && (
        <a
          href={spellBookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-subdued hover:text-primary-foreground transition-colors inline-flex gap-1 items-center"
          aria-label="Download spellbook PDF"
          title="Download spellbook PDF"
        >
          <BookOpenTextIcon size={30} />
          <span>Download Spellbook</span>
        </a>
      )}
      {isCharacterSheet && (
        <button
          type="button"
          onClick={() => window.print()}
          className="text-xs text-neutral-subdued hover:text-primary-foreground transition-colors inline-flex gap-1 items-center"
          aria-label="Print character sheet"
        >
          <PrinterIcon size={30} />
          <span>Print Character Sheet</span>
        </button>
      )}
    </>
  );
}
