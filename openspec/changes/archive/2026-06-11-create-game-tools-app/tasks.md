## 1. Scaffold app/game-tools package

- [x] 1.1 Create `apps/game-tools/` directory with `package.json` — name `@ageorgedev/game-tools`, same dependency versions as `apps/ageorgedev` for `@tanstack/react-router`, `@tanstack/react-start`, `react`, `react-dom`, `@ageorgedev/design-system`, `@ageorgedev/foundation-styles`, `@ageorgedev/dnd-character-sheet`, `@ageorgedev/toolbelt`
- [x] 1.2 Add `tsconfig.json` extending `@ageorgedev/ts-config/react.json`, mirroring `apps/ageorgedev`
- [x] 1.3 Add `vite.config.ts` with `tanstackStart` (prerender enabled), `tailwindcss`, and `react` plugins; set `server.port` to 3001; set `cacheDir` to `../../node_modules/.vite/game-tools`
- [x] 1.4 Run `yarn install` from repo root to link the new workspace package

## 2. Wire up app entry points

- [x] 2.1 Create `src/styles.css` — import `@ageorgedev/foundation-styles/tailwind.css`, add `@source` for `../`, `../../../packages/design-system/src`, and `../../../packages/dnd-character-sheet/src`
- [x] 2.2 Create `src/components/GlobalProviders.tsx` — wraps children in `ThemeProvider` from `@ageorgedev/design-system`
- [x] 2.3 Create `src/router.tsx` — `createTanStackRouter` with `routeTree`, `scrollRestoration: true`, `defaultPreload: 'intent'`
- [x] 2.4 Create `src/routes/__root.tsx` — `createRootRouteWithContext`, inject `THEME_INIT_SCRIPT`, `GlobalProviders`, `HeadContent`, `Scripts`, link `styles.css`; set page title to `Game Tools`

## 3. Add the character sheet route

- [x] 3.1 Create `src/routes/_noLayout/` directory
- [x] 3.2 Create `src/routes/_noLayout/dnd/characters/example.tsx` — renders `<ExampleSheet />` from `@ageorgedev/dnd-character-sheet` with no surrounding layout

## 4. Clean up apps/ageorgedev

- [x] 4.1 Delete `apps/ageorgedev/src/routes/_noLayout/char-test.tsx`
- [x] 4.2 Remove `@ageorgedev/dnd-character-sheet` from `apps/ageorgedev/package.json` dependencies
- [x] 4.3 Remove `@source "../../../packages/dnd-character-sheet/src"` line from `apps/ageorgedev/src/styles.css`
- [x] 4.4 Run `yarn install` from repo root to update lockfile

## 5. Verify

- [ ] 5.1 Start `apps/game-tools` dev server (`yarn dev` inside `apps/game-tools`) and confirm it serves on port 3001
- [ ] 5.2 Navigate to `http://localhost:3001/dnd/characters/example` and confirm `ExampleSheet` renders correctly
- [x] 5.3 Run `yarn build` inside `apps/game-tools` and confirm it completes without errors
- [ ] 5.4 Start `apps/ageorgedev` dev server and confirm no broken routes or missing styles
- [x] 5.5 Run `yarn format-and-lint` from repo root and fix any issues
