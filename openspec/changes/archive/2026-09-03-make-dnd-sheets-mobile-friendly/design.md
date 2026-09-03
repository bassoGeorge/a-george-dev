## Context

The Game Tools public header and `@ageorgedev/dnd-character-sheet` components are currently desktop/print-first. The shared header is a single flex row, while the standard sheet uses fixed multi-column grids, non-wrapping summary rows, and dense semantic tables. At phone widths these structures compress, clip, or push the page beyond the viewport.

The foundation theme replaces Tailwind's standard responsive and spacing assumptions. `packages/foundation-styles/src/theme.css` imports an exponential spacing scale, theme-aware colors, and custom breakpoints beginning with `tablet` at 600px. The existing desktop and fixed two-page print composition are protected regression surfaces. Mobile is a read-only companion; printed pages remain the actual-play format.

Development will be phased through coherent commits, but the feature will be released only after the entire sheet is complete.

## Goals / Non-Goals

**Goals:**

- Produce a non-breaking, readable character-sheet experience at 390px portrait in current iOS Safari and Android Chrome.
- Prevent page-level horizontal overflow while keeping all existing information reachable.
- Preserve the two page containers and existing DOM/content order.
- Keep all layout and styling at 600px and above pixel-identical to the current desktop experience.
- Preserve the supported desktop print composition.
- Follow the custom breakpoint, spacing, color, and typography conventions exposed through `foundation-styles`.
- Structure implementation as reviewable commits that follow sheet order and isolate regressions.

**Non-Goals:**

- Editing, tracking, or persisting character state.
- Collapsible sections, tabs, mobile section navigation, or a separate summary view.
- Mobile-specific content ordering or hidden table fields.
- An icon-only header or mobile overflow-menu redesign.
- A desktop, tablet, or print redesign.
- Guaranteed printing through a mobile browser's own controls.
- A separate landscape layout or formal support below 390px.

## Decisions

### Apply mobile overrides to the desktop-first layout

Keep the current classes as the source of truth and add overrides that apply only below the custom 600px `tablet` breakpoint. Prefer the custom max-breakpoint variant generated from the theme; if a required rule cannot be expressed reliably as a utility, use a narrowly scoped media query tied to the same theme breakpoint semantics.

This direction preserves desktop computed styles instead of inverting every component to Tailwind's usual mobile-first pattern. Standard `sm:` and `md:` variants must not be introduced because the project removes them.

**Alternative considered:** Rebuild components as mobile-first with `tablet:` restoring desktop. Rejected because it requires restating the existing desktop layout and raises the risk of violating pixel-level preservation.

### Keep print rules authoritative

Mobile screen overrides must not alter the existing print composition. Existing `print:` utilities and print styles remain authoritative; any mobile rule that could affect page height, overflow, display, or grid composition must be checked in desktop print preview. The in-app Print button is hidden below 600px, and mobile-browser printing is not an acceptance surface.

**Alternative considered:** Make the responsive layout printable from phones. Rejected because printed pages are produced through the protected desktop workflow and mobile print support would expand the scope substantially.

### Wrap the shared header without changing its information architecture

Below 600px, arrange the header into natural groups:

1. Game Tools branding and theme control.
2. The complete breadcrumb trail, with long character names allowed to wrap.
3. Download links and Customise, retaining visible labels and wrapping as needed.

Hide Print in the mobile screen layout. Allow the header to grow vertically and keep interactive controls near a 44px touch target. Do not consolidate actions or truncate breadcrumb content.

**Alternative considered:** Replace actions with icons or an overflow menu. Rejected for this baseline because the user chose a simple wrapping treatment and visible labels.

### Preserve page boundaries and progressively adapt their grids

Retain the two `Page` containers and their DOM order, but remove mobile-only fixed-height and multi-column constraints so each page grows vertically. Do not create a standalone grid-foundation commit: where an outer grid needs a one-line stacking override, include it in the first commit that touches content within that grid.

