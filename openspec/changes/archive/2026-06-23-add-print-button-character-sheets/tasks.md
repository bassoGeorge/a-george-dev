## 1. Create pathless layout route

- [x] 1.1 Create `apps/game-tools/src/routes/_public/dnd/characters/_sheet.tsx` with a `createFileRoute('/_public/dnd/characters/_sheet')` route that renders `<Outlet />`
- [x] 1.2 Create the `_sheet/` subdirectory under `characters/`
- [x] 1.3 Move `example.tsx` into `characters/_sheet/example.tsx`
- [x] 1.4 Move `omarin-kenate.tsx` into `characters/_sheet/omarin-kenate.tsx`
- [x] 1.5 Start the dev server to confirm TanStack Router regenerates `routeTree.gen.ts` and both character URLs resolve correctly

## 2. Add Print button to shared header

- [x] 2.1 In `apps/game-tools/src/routes/_public.tsx`, import `useChildMatches` from `@tanstack/react-router`
- [x] 2.2 Call `useChildMatches()` in the `RouteComponent` and derive `isCharacterSheet` by checking if any match's `routeId` includes `_sheet`
- [x] 2.3 Render a `print:hidden` Print button in the header (between the nav and the `ThemeSwitcher`) that calls `window.print()` on click, conditionally shown when `isCharacterSheet` is true
- [x] 2.4 Verify the button appears on `/dnd/characters/example` and `/dnd/characters/omarin-kenate`, and does not appear on `/dnd/characters` or `/`

## 3. Verify print output

- [x] 3.1 Open a character sheet page, click Print, and confirm the print dialog opens
- [x] 3.2 Confirm the Print button does not appear in the print preview
- [x] 3.3 Confirm the character sheet renders correctly across 2 A4 pages in print preview
