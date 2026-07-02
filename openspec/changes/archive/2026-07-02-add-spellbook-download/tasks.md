## 1. Header wiring

- [x] 1.1 In `apps/game-tools/src/routes/_public.tsx`, derive `spellBookUrl` by scanning `matches` for the first `staticData.spellBookUrl` value (mirroring the existing `isCharacterSheet` / breadcrumb derivation pattern).
- [x] 1.2 Import a suitable Phosphor icon for the control alongside `PrinterIcon` (start with `BookOpenIcon`; swap to `DownloadSimpleIcon` if it reads better in-browser).

## 2. Render the download control

- [x] 2.1 Render an `<a>` element next to the existing Print button when `spellBookUrl` is truthy. Set `href={spellBookUrl}`, add the `download` attribute, and give it `aria-label="Download spellbook PDF"` plus a matching `title`.
- [x] 2.2 Apply the same visual treatment as the Print button (`hover:text-primary-foreground transition-colors`, icon `size={30}`) so the two controls sit consistently in the header.
- [x] 2.3 Ensure the anchor sits inside the existing `print:hidden` header container so it is automatically excluded from print output.

## 3. Verification

- [ ] 3.1 Start the game-tools dev server (`yarn turbo dev --filter=@ageorgedev/game-tools`) and confirm on `/dnd/characters/zoynari/2` that the button appears beside Print and downloads `zoynari-spellbook-2.pdf` when clicked.
- [ ] 3.2 Confirm the button is absent on `/`, `/dnd/characters`, and character-sheet routes without `spellBookUrl` (e.g., `omarin-kenate`, `claw`, `zoynari/3` — verify each one's staticData).
- [ ] 3.3 Confirm via browser print preview that the button does not appear in the printed output.
- [x] 3.4 Run `yarn format-and-lint:fix` from the repo root.
