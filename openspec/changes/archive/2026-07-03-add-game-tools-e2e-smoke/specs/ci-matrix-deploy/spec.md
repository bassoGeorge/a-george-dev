## MODIFIED Requirements

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

---

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
