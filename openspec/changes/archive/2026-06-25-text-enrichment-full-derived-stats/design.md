## Context

`enrichCharacterData` currently builds a minimal EJS data object (`{ level: { total, [className] } }`) inline, independent of `DerivedStats`. This means any stat accessible via `calculateStats` is unavailable in feature description templates. The `level` object duplicates a calculation that `calculateStats` is the natural home for.

## Goals / Non-Goals

**Goals:**
- Move `level` construction into `calculateStats` so `DerivedStats` is the single source of truth for all derived character data
- Replace `characterLevel: number` with `level: { total: number } & Record<string, number>` on `DerivedStats`
- Spread full `DerivedStats` flat as the EJS render context
- Fix the one `characterLevel` consumer outside the lib (`Resources.tsx`)

**Non-Goals:**
- Adding new EJS helpers or custom template functions
- Changing how `enrichCharacterData` is called or its return type
- Modifying any existing character YAML/JSON data files

## Decisions

### 1. `level` replaces `characterLevel` on `DerivedStats` (not alongside it)

**Decision**: Remove `characterLevel`, add `level: { total: number } & Record<string, number>`.

**Rationale**: Keeping both would be redundant — `level.total === characterLevel`. A single field is cleaner and callers at the call site (`stats.level.total`) are explicit. The only internal usages of `characterLevel` are in `calculate-derived-stats.ts` (local variable, not the interface field), `text-enrichment.ts` (already being replaced), and `Resources.tsx` (trivial one-line fix).

**Alternative considered**: Keep `characterLevel` as an alias. Rejected — redundant state and two sources of truth for the same value.

### 2. Flat spread of `DerivedStats` as EJS context

**Decision**: `ejs.render(str, { ...stats })` — no nesting.

**Rationale**: Keeps templates concise (`<%= proficiencyBonus %>` not `<%= stats.proficiencyBonus %>`). `level.*` templates from the existing spec work unchanged. `DerivedStats` field names are domain-specific and won't collide with each other or EJS internals.

**Alternative considered**: Nest under a `stats` key. Rejected — more verbose and breaks existing `level.total` templates.

### 3. Level construction moves to `calculateStats`

**Decision**: Build `level` in `calculateStats` by reducing `character.classes`, and remove the equivalent code from `text-enrichment.ts`.

**Rationale**: `calculateStats` already derives `characterLevel` from `character.classes`. The `level` object is the same computation expressed differently. Centralising it eliminates duplication and ensures `DerivedStats` is complete before enrichment runs.

## Risks / Trade-offs

- **Breaking change on `DerivedStats.characterLevel`**: Any external consumer of the package reading `stats.characterLevel` will break. Mitigation: the only known consumer is `Resources.tsx` (in-repo), which is fixed in this change. Since this is a personal mono-repo with no published package, no external migration is needed.
- **EJS context pollution**: Spreading all of `DerivedStats` means every field is a top-level template variable. If a future field name clashes with an EJS built-in or a template variable, it could silently shadow. Mitigation: low risk given the domain-specific naming convention (`abilityModifiers`, `savingThrows`, etc.).

## Migration Plan

1. Update `DerivedStats` interface: remove `characterLevel`, add `level`
2. Update `calculateStats`: build `level` object, remove `characterLevel` from return
3. Update `text-enrichment.ts`: pass `{ ...stats }` to `ejs.render` instead of the hand-built `dataValues`
4. Update `Resources.tsx`: `stats.characterLevel` → `stats.level.total`
5. Run tests and type-check — no data migrations required
