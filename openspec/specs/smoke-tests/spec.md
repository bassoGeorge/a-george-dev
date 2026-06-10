# Spec: Smoke Tests

## Overview
End-to-end smoke tests that verify the key pages of the site render correctly. Tests run against a configurable base URL, defaulting to localhost for local development.

---

## Requirements

### Requirement: Home page renders
The system SHALL render the home page with the owner's name and role visible.

#### Scenario: Home page loads successfully
- **WHEN** a user navigates to `/`
- **THEN** the page SHALL display a heading containing "Anish"
- **THEN** the page SHALL display a heading containing "George"
- **THEN** the page SHALL display a heading containing "Web Developer"

---

### Requirement: Resume page renders
The system SHALL render the resume page with identifiable content.

#### Scenario: Resume page loads successfully
- **WHEN** a user navigates to `/resume`
- **THEN** the page SHALL render without error (HTTP 200, no crash)
- **THEN** the page SHALL display visible content (non-empty body)

---

### Requirement: Talks page renders
The system SHALL render the talks index page with identifiable content.

#### Scenario: Talks page loads successfully
- **WHEN** a user navigates to `/talks`
- **THEN** the page SHALL render without error (HTTP 200, no crash)
- **THEN** the page SHALL display visible content (non-empty body)

---

### Requirement: Configurable base URL
The system SHALL target the host defined by the `BASE_URL` environment variable.

#### Scenario: BASE_URL env var used when set
- **WHEN** `BASE_URL` is set to a deployed URL
- **THEN** all test requests SHALL be made against that URL

#### Scenario: Defaults to localhost when BASE_URL is unset
- **WHEN** `BASE_URL` is not set
- **THEN** all test requests SHALL default to `http://localhost:3000`
