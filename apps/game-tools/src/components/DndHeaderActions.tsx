import { BookOpenTextIcon, PrinterIcon } from '@phosphor-icons/react';
import { useMatch } from '@tanstack/react-router';

export function DndHeaderActions() {
  const characterSheetRouteMatch = useMatch({
    from: '/_public/dnd/characters/$slug/{-$level}',
    shouldThrow: false,
  });

  if (!characterSheetRouteMatch) {
    return null;
  }

  const spellBookUrl = characterSheetRouteMatch?.context.spellBook;
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
      <button
        type="button"
        onClick={() => window.print()}
        className="text-xs text-neutral-subdued hover:text-primary-foreground transition-colors inline-flex gap-1 items-center"
        aria-label="Print character sheet"
      >
        <PrinterIcon size={30} />
        <span>Print Character Sheet</span>
      </button>
    </>
  );
}
