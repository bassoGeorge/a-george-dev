## 1. Update Dependencies

- [x] 1.1 Add `ejs` to `dependencies` in `packages/dnd-character-sheet/package.json`
- [x] 1.2 Add `@types/ejs` to `devDependencies` in `packages/dnd-character-sheet/package.json`
- [x] 1.3 Remove `mustache` from `dependencies` in `packages/dnd-character-sheet/package.json`
- [x] 1.4 Remove `@types/mustache` from `devDependencies` in `packages/dnd-character-sheet/package.json`
- [x] 1.5 Run `yarn` from repo root to install new dependencies and update lockfile

## 2. Swap Template Engine

- [x] 2.1 In `packages/dnd-character-sheet/src/lib/text-enrichment.ts`, replace `import Mustache from 'mustache'` with `import ejs from 'ejs'`
- [x] 2.2 Replace the `Mustache.render(description, dataValues)` call with `ejs.render(description, dataValues)`

## 3. Migrate Template Strings in Character Data

- [x] 3.1 In `apps/game-tools/src/routes/_public/dnd/characters/_sheet/zoynari.tsx`, update `{{level.Cleric}}` → `<%= level.Cleric %>` in the Radiance of Dawn description
- [x] 3.2 In `apps/game-tools/src/routes/_public/dnd/characters/_sheet/zoynari.tsx`, update `{{level.total * 10}}` → `<%= level.total * 10 %>` in the Mind Link species trait description
- [x] 3.3 In `apps/game-tools/src/routes/_public/dnd/characters/_sheet/omarin-kenate.tsx`, update `{{level.Fighter}}` → `<%= level.Fighter %>` in the Second Wind description
- [x] 3.4 In `apps/game-tools/src/routes/_public/dnd/characters/_sheet/omarin-kenate.tsx`, update `{{level.Monk}}` → `<%= level.Monk %>` in the Uncanny Metabolism description

## 4. Verify

- [ ] 4.1 Run `yarn turbo dev --filter=@ageorgedev/game-tools` and visually confirm Zoynari's Mind Link shows the correct telepathy range (e.g. "30ft" at level 3)
- [ ] 4.2 Confirm Radiance of Dawn, Second Wind, and Uncanny Metabolism descriptions render their level values correctly
- [x] 4.3 Run `yarn format-and-lint:fix` from the repo root and confirm no errors
