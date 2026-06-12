## Context

The `@dnd-tooling/character-sheet` package is a mature React component library (30+ components, TypeScript, Tailwind v4) living in a separate repository. It is being relocated into this monorepo as `@ageorgedev/dnd-character-sheet` so it can be co-developed alongside the personal site's design system and eventually rendered within ageorge.dev.

The source package at `../dnd-tooling/packages/character-sheet/` uses Vite as its build tool, a self-contained `@theme` block in CSS, a local `cn` utility, and Google Fonts CDN for typography. None of these integrate naturally with the monorepo's conventions.

## Goals / Non-Goals

**Goals:**
- Register the package in the monorepo with correct naming, workspace linkage, and Turbo pipeline participation
- Align the build system with `tsc + cpx` convention used by all other packages
- Wire Tailwind so utilities compile correctly via the consumer app's existing `@source` scanning
- Reuse monorepo font loading (already in foundation-styles) and the shared `cn` utility
- Preserve the full public API of the original package (no component changes)

**Non-Goals:**
- Migrating the D&D-specific design tokens (`sheet-red`, `sheet-parchment`, etc.) to foundation-styles — deferred to a future design language migration
- Rendering the character sheet in the ageorge.dev app — that is a separate change
- Migrating the `app` or `character-cli` packages from dnd-tooling

## Decisions

### Build: tsc + cpx over Vite

**Decision:** Use `tsc` for compilation and `cpx "src/**/*.css" dist` for CSS, consistent with `design-system`, `toolbelt`, and other packages.

**Why:** Vite bundles and tree-shakes at build time; the monorepo's packages instead ship raw-compiled TypeScript and let the consumer app own bundling. The consumer app's Tailwind build already scans package `src/` directories via `@source` directives, so Tailwind compilation is also delegated upward. Keeping Vite would require maintaining a separate CSS compilation step, introduce a Vite config that no other package has, and produce a bundled `dist/index.js` that fights with the app's own bundler.

**Alternative considered:** Keep Vite. Rejected because it diverges from the monorepo convention without sufficient benefit now that CSS modules and Tailwind are handled by the app.

### CSS module handling

**Decision:** CSS module files (`.module.css`) are copied verbatim to `dist/` by `cpx`. The consumer app's build (Vite + `@tailwindcss/vite`) compiles them with Tailwind context when it processes imports.

**Detail:** The two CSS module files in the original package (`Panel.module.css`, `SubPanel.module.css`) use `@apply` with Tailwind utilities and CSS custom properties. These need to be compiled with Tailwind awareness, which the app-level build provides.

### Tailwind tokens: local @theme block

**Decision:** Keep `sheet-*` color tokens in `src/styles/tokens.css` as a `@theme` block. The consumer app imports this file directly (e.g., `@import "@ageorgedev/dnd-character-sheet/dist/styles/tokens.css"` from `apps/ageorgedev/src/styles.css`).

**Why:** These tokens are D&D-specific and have no relationship to the monorepo's foundation-styles color system. Putting them in foundation-styles would require every app importing foundation-styles to carry game-specific token names. The local file approach keeps the tokens co-located with the components that use them while still making them available to the Tailwind build via the app's CSS entry point.

**Future:** A subsequent change will map `sheet-*` tokens to semantic foundation-styles colors (e.g., `sheet-red` → a dark-mode-aware accent from the site's palette).

### Font tokens: reference foundation-styles names

**Decision:** Replace the original `@theme` font declarations (`--font-serif`, `--font-sans`, `--font-sc`) with the foundation-styles equivalents (`--font-heading`, `--font-body`, `--font-interface`). Remove the Google Fonts CDN `@import`.

**Mapping:**
| Original token | foundation-styles token | Font |
|---|---|---|
| `--font-serif` / `font-serif` | `--font-heading` / `font-heading` | Alegreya Variable |
| `--font-sans` / `font-sans` | `--font-body` / `font-body` | Alegreya Sans |
| `--font-sc` / `font-sc` | `--font-interface` / `font-interface` | Alegreya Sans SC |

**Why:** foundation-styles already loads these fonts via `@fontsource` npm packages (self-hosted, no CDN). The token names are already defined. Redefining them locally would create conflicts and redundancy.

**Impact:** Every component file that uses `font-serif`, `font-sans`, or `font-sc` as a Tailwind utility class needs updating to the new token names.

### cn utility: import from toolbelt

**Decision:** Delete `src/lib/cn.ts` and replace all imports of it with `import { cn } from '@ageorgedev/toolbelt'`.

**Why:** The implementations are identical (clsx + tailwind-merge). Maintaining a duplicate adds no value.

### tsconfig: extend monorepo base

**Decision:** Replace the standalone `tsconfig.json` with one that extends `@ageorgedev/ts-config/react.json`.

**Detail:** The original config's settings (strict mode, bundler module resolution, react-jsx, ES2022 target) are already covered by the monorepo base. The path alias `@/*` → `./src/*` can be retained as a local override if desired, but components don't appear to rely on it in the existing source.

## Risks / Trade-offs

**CSS @apply in module files may not compile correctly without Vite** → The consumer app's build (Vite + `@tailwindcss/vite`) processes CSS modules with full Tailwind context, so `@apply` directives should resolve. Risk is low if `@source` is set correctly and the app's CSS entry imports the tokens file first. Mitigation: verify the app builds without errors after adding the `@source` directive.

**Font utility class names change across all 30+ components** → Renaming `font-serif` → `font-heading` etc. is a mechanical find-and-replace but affects many files. Mitigation: use project-wide search-and-replace; verify no instances of old names remain.

**Package is copied, not symlinked** → Changes to the original dnd-tooling repo won't sync automatically. Mitigation: the dnd-tooling repo is the source of record until this migration is complete; after that, this monorepo becomes the source of truth.

## Migration Plan

1. Copy `../dnd-tooling/packages/character-sheet/` to `packages/dnd-character-sheet/`
2. Update `package.json`: rename to `@ageorgedev/dnd-character-sheet`, replace devDeps (remove Vite/PostCSS/tailwind), add `@ageorgedev/toolbelt` as dep, update build scripts
3. Replace `tsconfig.json` with one extending `@ageorgedev/ts-config/react.json`
4. Delete `src/lib/cn.ts`; update all imports to `@ageorgedev/toolbelt`
5. Update `src/styles/index.css`: remove Google Fonts import, remove `@import "tailwindcss"`, remove `@theme` font declarations (keep only the `sheet-*` color tokens, move to `src/styles/tokens.css`)
6. Find-and-replace font utility classes: `font-serif` → `font-heading`, `font-sans` → `font-body`, `font-sc` → `font-interface`
7. Update `apps/ageorgedev/src/styles.css`: add `@source` for the new package and `@import` for the tokens CSS
8. Run `yarn install` and `yarn turbo build --filter=@ageorgedev/dnd-character-sheet` to verify

## Open Questions

- Should the path alias `@/*` be preserved in tsconfig, or should all internal imports be made relative? (Recommendation: make imports relative to avoid alias conflicts; the original source mostly uses relative imports already.)
