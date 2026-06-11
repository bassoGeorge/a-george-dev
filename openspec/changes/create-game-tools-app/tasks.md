## 1. Scaffold app/game-tools package

- [ ] 1.1 Create `apps/game-tools/` directory with `package.json` — name `@ageorgedev/game-tools`, same dependency versions as `apps/ageorgedev` for `@tanstack/react-router`, `@tanstack/react-start`, `react`, `react-dom`, `@ageorgedev/design-system`, `@ageorgedev/foundation-styles`, `@ageorgedev/dnd-character-sheet`, `@ageorgedev/toolbelt`
- [ ] 1.2 Add `tsconfig.json` extending `@ageorgedev/ts-config/react.json`, mirroring `apps/ageorgedev`
- [ ] 1.3 Add `vite.config.ts` with `tanstackStart` (prerender enabled), `tailwindcss`, and `react` plugins; set `server.port` to 3001; set `cacheDir` to `../../node_modules/.vite/game-tools`
- [ ] 1.4 Run `yarn install` from repo root to link the new workspace package

## 2. Wire up app entry points

- [ ] 2.1 Create `src/styles.css` — import `@ageorgedev/foundation-styles/tailwind.css`, add `@source` for `../`, `../../../packages/design-system/src`, and `../../../packages/dnd-character-sheet/src`
- [ ] 2.2 Create `src/components/GlobalProviders.tsx` — wraps children in `ThemeProvider` from `@ageorgedev/design-system`
- [ ] 2.3 Create `src/router.tsx` — `createTanStackRouter` with `routeTree`, `scrollRestoration: true`, `defaultPreload: 'intent'`
- [ ] 2.4 Create `src/routes/__root.tsx` — `createRootRouteWithContext`, inject `THEME_INIT_SCRIPT`, `GlobalProviders`, `HeadContent`, `Scripts`, link `styles.css`; set page title to `Game Tools`

## 3. Add the character sheet route

- [ ] 3.1 Create `src/routes/_noLayout/` directory
- [ ] 3.2 Create `src/routes/_noLayout/dnd/characters/example.tsx` — renders `<ExampleSheet />` from `@ageorgedev/dnd-character-sheet` with no surrounding layout

## 4. Clean up apps/ageorgedev

- [ ] 4.1 Delete `apps/ageorgedev/src/routes/_noLayout/char-test.tsx`
- [ ] 4.2 Remove `@ageorgedev/dnd-character-sheet` from `apps/ageorgedev/package.json` dependencies
- [ ] 4.3 Remove `@source "../../../packages/dnd-character-sheet/src"` line from `apps/ageorgedev/src/styles.css`
- [ ] 4.4 Run `yarn install` from repo root to update lockfile

## 5. Verify

- [ ] 5.1 Start `apps/game-tools` dev server (`yarn dev` inside `apps/game-tools`) and confirm it serves on port 3001
- [ ] 5.2 Navigate to `http://localhost:3001/dnd/characters/example` and confirm `ExampleSheet` renders correctly
- [ ] 5.3 Run `yarn build` inside `apps/game-tools` and confirm it completes without errors
- [ ] 5.4 Start `apps/ageorgedev` dev server and confirm no broken routes or missing styles
- [ ] 5.5 Run `yarn format-and-lint` from repo root and fix any issues
