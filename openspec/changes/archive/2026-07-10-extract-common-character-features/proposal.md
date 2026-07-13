## Why

Character data files in `apps/game-tools/src/data/dnd-characters/` duplicate the exact same feature/feat definitions across characters (e.g., the Alert feat appears verbatim in both Claw and Gonvar; Fighter class features like Second Wind, Action Surge, Tactical Mind are repeated word-for-word between Gonvar and Omarin; elf species traits are duplicated across Elnorin and Omarin). This makes updates error-prone (a rules tweak requires editing multiple files) and inflates each character file. The `common/common-feats.ts` file already exists as a TODO placeholder for exactly this purpose.

## What Changes

- Populate `common/common-feats.ts` (and add companion `common/common-class-features.ts`, `common/common-species-traits.ts`) with exported `Feature` constants for every duplicated feat, class feature, and species trait identified across character files.
- Add small factory helpers where a shared feature has a per-character parameter (e.g., `channelDivinity(usesPerRest)`, `weaponMastery(masteries)`) so characters compose the constant with their specific variation rather than copying the whole text.
- Refactor every character file (`claw`, `elnorin-lunarrest`, `gonvar-feathertide`, `omarin-kenate`, `saora-embervale`, `splitter`, `zoynari-2`, `zoynari-3`) to import from `common/` instead of inlining these duplicated entries.
- No changes to the `Feature` type itself, to the character sheet UI, or to routing — this is a pure refactor of static data.

## Capabilities

### New Capabilities
- `dnd-common-character-data`: A shared registry of reusable `Feature` constants and factory functions for feats, class features, and species traits used across multiple D&D character data files in `apps/game-tools`.

### Modified Capabilities
<!-- None — no rendered-behaviour changes. The character sheet UI must display identical content. -->


## Impact

- **Code**: All files in `apps/game-tools/src/data/dnd-characters/*/` and `apps/game-tools/src/data/dnd-characters/common/common-feats.ts`. New sibling files may be added under `common/`.
- **Tests**: Any existing snapshot/unit tests that render these characters should continue to pass unchanged; if none exist, the diff must be verified visually.
- **APIs / dependencies**: None. Purely internal reorganisation of static data.
- **Risk**: Low — data equivalence can be verified by comparing the resolved feature arrays before/after.
