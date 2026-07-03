## 1. Extract `HeaderBreadcrumbs`

- [x] 1.1 Create `apps/game-tools/src/components/HeaderBreadcrumbs.tsx` that calls `useMatches()`, contains the `deriveCrumbs` helper (moved verbatim, kept private to the file), and renders the same `Breadcrumb`/`BreadcrumbList`/`BreadcrumbItem`/`BreadcrumbLink`/`BreadcrumbPage`/`BreadcrumbSeparator` JSX currently in `_public.tsx`. Return `null` when `crumbs.length === 0`.
- [x] 1.2 Preserve the existing `key` scheme (`crumb.to ?? \`page:${crumb.label}\``) and the `<Link to={crumb.to}>` wiring via `BreadcrumbLink asChild`.

## 2. Extract `DndHeaderActions`

- [x] 2.1 Create `apps/game-tools/src/components/DndHeaderActions.tsx` that calls `useMatches()` and internally computes both `spellBookUrl` (first non-empty `match.staticData?.spellBookUrl`) and `isCharacterSheet` (some `match.routeId.includes('_sheet')`).
- [x] 2.2 Render the spellbook `<a>` (with `href`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Download spellbook PDF"`, `title="Download spellbook PDF"`, and the `BookOpenIcon size={30}` child) only when `spellBookUrl` is truthy — matching the current markup exactly.
- [x] 2.3 Render the print `<button type="button" onClick={() => window.print()}>` (with `aria-label="Print character sheet"` and the `PrinterIcon size={30}` child) only when `isCharacterSheet` is true — matching the current markup exactly.
- [x] 2.4 Return `null` (or an empty fragment) when neither control should render, so the component contributes no DOM on non-DnD routes.

## 3. Simplify `_public.tsx`

- [x] 3.1 Remove `deriveCrumbs`, the `Crumb`/`Matches` types, the `useMatches()` call, the `isCharacterSheet`/`spellBookUrl` locals, and the inline breadcrumb + action JSX.
- [x] 3.2 In the header, replace the inline breadcrumb block with `<HeaderBreadcrumbs />` inside the existing `flex items-baseline gap-4 flex-1` container (next to the `Game Tools` brand link).
- [x] 3.3 Replace both conditional action blocks with a single unconditional `<DndHeaderActions />` mounted between the brand/breadcrumb container and `<ThemeSwitcher />`, preserving the header's `flex items-center justify-between gap-4` layout and the `print:hidden` class on `<header>`.
- [x] 3.4 Trim now-unused imports (`useMatches`, `Fragment`, `BookOpenIcon`, `PrinterIcon`, and the breadcrumb primitives). Leave `Link`, `Outlet`, `createFileRoute`, and `ThemeSwitcher`.

## 4. Verify no regressions

- [x] 4.1 Run `yarn format-and-lint:fix` at the repo root. _(Clean — no fixes applied.)_
- [x] 4.2 Run `yarn turbo build --filter=@ageorgedev/game-tools` and confirm it succeeds. _(Passes with no route-tree warnings after the `-` rename; prerender of all 8 pages succeeds.)_
- [x] 4.3 Inspect `apps/game-tools/src/routeTree.gen.ts` and confirm no new route entries were introduced by the new sibling files. _(`grep` for `HeaderBreadcrumbs`/`DndHeaderActions` in `routeTree.gen.ts` returns no matches.)_
- [ ] 4.4 Start the game-tools dev server (`yarn turbo dev --filter=@ageorgedev/game-tools`) and manually verify: `/` shows no breadcrumb and no DnD icons; `/dnd/characters` shows the single `DnD Characters` current-page crumb and no DnD icons; a character sheet route shows the two-crumb trail, the print button, and (when the route defines `staticData.spellBookUrl`) the spellbook download icon. _(Requires the human to drive a browser — not run in this session.)_
- [ ] 4.5 Confirm the header still disappears under browser print preview on a character sheet route. _(Same — requires interactive browser verification.)_
