## ADDED Requirements

### Requirement: Navigation header wraps cleanly on mobile
Below 600 CSS pixels, the shared Game Tools header SHALL wrap into deliberate rows containing branding with the theme control, the complete breadcrumb trail, and character-specific actions. Breadcrumbs and action groups SHALL wrap onto additional lines when needed; action labels SHALL remain visible; and interactive controls SHALL remain usable touch targets. The header MAY grow vertically to accommodate long character names and multiple assets.

#### Scenario: Character route is viewed at the supported phone width
- **WHEN** a user views a character route at 390 CSS pixels wide
- **THEN** the Game Tools branding and theme control render in the first header group
- **THEN** the complete breadcrumb trail renders in a following group and may wrap across lines
- **THEN** downloads and Customise render with visible labels in a following action group and may wrap across lines

#### Scenario: Character has a long name and multiple assets
- **WHEN** a character breadcrumb is long and the character exposes multiple downloadable assets below 600 CSS pixels wide
- **THEN** the header grows vertically and wraps its content without page-level horizontal overflow or inaccessible controls

#### Scenario: Header is displayed at or above the tablet breakpoint
- **WHEN** the shared header is displayed at 600 CSS pixels wide or wider
- **THEN** its pre-change desktop layout and styling remain unchanged

### Requirement: Mobile header styling follows the foundation theme
Mobile header styling SHALL use the custom breakpoint, spacing, typography, and theme-aware color conventions imported by `packages/foundation-styles/src/theme.css`. It SHALL NOT assume standard Tailwind `sm` or `md` breakpoints or add `dark:` variants.

#### Scenario: Mobile header styles are inspected
- **WHEN** a developer reviews the responsive header implementation
- **THEN** its responsive boundary and design tokens follow the foundation theme configuration

