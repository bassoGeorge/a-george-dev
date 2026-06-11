## 1. Copy and rename the package

- [x] 1.1 Copy `../dnd-tooling/packages/character-sheet/` to `packages/dnd-character-sheet/`
- [x] 1.2 Delete build artifacts: remove `dist/` and `node_modules/` from the copied directory

## 2. Update package.json

- [x] 2.1 Set `"name"` to `"@ageorgedev/dnd-character-sheet"`
- [x] 2.2 Replace build scripts: set `"build"` to `"rm -rf ./dist && tsc && cpx \"src/**/*.css\" dist"`, remove `build:css` and `dev` scripts
- [x] 2.3 Remove devDependencies: `@tailwindcss/vite`, `vite`, `vite-plugin-dts`, `postcss`, `autoprefixer`
- [x] 2.4 Remove `dependencies`: `clsx`, `tailwind-merge` (now provided transitively via toolbelt)
- [x] 2.5 Add `@ageorgedev/toolbelt` to `dependencies`
- [x] 2.6 Add `@ageorgedev/ts-config` to `devDependencies`
- [x] 2.7 Add `cpx` (or verify it is available at the workspace root) to `devDependencies`
- [x] 2.8 Update `exports` to remove `./dist/style.css` entry (no longer bundling CSS)
- [x] 2.9 Set `"main"` and `"module"` to `"./dist/index.js"` and `"types"` to `"./dist/index.d.ts"` (unchanged)

## 3. Update tsconfig.json

- [x] 3.1 Replace contents of `tsconfig.json` with an `extends` of `@ageorgedev/ts-config/react.json`
- [x] 3.2 Retain `"include": ["src"]` and remove any compiler options already covered by the base config
- [x] 3.3 Remove `"paths": { "@/*": ["./src/*"] }` if no source files use that alias (verify first)

## 4. Remove Vite config and PostCSS config

- [x] 4.1 Delete `vite.config.ts`
- [x] 4.2 Delete `postcss.config.js`

## 5. Replace cn utility

- [x] 5.1 Delete `src/lib/cn.ts`
- [x] 5.2 Find all files importing from `./cn`, `../lib/cn`, or similar relative paths and replace with `import { cn } from '@ageorgedev/toolbelt'`

## 6. Update CSS: tokens and font references

- [x] 6.1 Create `src/styles/tokens.css` containing only the `@theme` block with `sheet-*` color variables (extracted from `src/styles/index.css`)
- [x] 6.2 Delete `src/styles/index.css` (the Google Fonts import, `@import "tailwindcss"`, and font `@theme` block are no longer needed — the consumer app owns these)
- [x] 6.3 Find and replace all Tailwind font utility classes across `src/`: `font-serif` → `font-heading`, `font-sans` → `font-body`, `font-sc` → `font-interface`
- [x] 6.4 Update `Panel.module.css` and `SubPanel.module.css`: replace any `@apply bg-gray-500` or similar utilities that use the old token names if needed; verify they compile correctly with the consumer app's Tailwind context

## 7. Update consumer app CSS

- [x] 7.1 Add `@source "../../../packages/dnd-character-sheet/src"` to `apps/ageorgedev/src/styles.css`
- [x] 7.2 Add `@import "@ageorgedev/dnd-character-sheet/dist/styles/tokens.css"` to `apps/ageorgedev/src/styles.css` (after `@import "tailwindcss"` so the `@theme` block is registered)

## 8. Install and verify build

- [x] 8.1 Run `yarn install` from the repo root to register the new workspace package
- [x] 8.2 Run `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` and confirm `dist/` contains `.js`, `.d.ts`, and `.css` files
- [x] 8.3 Confirm no TypeScript errors: `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` exits 0
- [x] 8.4 Run `yarn build` (full monorepo build) and confirm no downstream errors in `apps/ageorgedev`
