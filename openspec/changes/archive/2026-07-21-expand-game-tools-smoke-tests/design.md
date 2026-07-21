## Context

`apps/game-tools-e2e` runs Playwright smoke tests against the `game-tools` app (port 3001 locally, `BASE_URL` in CI). The suite is intentionally shallow: unit tests in `packages/dnd-character-sheet` already cover component rendering logic in detail, so the e2e layer only needs to prove that routing, data-wiring, and cross-package integration hold together for real character data. This change adds a second spec file and a small, fixed set of per-character assertions; no production code changes are involved.

## Goals / Non-Goals

**Goals:**
- Prove that more than one character sheet route renders real content end-to-end (not just Claw).
- Prove that the spellbook download link (`DndHeaderActions.tsx`) appears only for characters with an associated PDF, and that the PDF asset actually resolves.
- Keep the added tests cheap and low-maintenance by hardcoding a fixed, small character fixture list rather than deriving it dynamically from `apps/game-tools/src/data/dnd-characters`.

**Non-Goals:**
- Re-testing component-level rendering detail (fonts, layout, ability score math) — that's unit-test territory.
- Covering every character in the roster or every level variant (e.g. Zoynari's two levels, Omarin, Talia) — out of scope per the "level-3 characters won't change" assumption; only a 3-character spot-check is added.
- Changing `DndHeaderActions.tsx`, the spellbook data model, or any other production code.

## Decisions

**Decision: New file `character-sheets.spec.ts` instead of extending `smoke.spec.ts`.**
Mirrors the `ageorgedev-e2e` convention (`smoke.spec.ts` + `talks.spec.ts`) of splitting by concern. Keeps `smoke.spec.ts` focused on "does the app boot" (home, list) while the new file owns "does an individual character sheet render correctly."

**Decision: Fixture is a hardcoded const array, not derived from the data package.**
Importing `apps/game-tools/src/data/dnd-characters` into the e2e package would couple a black-box e2e suite to app internals and defeat the purpose of testing through the browser. Alternatives considered: dynamically deriving the character list via an API/JSON endpoint — rejected, no such endpoint exists and adding one is out of scope for a test-only change.

```ts
const CHARACTERS = [
  { slug: 'claw', name: 'Claw', hasSpellbook: true },
  { slug: 'elnorin-lunarrest', name: 'Elnorin Lunarrest', hasSpellbook: true },
  { slug: 'gonvar-feathertide', name: 'Gonvar Feathertide', hasSpellbook: false },
] as const;
```

**Decision: Assert section headings, not full content, as the "rendered well" signal.**
`PanelTitle` renders each panel's heading as a real `<h3>` (e.g. "Class Features", "Weapons & Damage Cantrips"), so `getByRole('heading', { name })` is a stable, semantic check that a panel mounted with content, without asserting on exact character data (which unit tests already cover).

**Decision: Verify the spellbook link via `aria-label`, and additionally fetch its `href` for casters.**
`DndHeaderActions.tsx` renders the link with `aria-label="Download spellbook PDF"` only when `context.spellBook` is set. For casters, in addition to visibility, use Playwright's `page.request.get(href)` to confirm the PDF asset actually resolves (HTTP 200) — catches a broken `?url` import or missing static asset that a visibility-only check would miss. For the non-caster, assert the link's locator is not present.

**Decision: Drop the old standalone Claw test from `smoke.spec.ts`.**
It's superseded by the parameterized loop in `character-sheets.spec.ts`, which covers Claw plus two more characters. Keeping both would duplicate the same assertion in two files.

## Risks / Trade-offs

- **[Risk]** The hardcoded fixture array will silently pass even if a spot-checked character's level or spellbook status changes → **Mitigation**: acceptable per explicit user instruction that level-3 characters are stable; if the roster changes, the fixture is a 3-line, easy-to-spot update, and CI will fail loudly (missing heading/link) rather than silently if a slug is renamed or removed.
- **[Risk]** Fetching the PDF href via `page.request` adds a network call per caster test, slightly increasing suite runtime → **Mitigation**: only 2 extra requests total (Claw, Elnorin Lunarrest); negligible compared to full page loads already happening.
- **[Risk]** `page.request` in Playwright uses the same base context but not authenticated browser cookies by default for cross-origin assets — not a concern here since the PDF is same-origin static content served by the same dev/preview server.

## Migration Plan

Not applicable — additive test-only change, no deploy or rollback steps beyond merging the PR. Old Claw test removal happens atomically with the new file's addition in the same change.
