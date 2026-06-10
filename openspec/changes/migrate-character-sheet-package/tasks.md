## 1. Copy and rename the package

- [ ] 1.1 Copy `../dnd-tooling/packages/character-sheet/` to `packages/dnd-character-sheet/`
- [ ] 1.2 Delete build artifacts: remove `dist/` and `node_modules/` from the copied directory

## 2. Update package.json

- [ ] 2.1 Set `"name"` to `"@ageorgedev/dnd-character-sheet"`
- [ ] 2.2 Replace build scripts: set `"build"` to `"rm -rf ./dist && tsc && cpx \"src/**/*.css\" dist"`, remove `build:css` and `dev` scripts
- [ ] 2.3 Remove devDependencies: `@tailwindcss/vite`, `vite`, `vite-plugin-dts`, `postcss`, `autoprefixer`
- [ ] 2.4 Remove `dependencies`: `clsx`, `tailwind-merge` (now provided transitively via toolbelt)
- [ ] 2.5 Add `@ageorgedev/toolbelt` to `dependencies`
- [ ] 2.6 Add `@ageorgedev/ts-config` to `devDependencies`
- [ ] 2.7 Add `cpx` (or verify it is available at the workspace root) to `devDependencies`
- [ ] 2.8 Update `exports` to remove `./dist/style.css` entry (no longer bundling CSS)
- [ ] 2.9 Set `"main"` and `"module"` to `"./dist/index.js"` and `"types"` to `"./dist/index.d.ts"` (unchanged)

## 3. Update tsconfig.json

- [ ] 3.1 Replace contents of `tsconfig.json` with an `extends` of `@ageorgedev/ts-config/react.json`
- [ ] 3.2 Retain `"include": ["src"]` and remove any compiler options already covered by the base config
- [ ] 3.3 Remove `"paths": { "@/*": ["./src/*"] }` if no source files use that alias (verify first)

## 4. Remove Vite config and PostCSS config

- [ ] 4.1 Delete `vite.config.ts`
- [ ] 4.2 Delete `postcss.config.js`

## 5. Replace cn utility

- [ ] 5.1 Delete `src/lib/cn.ts`
- [ ] 5.2 Find all files importing from `./cn`, `../lib/cn`, or similar relative paths and replace with `import { cn } from '@ageorgedev/toolbelt'`

## 6. Update CSS: tokens and font references

- [ ] 6.1 Create `src/styles/tokens.css` containing only the `@theme` block with `sheet-*` color variables (extracted from `src/styles/index.css`)
- [ ] 6.2 Delete `src/styles/index.css` (the Google Fonts import, `@import "tailwindcss"`, and font `@theme` block are no longer needed — the consumer app owns these)
- [ ] 6.3 Find and replace all Tailwind font utility classes across `src/`: `font-serif` → `font-heading`, `font-sans` → `font-body`, `font-sc` → `font-interface`
- [ ] 6.4 Update `Panel.module.css` and `SubPanel.module.css`: replace any `@apply bg-gray-500` or similar utilities that use the old token names if needed; verify they compile correctly with the consumer app's Tailwind context

## 7. Update consumer app CSS

- [ ] 7.1 Add `@source "../../../packages/dnd-character-sheet/src"` to `apps/ageorgedev/src/styles.css`
- [ ] 7.2 Add `@import "@ageorgedev/dnd-character-sheet/dist/styles/tokens.css"` to `apps/ageorgedev/src/styles.css` (after `@import "tailwindcss"` so the `@theme` block is registered)

## 8. Install and verify build

- [ ] 8.1 Run `yarn install` from the repo root to register the new workspace package
- [ ] 8.2 Run `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` and confirm `dist/` contains `.js`, `.d.ts`, and `.css` files
- [ ] 8.3 Confirm no TypeScript errors: `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` exits 0
- [ ] 8.4 Run `yarn build` (full monorepo build) and confirm no downstream errors in `apps/ageorgedev`
