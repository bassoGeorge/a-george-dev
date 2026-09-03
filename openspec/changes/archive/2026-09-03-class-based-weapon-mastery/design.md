## Context

Weapon mastery display is currently governed by three independent gates, none of which know anything about the character's class:

```
                    CHARACTER DATA
        ┌──────────────┬──────────────┬──────────────┐
        │ attacks[]    │ classes[]    │ feats[]      │
        │  .masteryPr. │  (unused)    │  (unused)    │
        └──────┬───────┴──────────────┴──────────────┘
               │
    ┌──────────┴───────────────┐
    ▼                          ▼
┌────────────────────┐   ┌──────────────────────────────┐
│ GATE 1             │   │ GATE 2  panel visibility     │
│ AttackList column  │   │ userPrefs.showWeaponMasteries│
│ attacks.some(a =>  │   │        AND                   │
│   a.masteryProperty│   │ GATE 3  panel content        │
│ )                  │   │ uniq(attacks.masteryProperty)│
│                    │   │   → empty ⇒ render null      │
└────────────────────┘   └──────────────────────────────┘
 AttackList.tsx:16        StandardCharacterSheet.tsx:110
                          WeaponMasteries.tsx:9-22
```

Gate 3 is the subtle one: it is nominally a *content* derivation but doubles as a silent *visibility* gate, so an eligible Fighter with unannotated weapons sees nothing even with the preference switched on.

The binding constraint on the solution is structural. `DndHeaderActions` — which owns the "Customise" dropdown — renders in `_public.tsx`, **outside** the `<CharacterSheet>` provider, and therefore cannot call `useCharacter()`:

```
_public.tsx  ─────────────────────────────────┐
 └─ <DndHeaderActions />                      │  ← no character here
      reads: routeMatch.context.{title,assets}│
 └─ <Outlet>                                  │
     └─ $slug.{-$level}.tsx                   │
         └─ <StandardCharacterSheet>          │
             └─ CharacterContext.Provider     │  ← character lives here
                 └─ <WeaponMasteries/>        │
```

The route carries an explicit comment that `beforeLoad` context must stay serialisable, which rules out putting `Character` (whose `Feature.effects` hold functions) into context.

## Goals / Non-Goals

**Goals:**

- Make weapon mastery eligibility a single, testable rules predicate derived from `classes` and `feats`.
- Remove the coupling between weapon *annotation* and feature *availability* in all three gates.
- Give an eligible character a usable Mastery column even before their weapons are annotated.
- Keep the "Weapon Masteries" preference meaningful, but only offer it to characters it applies to.

**Non-Goals:**

- Layout work on the `WeaponMasteries` panel, which grows from 1–4 entries to a fixed 8.
- A per-character override on the `Character` model.
- Modelling the *number* of masteries a class knows, or which specific masteries are chosen.
- Moving `Character` into route context or restructuring the route's `beforeLoad`/loader split.

## Decisions

### D1: Eligibility is class-or-feat, with no data-derived fallback

```
hasWeaponMastery(character) =
     classes.some(c => c.name ∈ WEAPON_MASTERY_CLASSES)
  || feats?.some(f => f.name === 'Weapon Master')
```

No level threshold is applied: all five classes grant Weapon Mastery at level 1 in the 2024 rules, so presence in `classes[]` is sufficient and multiclassing into one qualifies automatically (Omarin Kenate, Monk 2 / Fighter 3, stays eligible).

*Alternative considered — OR-fallback on `attacks.some(a => a.masteryProperty)`.* This would have made the change strictly non-breaking for existing data, but it reintroduces the exact coupling the change exists to remove, and lets a data author silently re-enable the feature by annotating a weapon. Rejected.

*Alternative considered — an explicit `hasWeaponMastery?: boolean` override on `Character`.* No character needs it today and the feat covers the sanctioned non-class path. Rejected as YAGNI; it remains a cheap addition later because every consumer reads the predicate rather than the raw fields.

### D2: The predicate lives beside `HIT_DICE_TABLE`

`lib/character-class-constants.ts` already holds exactly this kind of class→rules-fact lookup. `WEAPON_MASTERY_CLASSES` and `hasWeaponMastery` go there and are exported from `src/index.ts`, making the rule unit-testable without rendering anything.

### D3: Feat detection is an exact string match, backed by a shared constant

The match is exact and case-sensitive on `feats` only. `features` and `speciesTraits` are class/species entries and grant no mastery under the 2024 rules.

The known hazard is silent failure: `common-feats.ts` already contains `'Savage attacker'` with a lowercase `a`, proving this repo's feat naming is not internally consistent, so a mistyped `'Weapon master'` would fail invisibly. The mitigation is a shared `WEAPON_MASTER: Feature` constant in `common-feats.ts` — characters reference the constant and never type the string. Defensive normalisation (trim/lowercase) was rejected as papering over an authoring problem that a constant solves outright.

