# Spec: Graceful Empty Matrix Handling

## Requirement: Deploy job skips when no projects are affected
The CI `Deploy` job SHALL be skipped (not failed) when the computed deploy matrix contains no projects.

### Scenario: PR with no deployable projects affected
- **WHEN** a pull request triggers the PR workflow and `pr_deploy_matrix` is `[]`
- **THEN** the `Deploy` job is skipped with status `skipped` and the workflow completes successfully

### Scenario: Push to main with no deployable projects affected
- **WHEN** a push to `main` triggers the production workflow and `production_deploy_matrix` is `[]`
- **THEN** the `Deploy` job is skipped with status `skipped` and the workflow completes successfully

## Requirement: Deploy job runs normally when projects are affected
The CI `Deploy` job SHALL run for each project in the matrix when the matrix is non-empty.

### Scenario: PR with one or more deployable projects affected
- **WHEN** a pull request triggers the PR workflow and `pr_deploy_matrix` contains one or more entries
- **THEN** the `Deploy` job runs once per matrix entry and the workflow completes as before
