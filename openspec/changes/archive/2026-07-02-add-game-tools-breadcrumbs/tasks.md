## 1. Wire breadcrumbs into the header

- [x] 1.1 In `apps/game-tools/src/routes/_public.tsx`, import `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator` from `@ageorgedev/design-system/ui/breadcrumb`
- [x] 1.2 Add a `useMatches()` (or extend the existing `useChildMatches()`) call to obtain the active router match tree
- [x] 1.3 Implement a `deriveCrumbs(matches)` helper (local to the file) that returns `Array<{ label: string; to?: string }>`. Skip the home match. Map `_public/dnd/characters/` → `{ label: 'DnD Characters', to: '/dnd/characters' }`. Map `_public/dnd/characters/_sheet/$name` → `{ label: match.staticData?.character?.name ?? humanise(params.name), to: match.pathname }`. The last item MUST be returned without `to` (rendered as `BreadcrumbPage`)
- [x] 1.4 Render `<Breadcrumb>` inside the header, to the right of the "Game Tools" wordmark, only when the derived list is non-empty. Interleave `<BreadcrumbSeparator />` between items. Non-leaf items use `<BreadcrumbLink asChild><Link to={to}>{label}</Link></BreadcrumbLink>`; leaf uses `<BreadcrumbPage>{label}</BreadcrumbPage>`

## 2. Verify

- [ ] 2.1 Run `yarn turbo dev --filter=@ageorgedev/game-tools`, load `/`, `/dnd/characters`, and a character sheet route, and confirm breadcrumbs render as specified in `specs/game-tools-nav-shell/spec.md`
- [ ] 2.2 Trigger print preview on a character sheet route and confirm no breadcrumbs appear (header, and therefore breadcrumbs, are `print:hidden`)
- [x] 2.3 Run `yarn format-and-lint:fix` at the repo root
- [x] 2.4 Run `yarn turbo build --filter=@ageorgedev/game-tools` to confirm the app still type-checks and builds
