---
name: write-commits
description: Conventions for git commit messages, branch names, and PR titles in this repo, including the Linear magic words (fixes/closes/resolves) and AGE-nn issue IDs needed to transition tickets. Use whenever you are about to run `git commit`, propose a commit message, name a branch, or open/title a PR here — even if the request is just "commit this" or "push these changes".
---

# Writing commits in this repo

Commits follow Conventional Commits, and work is tracked in Linear with `AGE-nn` issue IDs. A commit that touches tracked work must say which issue it closes.

## Format

```
<type>(<scope>): <subject>, <magic word> AGE-nn

<optional body>
```

- `<scope>` is optional but expected whenever the change sits in one package/app.
- Subject is a short imperative-ish summary. Sentence case is the house style (`feat(dnd): Add other chars`), not lowercase-only — match it.
- The Linear magic word + issue ID go at the **end of the first line** (see below). Omit only when there's genuinely no issue.
- No trailing period. Keep the whole first line under ~72 chars — shorten the summary, never the magic word.

## Types

| Type | Use for |
|---|---|
| `feat` | New behaviour or user-visible change (most common here) |
| `fix` | Bug fix |
| `chore` | Maintenance, deps, config, content fill-in |
| `docs` | Docs and OpenSpec artifacts |
| `test` | Test-only changes |
| `refactor` | Restructuring with no behaviour change |
| `style` | Formatting/visual-only tweaks |

## Scopes

Use the short name the repo already uses, not the full package name:

| Scope | Covers |
|---|---|
| `dnd` | `packages/dnd-character-sheet` |
| `dnd-sheet` | The character-sheet rendering specifically |
| `ds` | `packages/design-system` (`design-system` also appears; prefer `ds`) |
| `game-tools` | `apps/game-tools` |
| `site` | `apps/ageorgedev` |
| `github` | CI workflows and `.github/` |
| `openspec` | `openspec/` change artifacts |
| `global` | Cross cutting concerns|

Multiple scopes go comma-separated: `feat(dnd, ds): ...`. Omit the scope for genuinely repo-wide changes (`chore: migrate github scripts to v8 for node 24 runtime`).

## Linear issue IDs — magic words

Linear only transitions an issue when a **magic word** is followed by the issue ID. A bare `AGE-11` links nothing. See [Linear's GitHub magic words docs](https://linear.app/docs/github#use-a-magic-word).

**Placement: end of the first line.** Put `<magic word> AGE-nn` at the end of the subject, after the summary:

```
feat(dnd): Customisation dropdown, fixes AGE-11
fix(dnd): Repair corrupted sheet PDF export, closes AGE-20
chore(github): Stop false failures on cleanup, resolves AGE-23
```

Not in the scope, not only in the body, not a bare ID in parens. The magic word goes on line one so it survives squash-merge (the PR title becomes the commit subject, and Linear reads both PR titles and commit messages — but **not** branch names or PR comments).

**Multiple issues** — one magic word, comma-separated IDs:

```
fix(dnd): Fix remaining mobile layout issues, fixes AGE-16, AGE-17, AGE-18
```

**Closing magic words** (transition the issue on merge) — pick one and stay consistent:
`close`, `closes`, `closed`, `closing`, `fix`, `fixes`, `fixed`, `fixing`, `resolve`, `resolves`, `resolved`, `resolving`, `complete`, `completes`, `completed`, `completing`, `implement`, `implements`, `implemented`, `implementing`.

**Non-closing magic words** (link without closing) — use when the commit is partial work on an issue:
`ref`, `refs`, `references`, `part of`, `contributes to`, `toward`, `towards`.

```
feat(dnd): Add class badge components, part of AGE-9
```

Use `relates to AGE-nn` for a pure relation (link, no status change), and `ignore AGE-nn` / `skip AGE-nn` to stop Linear linking an ID you only mentioned in passing.

### When you don't have an ID

**Never invent or guess an `AGE-nn`.** IDs are sequential and every plausible-looking one is probably a real, unrelated issue — a guessed ID closes someone else's ticket on merge. There is no "it's probably AGE-24 since the last one was AGE-23".

| Situation | Do |
|---|---|
| User gave the ID, or it's in the branch name / OpenSpec change | Use it with a magic word |
| A Linear MCP server is connected | Look the issue up and confirm the match with the user before using it |
| Work plainly maps to a ticket but you don't know which | **Ask the user for the ID** before committing |
| No ticket exists — drive-by fix, formatting, dependency bump, exploratory spike | Commit with **no** ID, no magic word |

Not every commit has an issue, and that's fine — `chore: migrate github scripts to v8 for node 24 runtime` is a perfectly good commit. A missing ID is a normal outcome, not a gap to fill by inference. What's never fine is a made-up one.

## Bodies

Most commits are subject-only. Add a body when the *why* isn't obvious from the subject — explain the reason and the consequence, not the diff:

```
fix(dnd): update stale roster card tests and add missing design-system dep

Tests still asserted the pre-DndClassColors neutral styling; update them
to match the per-class colors introduced across recent color commits.
Also declare @ageorgedev/design-system as a dependency of
dnd-character-sheet so Turborepo builds it before consuming
class-colors.ts, which was causing non-deterministic build failures.
```

Wrap body lines at ~72 chars. Keep the `Co-Authored-By:` trailer last when present.

## Branches and PRs

- Branch: `<type>/<kebab-summary>` — e.g. `feat/mobile-friendly-dnd`. Including the ticket (`feat/age-14-mobile-header`) helps Linear link the branch, but magic words in a branch name do **not** transition anything.
- PRs squash-merge into `main`, so **the PR title becomes the commit message** — it must itself be a valid conventional-commit subject ending in the magic word + ID. GitHub appends ` (#142)` after it; don't type that yourself, and don't let it push the magic word off the line.
- Individual commits inside a PR keep their own conventional prefixes — they end up as the bullet list in the squashed body.

## Common mistakes

- Bare summaries with no type (`Maintenance works`, `Enhance Claw character features`) — legacy commits, don't copy them.
- Using the old `LB-nnn` prefix. That project is history; current work is `AGE-nn`.
- A bare ID with no magic word — `feat(dnd): Customisation dropdown (AGE-11)` links nothing and leaves the issue open. Historic commits do this; don't copy them.
- Putting the ticket ID in the scope (`feat(AGE-19): ...`) — it happened once, but the scope is for the package. The ID belongs at the end of the subject.
- Burying the magic word in the body only. It works for a direct commit, but the body becomes a squash bullet and the PR title — the line Linear and reviewers read first — carries no reference.
- Squeezing several unrelated changes into one commit because they share a branch — split by scope so the squashed body stays readable.
