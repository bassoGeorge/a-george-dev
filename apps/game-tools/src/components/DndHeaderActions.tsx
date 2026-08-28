import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ageorgedev/design-system/ui/dropdown-menu';
import {
  BookOpenTextIcon,
  DownloadSimpleIcon,
  type Icon,
  MagicWandIcon,
  PrinterIcon,
  SlidersIcon,
} from '@phosphor-icons/react';
import { useMatch } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useUserPrefs } from '../context/UserPrefsContext';
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

  const { prefs, setPrefs } = useUserPrefs();
  const doNotCloseDropdown = useCallback((e: Event) => e.preventDefault(), []);

  if (!characterSheetRouteMatch) {
    return null;
  }

  const assets = characterSheetRouteMatch.context.assets;
  return (
    <div className="flex items-center gap-4 max-tablet:col-span-2 max-tablet:row-start-3 max-tablet:flex-wrap">
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
      <DropdownMenu>
        <DropdownMenuTrigger className="text-xs text-neutral-subdued hover:text-primary-foreground transition-colors inline-flex gap-1 items-center cursor-pointer">
          <SlidersIcon size={30} />
          <span>Customise</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Beginner help</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={prefs.showActionsInCombat}
            onCheckedChange={(checked) =>
              setPrefs({ showActionsInCombat: checked })
            }
            onSelect={doNotCloseDropdown}
          >
            Actions in Combat
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={prefs.showWeaponMasteries}
            onCheckedChange={(checked) =>
              setPrefs({ showWeaponMasteries: checked })
            }
            onSelect={doNotCloseDropdown}
          >
            Weapon Masteries
          </DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Other panels</DropdownMenuLabel>

          <DropdownMenuCheckboxItem
            checked={prefs.showNotes}
            onCheckedChange={(checked) => setPrefs({ showNotes: checked })}
            onSelect={doNotCloseDropdown}
          >
            Notes
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Temporarily hidden in mobile till we have a better approach for printing */}
      <button
        type="button"
        onClick={() => window.print()}
        className="text-xs text-neutral-subdued hover:text-primary-foreground transition-colors inline-flex gap-1 items-center max-tablet:hidden"
        aria-label="Print character sheet"
      >
        <PrinterIcon size={30} />
        <span>Print Character Sheet</span>
      </button>
    </div>
  );
}
