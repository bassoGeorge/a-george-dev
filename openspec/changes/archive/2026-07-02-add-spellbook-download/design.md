## Context

The game-tools app's `_public.tsx` layout already reads `useMatches()` to build the breadcrumb trail and toggle the Print button (`isCharacterSheet = matches.some((m) => m.routeId.includes('_sheet'))`). Character routes declare metadata through TanStack Router's `staticData`, which is typed in `apps/game-tools/src/type-enhancements.d.ts`. `spellBookUrl?: string` is already declared there, and `zoynari.2.tsx` already populates it via `new URL('...pdf', import.meta.url).href` (Vite handles bundling the asset).

The Print button lives inside the header element that carries `print:hidden`, and uses a Phosphor icon at `size={30}`. The new control should be visually and behaviourally consistent.

## Goals / Non-Goals

**Goals:**
- Surface `staticData.spellBookUrl` as a downloadable action beside the Print button.
- Reuse the same match-derivation pattern already in `_public.tsx` so behaviour follows route static data automatically.
- Trigger a file download (not inline navigation) so the PDF is saved to disk.
- Zero changes to existing character data files — the button appears automatically for routes that already declare `spellBookUrl`.

**Non-Goals:**
- Rendering the spellbook PDF inline in the character sheet.
- Introducing a general "downloadable route asset" abstraction — this is scoped to spellbooks.
- Changing how `spellBookUrl` is declared or typed (already in place).
- Adding tests beyond what the existing app conventions require; the button is a thin presentational addition.

## Decisions

### Derive the URL from `useMatches()`, matching the existing breadcrumb/print pattern
Read the URL by scanning `matches` for a `staticData.spellBookUrl` value: `const spellBookUrl = matches.map((m) => m.staticData?.spellBookUrl).find(Boolean);`. This mirrors how `isCharacterSheet` and the breadcrumb data are already derived in `_public.tsx`, keeping the layout self-contained.

**Alternative considered:** Reading via `Route.useMatch()` on the specific character route. Rejected because `_public.tsx` sits above the character routes and shouldn't hard-code knowledge of them; the `useMatches` scan generalises to any future route that declares `spellBookUrl`.

### Render an `<a download>` rather than a `<button onClick>` with programmatic download
An anchor element with `href={spellBookUrl}` and the `download` attribute is the simplest way to force a save-as. It preserves right-click "Save link as", middle-click open-in-new-tab, keyboard focus semantics, and doesn't require any JS handler. Style it to visually match the Print button (`hover:text-primary-foreground transition-colors`, same icon size).

**Alternative considered:** A button that programmatically creates a temporary anchor and clicks it. Rejected as unnecessary indirection — we already have the URL at render time.

### Use a Phosphor icon for visual consistency
`@phosphor-icons/react` is already imported for `PrinterIcon`. Use `BookOpenIcon` (or a similarly semantic option like `DownloadSimpleIcon`) at `size={30}` to match. Pick the icon that best communicates "spellbook download" — leaning toward a book-shaped icon over a generic download arrow, since the specificity is the point of the control.

### Show independent of `isCharacterSheet`
Gate purely on the presence of `spellBookUrl` in matches. Any route that declares one is implicitly a character sheet in practice, and this keeps the two controls independently gated. Non-character routes cannot accidentally show the button because they don't declare the field.

## Risks / Trade-offs

- **Cross-origin download behaviour** → In practice `spellBookUrl` comes from `new URL('...', import.meta.url).href`, so the PDF is same-origin (served from the app bundle). The `download` attribute works reliably in this case. If a future spellbook ever pointed to a cross-origin URL, browsers would ignore the `download` hint and open the file inline — acceptable degradation.
- **Icon choice ambiguity** → `BookOpenIcon` reads as "read" more than "download". Mitigation: pair with the `aria-label="Download spellbook PDF"` and a `title` attribute so hover + AT users get clarity. If it feels wrong in-browser, swap to `DownloadSimpleIcon` during implementation review.
- **Header crowding** → Header now has breadcrumbs + Print + Spellbook + ThemeSwitcher. Existing flex layout with `gap-4` accommodates this; no change needed. Recheck spacing visually on narrow viewports during implementation.
