import {
  BookOpenTextIcon,
  DownloadSimpleIcon,
  type Icon,
  MagicWandIcon,
  PrinterIcon,
} from '@phosphor-icons/react';
import { useMatch } from '@tanstack/react-router';
import type { CharacterAsset } from '../data/dnd-characters';

const ASSET_DEFAULTS: Record<string, { label: string; icon: Icon }> = {
  spellbook: { label: 'Spellbook', icon: BookOpenTextIcon },
  magicItems: { label: 'Magic Items', icon: MagicWandIcon },
};

export function DndHeaderActions() {
  const characterSheetRouteMatch = useMatch({
    from: '/_public/dnd/characters/$slug/{-$level}',
    shouldThrow: false,
  });

  if (!characterSheetRouteMatch) {
    return null;
  }

  const assets = characterSheetRouteMatch.context.assets;
  return (
    <>
      {assets?.map((asset: CharacterAsset) => {
        const defaults = ASSET_DEFAULTS[asset.id];
        const label = asset.label ?? defaults?.label;
        const AssetIcon = defaults?.icon ?? DownloadSimpleIcon;
        return (
          <a
            key={asset.id}
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-subdued hover:text-primary-foreground transition-colors inline-flex gap-1 items-center"
            aria-label={`Download ${label} PDF`}
            title={`Download ${label} PDF`}
          >
            <AssetIcon size={30} />
            <span>Download {label}</span>
          </a>
        );
      })}
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
