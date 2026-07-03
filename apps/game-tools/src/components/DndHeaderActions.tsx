import { BookOpenIcon, PrinterIcon } from '@phosphor-icons/react';
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
          className="hover:text-primary-foreground transition-colors"
          aria-label="Download spellbook PDF"
          title="Download spellbook PDF"
        >
          <BookOpenIcon size={30} />
        </a>
      )}
      {isCharacterSheet && (
        <button
          type="button"
          onClick={() => window.print()}
          className="hover:text-primary-foreground transition-colors"
          aria-label="Print character sheet"
        >
          <PrinterIcon size={30} />
        </button>
      )}
    </>
  );
}
