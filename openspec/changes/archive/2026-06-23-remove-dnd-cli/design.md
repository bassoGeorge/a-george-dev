## Context

`apps/dnd-cli` is an Ink-based terminal wizard (~803 lines) that scaffolds D&D character `.data.ts` files. It imports types from `@ageorgedev/dnd-character-sheet` but no other package depends on it. It has its own `package.json`, `tsconfig.json`, and `turbo.json`. There is one associated OpenSpec spec (`openspec/specs/character-cli/spec.md`) that documents its requirements.

## Goals / Non-Goals

**Goals:**
- Remove `apps/dnd-cli` from the monorepo without breaking anything else
- Clean up the orphaned spec and documentation references
- Leave `example-wizard.data.ts` intact as a working character example

**Non-Goals:**
- Replacing the CLI with another character creation workflow
- Modifying the `dnd-character-sheet` package models (they remain unchanged)
- Altering any existing character data files

## Decisions

**Delete the app directory outright** — There are no reverse dependencies and no generated artifacts that need preserving (the one generated character file is kept deliberately). A simple `rm -rf apps/dnd-cli` is sufficient; no deprecation or migration path is needed.

**Delete `openspec/specs/character-cli/spec.md`** — The spec describes a capability that will no longer exist. Retaining it would mislead future contributors. The OpenSpec `specs/` directory documents live capabilities only.

**Update CLAUDE.md manually** — Two references need removing: the `dnd-cli` entry under Apps in the Architecture section and the standalone `yarn dev` command example. No other docs reference it.

## Risks / Trade-offs

- **Turborepo workspace glob** — The root workspace picks up `apps/*` automatically, so deleting the directory is sufficient; no root `package.json` edit is required. Low risk.
- **Character authoring regression** — Developers who previously relied on the wizard must now write `.data.ts` files by hand. Acceptable: the format is simple and `example-wizard.data.ts` serves as a reference template.

## Migration Plan

1. Delete `apps/dnd-cli/`
2. Delete `openspec/specs/character-cli/spec.md`
3. Remove dnd-cli references from `CLAUDE.md`
4. Run `yarn install` to let Yarn drop the workspace entry from the lockfile
5. Run `yarn build` / `yarn test` to confirm nothing is broken

Rollback: revert via git — no database or deployment changes involved.
