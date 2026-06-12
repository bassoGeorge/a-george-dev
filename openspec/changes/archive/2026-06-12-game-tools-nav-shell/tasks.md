## 1. Layout Route

- [x] 1.1 Create `apps/game-tools/src/routes/_public.tsx` with a header containing a home link, a DnD Characters nav link, and `ThemeSwitcher`; header has `print:hidden`; renders `<Outlet />`
- [x] 1.2 Move home page from `apps/game-tools/src/routes/index.tsx` to `apps/game-tools/src/routes/_public/index.tsx`

## 2. Home Page

- [x] 2.1 Update `_public/index.tsx` to render a DnD Characters section card linking to `/dnd/characters`

## 3. Character Routes

- [x] 3.1 Move `apps/game-tools/src/routes/_noLayout/dnd/characters/example.tsx` to `apps/game-tools/src/routes/_public/dnd/characters/example.tsx`
- [x] 3.2 Create shell route at `apps/game-tools/src/routes/_public/dnd/characters/index.tsx` (placeholder content)
- [x] 3.3 Delete the now-empty `_noLayout` directory if no other routes remain there

## 4. Verify

- [x] 4.1 Run `yarn dev` for game-tools and confirm home page, nav, and `/dnd/characters/example` all render correctly
- [x] 4.2 Confirm `routeTree.gen.ts` is regenerated without errors
- [x] 4.3 Run `yarn format-and-lint` and fix any issues