This accepts that intermediate commits may leave later sections awkward on mobile; the branch is not released until all phases are complete.

**Alternative considered:** Convert every outer grid in a preliminary commit. Rejected because it would create broad intermediate churn without completing any user-visible section.

### Use simple section-specific flow

Apply the following below-600px treatments while keeping typography and normal content density intact:

- Sheet header: name/details, then level and armour, then health/death saves.
- Abilities and proficiencies: one column.
- Combat summary: two-by-two grid.
- Resources: one column.
- Features and feats: one column in existing order.
- Spellcasting summary: spell ability above spell slots.
- Grouped spell list: one column.
- Page-two main and sidebar content: one continuous column in existing DOM order.
- Optional panels: rely on normal flow so hidden panels leave no fixed gaps.

Prefer vertical growth and wrapping over reduced type sizes. Use only the named spacing tokens from the exponential scale and existing theme-aware colors; do not introduce `dark:` variants.

**Alternative considered:** Reorder or collapse content to prioritise combat information. Deferred because mobile is a faithful read-only companion in this endeavour.

### Contain intrinsically wide tables locally

Wrap the attack table and table-mode spell list in section-local horizontal overflow containers on mobile. Preserve every column and keep the semantic table structure. Ensure ancestor grid/flex items can shrink so table width does not propagate to the document. No other sheet section may depend on horizontal scrolling.

**Alternative considered:** Convert rows to cards or hide secondary columns. Rejected because both options redesign information presentation and complicate desktop parity.

### Verify stable behaviour automatically and visual flow manually

Add focused browser assertions where behaviour is stable: Print visibility across the 600px boundary, no document-level horizontal overflow at 390px, and continued optional-panel behaviour. Retain existing unit coverage and run affected lint, unit, build, and browser checks.

Use manual inspection for exact wrapping and visual quality rather than introducing brittle screenshot baselines. Exercise existing characters representing long names, multiple assets, attacks and masteries, both spell modes, long features/equipment/narrative text, and optional panels enabled and disabled. Check 390px portrait, natural landscape behaviour, the 600px boundary, normal desktop, and desktop print preview as useful during implementation rather than as a rigid formal matrix.

## Risks / Trade-offs

- **[Risk] Local table scrolling may be difficult to discover** → Keep native scrolling for this baseline and consider edge affordances or sticky columns in a later usability change.
- **[Risk] Below-600px overrides leak into print or 600px desktop styles** → Scope responsive rules narrowly and verify the breakpoint boundary and desktop print preview after each phase.
- **[Risk] Long content exposes unanticipated intrinsic minimum widths** → Test representative character extremes and ensure grid/flex ancestors can shrink before adding truncation.
- **[Risk] The wrapped app header can become tall** → Accept vertical growth for correctness; revisit action consolidation only with evidence from actual use.
- **[Risk] Incremental commits temporarily expose incomplete mobile sections** → Keep work isolated until all phases and final regression checks are complete.
- **[Trade-off] Desktop-first overrides duplicate some layout declarations** → Accept limited duplication to protect the pixel-identical desktop contract.
- **[Trade-off] Supporting only current iOS Safari and Android Chrome narrows compatibility** → Other modern browsers receive best-effort behaviour without expanding the initial test surface.

## Migration Plan

1. Adapt and verify the outer app header.
2. Adapt the sheet header, including directly necessary outer-grid stacking.
3. Adapt abilities and proficiencies.
4. Adapt combat statistics and attacks.
5. Adapt resources.
6. Adapt spellcasting in both display modes.
7. Adapt features and feats.
8. Adapt Page 2 reference, inventory, narrative, and notes sections.
9. Perform cross-sheet overflow cleanup and regression coverage.
10. Release only after the complete mobile sheet is verified; no runtime feature flag or data migration is required.

Rollback consists of reverting the responsive commits. No stored data, route contract, or public component API migration is involved.

## Open Questions

None. The requirements interview reached shared understanding before this design was captured.
