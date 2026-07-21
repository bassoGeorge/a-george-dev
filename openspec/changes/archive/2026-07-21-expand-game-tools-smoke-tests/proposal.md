## Why

The `game-tools` Playwright smoke suite currently spot-checks a single character sheet (Claw) and never exercises the "Download Spellbook" header control that several characters depend on. Most character-sheet rendering logic is already covered by unit tests in `packages/dnd-character-sheet`, but there is no e2e signal that the routing, data-wiring, and spellbook-link behavior actually holds together for more than one character. Since the roster's level-3 characters are stable, a small, fixed set of additional e2e spot-checks can catch integration regressions (broken route params, missing spellbook assets, a character with no spellbook wrongly showing the button) without duplicating unit-test coverage or become brittle against roster churn.

## What Changes

- Add a new `apps/game-tools-e2e/tests/character-sheets.spec.ts` file, separate from `smoke.spec.ts`, following the `ageorgedev-e2e` convention of splitting specs by concern.
- Spot-check 3 level-3 characters via a shared const array looped with a `for...of` to generate `test()` blocks: Claw (existing, caster), Elnorin Lunarrest (caster), Gonvar Feathertide (non-caster).
- For each character, assert the character name heading is visible plus at least one major section heading (e.g. "Class Features", "Weapons & Damage Cantrips") to prove non-trivial content rendered, not just an empty shell.
- For casters (Claw, Elnorin Lunarrest), assert the "Download Spellbook" link (`aria-label="Download spellbook PDF"`) is visible, and fetch its `href` via `page.request` to assert the PDF asset resolves with HTTP 200.
- For the non-caster (Gonvar Feathertide), assert the "Download Spellbook" link is absent.
- Extend the existing character list page test in `smoke.spec.ts` to assert that Claw, Elnorin Lunarrest, and Gonvar Feathertide all appear as roster card names.
- Remove the now-redundant standalone "claw character sheet renders" test from `smoke.spec.ts` (superseded by the parameterized test in the new file).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `game-tools-smoke-tests`: Adds requirements for multi-character sheet rendering (name + section headings), spellbook download link presence/absence per character, spellbook asset resolution, and expanded character list assertions.

## Impact

- Affected code: `apps/game-tools-e2e/tests/smoke.spec.ts`, new `apps/game-tools-e2e/tests/character-sheets.spec.ts`.
- No production code changes — tests only, exercising existing routes (`/`, `/dnd/characters`, `/dnd/characters/<slug>`) and the existing `DndHeaderActions` spellbook link.
- Relies on the level-3 character roster (`apps/game-tools/src/data/dnd-characters/`) remaining stable per user instruction; if a spot-checked character's level or spellbook status changes, the hardcoded test fixture array will need a manual update.
