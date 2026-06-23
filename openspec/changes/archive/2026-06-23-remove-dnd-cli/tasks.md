## 1. Remove the App

- [x] 1.1 Delete the `apps/dnd-cli` directory and all its contents
- [x] 1.2 Run `yarn install` at the monorepo root to drop the workspace entry from the lockfile

## 2. Clean Up OpenSpec

- [x] 2.1 Delete `openspec/specs/character-cli/spec.md` and its parent directory

## 3. Update Documentation

- [x] 3.1 Remove the `apps/dnd-cli` entry from the Apps section of `CLAUDE.md`
- [x] 3.2 Remove the `yarn dev   # from apps/dnd-cli` command example from `CLAUDE.md`

## 4. Verify

- [x] 4.1 Run `yarn build` and confirm it succeeds with no errors
- [x] 4.2 Run `yarn test` and confirm all tests pass