### D4: Eligibility reaches the header via `getCharacterBrief`

`getCharacterBrief` is already the serialisable projection of a character, already computed in `beforeLoad`, and already exported. Adding `hasWeaponMastery: boolean` to it carries the signal to `DndHeaderActions` without touching the route's serialisability constraint.

```
getCharacterBrief(character)
  └─ + hasWeaponMastery: boolean
       │
       ▼
  beforeLoad → context.{title, assets, hasWeaponMastery}
       │
       ▼
  DndHeaderActions → omit the checkbox item entirely
```

`brief.classes` alone is insufficient, because the feat arm of the predicate needs the full character. Computing the boolean brief-side keeps the whole rule in one place.

*Alternative considered — lifting `DndHeaderActions` inside the sheet provider, or duplicating the dropdown per route.* Both are larger structural changes than the feature warrants.

### D5: The gate is duplicated by design — sheet and menu

`StandardCharacterSheet` and `DndHeaderActions` each apply the eligibility check independently. This is not accidental duplication to be factored away: `showWeaponMasteries` is a **single global `localStorage` object shared across every character**, so a user who enables it on their Fighter and then navigates to a Wizard must not see the panel. The sheet gate is authoritative; the menu gate is only an affordance.

### D6: Ineligibility never writes back to stored preferences

Eligibility is a pure render-time gate. Viewing an ineligible character must not persist `showWeaponMasteries: false`, or navigating to a Wizard would silently destroy a preference set on a Fighter. `UserPrefsContext` is therefore untouched — same shape, same defaults, same persistence.

### D7: The panel becomes a static, hook-free reference

`WeaponMasteries` stops reading `character.attacks`, which removes `useCharacter()`, `useMemo`, and the ramda `filter`/`map`/`uniq` imports, and drops the empty-list guard (visibility is now the sheet's job, and the list is never empty).

Ordering is produced by `Object.keys(Descriptions).sort()` rather than by relying on the object literal. The literal *is* alphabetical today, so the sort is a no-op — but it makes "alphabetical" a property of the code instead of a property of how someone happened to type the record.

### D8: The Mastery column ignores preferences entirely

`AttackList` gates its column on eligibility alone, with no reference to `showWeaponMasteries` — consistent with today, where the column has no preference either. The column is character data; the panel is beginner help. An eligible character with unannotated weapons gets an empty column, which is the intended outcome: masteries are swappable on a long rest, so a blank cell is somewhere to pencil one in.

## Risks / Trade-offs

- **The panel roughly triples in height** (1–4 entries → a fixed 8, with long descriptions; `columns-3` desktop, `columns-1` under `max-tablet` giving 8 stacked paragraphs, potentially directly beneath `ActionsInCombat`). → Accepted deliberately. It is opt-in beginner help, and a user who ticks it wants the full reference. Layout reorganisation is a tracked follow-up rather than scope creep into ground the mobile-friendly change just settled.

- **An eligible character with unannotated weapons gains an empty column**, widening a table that is horizontally scrollable on mobile. → Accepted; this is the feature working as intended, not a regression.

- **A mistyped feat name fails silently** — no error, the character is simply ineligible. → Mitigated by the shared `WEAPON_MASTER` constant. Residual risk is low and only affects hand-authored characters that bypass the constant.

- **`exampleWizard` carries a now-inert `masteryProperty: 'Slow'`.** → Removed as part of this change. Left in place it would be a trap: data asserting something the rules engine denies.

- **Two independent eligibility checks could drift** if one is updated without the other. → Both call the same exported predicate, and both are covered by tests; the shared rule cannot diverge, only its application sites.

## Migration Plan

No data migration and no persisted-state migration — `UserPrefsContext`'s shape and storage key are unchanged, so existing `localStorage` entries continue to deserialise. The change is behavioural only and ships in a single commit; rollback is a straight revert.

Verified against existing character data: Splitter (Barbarian), Claw (Rogue), Gonvar Feathertide (Fighter) and Omarin Kenate (Monk/Fighter) all remain eligible and keep their Mastery columns. `exampleWizard` (Sorcerer/Warlock) is the only character whose behaviour changes, and it is a package fixture rather than published character data. The `game-tools-e2e` assertion on the "Weapon Masteries" menu item targets Claw (Rogue, eligible) and is currently `test.skip`, so it is unaffected either way.

## Open Questions

None outstanding. The following were resolved before this document was written and are recorded here so they are not silently reopened:

- Eligibility gates the preference rather than replacing it — the panel stays opt-in beginner help for characters that qualify.
- The panel shows all eight masteries, not the character's subset.
- Feat detection is an exact string match rather than a flag on `Feature`.
- The dropdown item is hidden, not disabled, for ineligible characters.
