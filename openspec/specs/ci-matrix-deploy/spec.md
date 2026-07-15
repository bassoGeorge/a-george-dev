# CI Matrix Deploy

## Purpose

This spec defines the requirements for simplifying GitHub Actions CI workflows to use matrix-based deployments, removing hotfix-related logic, and centralising deploy behaviour into a reusable workflow.

## Requirements

### Requirement: Info job outputs production deploy matrix
The Info job SHALL compute and output a `production_deploy_matrix` JSON array containing one entry per deployable app where the corresponding `should_deploy_*` condition is true. Each entry SHALL contain `vercel_project_name` (resolved from vars) and an optional `e2e_project` field. When no apps qualify, the output SHALL be an empty JSON array `[]`.

#### Scenario: Site changed on production push
- **WHEN** `@ageorgedev/ageorgedev` is in the affected projects list
- **THEN** `production_deploy_matrix` contains one entry with `vercel_project_name` set to the resolved site project name and `e2e_project` set to `@ageorgedev/ageorgedev-e2e`

#### Scenario: Design system changed on production push
- **WHEN** `@ageorgedev/design-docs` is in the affected projects list
- **THEN** `production_deploy_matrix` contains one entry with `vercel_project_name` set to the resolved design system project name and no `e2e_project` field

#### Scenario: Game-tools changed on production push
- **WHEN** `@ageorgedev/game-tools` is in the affected projects list
- **THEN** `production_deploy_matrix` contains one entry with `vercel_project_name` set to the resolved game-tools project name and `e2e_project` set to `@ageorgedev/game-tools-e2e`

#### Scenario: Nothing deployable changed
- **WHEN** none of site, design-system, or game-tools is in the affected projects list
- **THEN** `production_deploy_matrix` is `[]`

### Requirement: Info job outputs PR deploy matrix
The Info job SHALL compute and output a `pr_deploy_matrix` JSON array using the same structure as `production_deploy_matrix`, except an app entry SHALL be included when either the app itself OR its associated e2e project is in the affected projects list. This ensures e2e-only changes still trigger a preview deploy for the test target.

#### Scenario: Only ageorgedev e2e tests changed on PR
- **WHEN** `@ageorgedev/ageorgedev-e2e` is in the affected projects but `@ageorgedev/ageorgedev` is not
- **THEN** `pr_deploy_matrix` contains the site entry (to run e2e against a deployed preview)

#### Scenario: Only game-tools e2e tests changed on PR
- **WHEN** `@ageorgedev/game-tools-e2e` is in the affected projects but `@ageorgedev/game-tools` is not
- **THEN** `pr_deploy_matrix` contains the game-tools entry with `e2e_project` set to `@ageorgedev/game-tools-e2e`

#### Scenario: Game-tools app changed on PR
- **WHEN** `@ageorgedev/game-tools` is in the affected projects
- **THEN** `pr_deploy_matrix` contains the game-tools entry with `vercel_project_name` set to the resolved game-tools project name and `e2e_project` set to `@ageorgedev/game-tools-e2e`

#### Scenario: Neither game-tools nor its e2e changed on PR
- **WHEN** neither `@ageorgedev/game-tools` nor `@ageorgedev/game-tools-e2e` is in the affected projects
- **THEN** the game-tools entry is absent from `pr_deploy_matrix`

### Requirement: Info job removes is_hotfix and dead outputs
The Info job SHALL NOT output `is_hotfix`, `affected_base`, `affected_head`, or `should_preview_site`. These outputs SHALL be removed entirely.

#### Scenario: Info job output contract
- **WHEN** the Info workflow completes
- **THEN** its outputs are exactly: `affected_projects`, `should_run_e2e`, `should_deploy_site`, `should_deploy_design_system`, `pr_deploy_matrix`, `production_deploy_matrix`

### Requirement: Production workflow always runs tests
The production workflow SHALL run the tests job unconditionally on every push to main, with no `is_hotfix` condition.

#### Scenario: Direct push to main (former hotfix path)
- **WHEN** a commit is pushed directly to main without an associated PR
- **THEN** the tests job runs before any deploy job

#### Scenario: Normal merge to main
- **WHEN** a PR is merged to main
- **THEN** the tests job runs before any deploy job

### Requirement: Production workflow uses matrix for deploys
The production workflow SHALL use a single matrix deploy job driven by `fromJSON(needs.Info.outputs.production_deploy_matrix)` instead of hardcoded per-project jobs.

#### Scenario: Matrix is empty
- **WHEN** `production_deploy_matrix` is `[]`
- **THEN** the deploy job is skipped entirely

#### Scenario: Matrix has entries
- **WHEN** `production_deploy_matrix` contains one or more entries
- **THEN** one deploy job runs per entry in parallel

### Requirement: PR workflow uses matrix for previews
The PR workflow SHALL use a single matrix deploy job driven by `fromJSON(needs.Info.outputs.pr_deploy_matrix)` and SHALL NOT contain separate `Site_Preview`, `Design_System_Preview`, `Save_Site_Preview_URL`, or `Save_Design_System_Preview_URL` jobs.

#### Scenario: Matrix deploy posts PR comment
- **WHEN** the matrix deploy job runs in PR context
- **THEN** each matrix item posts a preview URL comment to the PR

### Requirement: Deploy reusable workflow accepts optional pull request number
The `deploy-vercel-project.yml` reusable workflow SHALL accept an optional `pull_request_number` string input. When provided and non-empty, the workflow SHALL post a comment to that PR with the deploy URL after deployment completes. When absent or empty, no comment SHALL be posted.

#### Scenario: PR preview deploy posts comment
- **WHEN** `pull_request_number` is provided and non-empty
- **THEN** a comment containing the preview URL is posted to that pull request

#### Scenario: Production deploy does not post comment
- **WHEN** `pull_request_number` is not provided
- **THEN** no PR comment is posted
