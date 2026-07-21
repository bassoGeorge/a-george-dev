# Game Tools Smoke Tests

## Purpose

This spec defines smoke tests for the `game-tools` application, verifying that core pages render correctly and that the app is functional end-to-end. These tests are separate from the main site smoke tests and target the game-tools app specifically.

## Requirements

### Requirement: Game-tools home page renders
The system SHALL render the game-tools home page with identifiable content proving the app booted and top-level navigation is present.

#### Scenario: Home page loads successfully
- **WHEN** a user navigates to `/`
- **THEN** the page SHALL display a heading with the text "Game Tools"
- **THEN** the page SHALL display a link to the character list

---

### Requirement: Character list page renders
The system SHALL render the D&D character list with at least one character visible, proving the dynamic route-collection logic resolved successfully. The list SHALL also display roster card names for a fixed set of known level-3 characters, proving individual character briefs hydrate correctly.

#### Scenario: Character list loads successfully
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** the page SHALL display a heading with the text "Characters"
- **THEN** the page SHALL display at least one character entry with a visible character name

#### Scenario: Known level-3 characters appear as roster cards
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** the page SHALL display roster card names for "Claw", "Elnorin Lunarrest", and "Gonvar Feathertide"

---

### Requirement: Individual character sheet renders
The system SHALL render an individual character sheet with the character's name visible, several major section headings populated (including "Class Features", "Passive Perception", "Proficiency Bonus", and "Weapons & Damage Cantrips"), and the "Print character sheet" control visible — proving routing, character-data hydration, and non-trivial content rendering across multiple sheet regions all succeeded. This SHALL be verified for a fixed spot-check set of level-3 characters covering both caster and non-caster classes.

#### Scenario: Claw character sheet loads successfully
- **WHEN** a user navigates to `/dnd/characters/claw`
- **THEN** the page SHALL display the character name "Claw"
- **THEN** the page SHALL display "Class Features", "Passive Perception", "Proficiency Bonus", and "Weapons & Damage Cantrips" section headings
- **THEN** the page SHALL display a "Print character sheet" button

#### Scenario: Elnorin Lunarrest character sheet loads successfully
- **WHEN** a user navigates to `/dnd/characters/elnorin-lunarrest`
- **THEN** the page SHALL display the character name "Elnorin Lunarrest"
- **THEN** the page SHALL display "Class Features", "Passive Perception", "Proficiency Bonus", and "Weapons & Damage Cantrips" section headings
- **THEN** the page SHALL display a "Print character sheet" button

#### Scenario: Gonvar Feathertide character sheet loads successfully
- **WHEN** a user navigates to `/dnd/characters/gonvar-feathertide`
- **THEN** the page SHALL display the character name "Gonvar Feathertide"
- **THEN** the page SHALL display "Class Features", "Passive Perception", "Proficiency Bonus", and "Weapons & Damage Cantrips" section headings
- **THEN** the page SHALL display a "Print character sheet" button

---

### Requirement: Spellbook download link presence matches character data
An individual character sheet page SHALL display a "Download spellbook PDF" link when the character has an associated spellbook, and SHALL NOT display the link when the character has no spellbook. When present, the link's target SHALL resolve to a real asset.

#### Scenario: Caster character shows a working spellbook link
- **WHEN** a user navigates to `/dnd/characters/claw` or `/dnd/characters/elnorin-lunarrest`
- **THEN** the page SHALL display a link with accessible name "Download spellbook PDF"
- **THEN** requesting the link's `href` SHALL return an HTTP 200 response

#### Scenario: Non-caster character shows no spellbook link
- **WHEN** a user navigates to `/dnd/characters/gonvar-feathertide`
- **THEN** the page SHALL NOT display a link with accessible name "Download spellbook PDF"

---

### Requirement: Configurable base URL
The system SHALL target the host defined by the `BASE_URL` environment variable, defaulting to the local game-tools dev port when unset.

#### Scenario: BASE_URL env var used when set
- **WHEN** `BASE_URL` is set to a deployed URL
- **THEN** all test requests SHALL be made against that URL

#### Scenario: Defaults to localhost when BASE_URL is unset
- **WHEN** `BASE_URL` is not set
- **THEN** all test requests SHALL default to `http://localhost:3001`

---

### Requirement: Chromium-only execution
The test suite SHALL run under a single `chromium` Playwright project, matching the convention established by `@ageorgedev/ageorgedev-e2e`.

#### Scenario: Default project configuration
- **WHEN** `playwright test` is invoked with no `--project` flag
- **THEN** tests SHALL execute against Desktop Chrome only
