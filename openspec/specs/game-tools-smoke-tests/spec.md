# Game Tools Smoke Tests

## Overview

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
The system SHALL render the D&D character list with at least one character visible, proving the dynamic route-collection logic resolved successfully.

#### Scenario: Character list loads successfully
- **WHEN** a user navigates to `/dnd/characters`
- **THEN** the page SHALL display a heading with the text "Characters"
- **THEN** the page SHALL display at least one character entry with a visible character name

---

### Requirement: Individual character sheet renders
The system SHALL render an individual character sheet with the character's name visible, proving both routing and character-data hydration succeeded.

#### Scenario: Claw character sheet loads successfully
- **WHEN** a user navigates to `/dnd/characters/claw`
- **THEN** the page SHALL display the character name "Claw"

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
