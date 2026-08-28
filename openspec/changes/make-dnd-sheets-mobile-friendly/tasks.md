## 1. Outer App Header

- [x] 1.1 Restructure the shared Game Tools header into responsive branding/theme, breadcrumb, and character-action groups without changing the desktop presentation.
- [x] 1.2 Add below-`tablet` wrapping for long breadcrumbs and labelled download/Customise actions using the custom foundation breakpoint and spacing tokens.
- [x] 1.3 Hide the Print action below 600px while preserving its existing route visibility and desktop `window.print()` behaviour.
- [x] 1.4 Extend focused header tests for mobile Print visibility, labelled actions, and existing desktop behaviour, then record the outer-header commit checkpoint.

## 2. Sheet Header

- [x] 2.1 Add the first necessary mobile outer-grid/page-flow overrides while preserving both page containers and all at-or-above-600px styles.
- [x] 2.2 Stack character name/details, level with armour, and health/death saves below 600px without clipping long content.
- [x] 2.3 Inspect the sheet header at 390px and verify unchanged desktop and print presentation, then record the sheet-header commit checkpoint.

## 3. Abilities and Proficiencies

- [x] 3.1 Convert the mobile ability and proficiency rail to a single-column stream, including any directly necessary containing-grid override.
- [x] 3.2 Verify long labels and values wrap without document overflow and preserve the desktop rail, then record the abilities/proficiencies commit checkpoint.

## 4. Combat Statistics and Attacks

- [x] 4.1 Render armour class, initiative, speed, and passive perception as a two-by-two grid below 600px.
- [x] 4.2 Contain the full attack table in a mobile-only section-level horizontal scroller while preventing its intrinsic width from overflowing the document.
- [x] 4.3 Verify attacks with and without weapon mastery at 390px and preserve desktop/print output, then record the combat commit checkpoint.

## 5. Resources

- [x] 5.1 Convert resource entries to a single-column mobile flow while retaining existing empty-resource behaviour.
- [x] 5.2 Verify representative long and computed resources at 390px and unchanged desktop/print output, then record the resources commit checkpoint.

## 6. Spellcasting

- [x] 6.1 Stack the spell ability panel above the spell-slot panel below 600px and allow slot content to wrap naturally.
- [x] 6.2 Convert grouped spell presentation from three columns to one column on mobile.
- [x] 6.3 Contain table-mode spells in a mobile-only section-level horizontal scroller while preserving all columns and preventing document overflow.
- [x] 6.4 Verify both spell preferences with representative spellcasters at 390px and unchanged desktop/print output, then record the spellcasting commit checkpoint.

## 7. Features and Feats

- [x] 7.1 Convert species traits, class features, and feats to a single-column mobile flow in existing DOM order.
- [x] 7.2 Verify long enriched descriptions wrap without clipping and preserve desktop/print output, then record the features/feats commit checkpoint.

## 8. Page Two

- [x] 8.1 Convert the Page 2 main/sidebar grid into one mobile stream without changing DOM order or the two-page structure.
- [x] 8.2 Adapt actions-in-combat, weapon masteries, equipment training, inventory, appearance, backstory, and notes to mobile-safe wrapping and vertical growth.
- [x] 8.3 Verify all combinations of preference-controlled panels close their gaps naturally and preserve desktop/print output, then record the Page 2 commit checkpoint.

## 9. Cross-Sheet Verification

- [x] 9.1 Add a browser assertion that an individual character sheet has no document-level horizontal overflow at 390px while designated attack and spell tables remain locally scrollable.
- [x] 9.2 Exercise representative characters covering long names, multiple assets, attacks/masteries, both spell modes, long features/equipment/narrative text, and optional panels enabled and disabled.
- [x] 9.3 Inspect the 390px target, natural phone landscape, the 600px boundary, normal desktop, and desktop print preview in current browser tooling.
- [x] 9.4 Run affected formatting/lint, unit, build, and Game Tools browser checks and fix responsive regressions without refactoring desktop styles.
- [x] 9.5 Confirm responsive code uses the custom `tablet` boundary, exponential spacing tokens, theme-aware colors, and no standard `sm`/`md` or new `dark:` variants, then record the final cleanup/regression commit checkpoint.
