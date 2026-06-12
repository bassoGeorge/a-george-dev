## ADDED Requirements

### Requirement: Matrix deploy jobs relay their URL via artifact
Each matrix `Deploy` job in the PR workflow SHALL upload a JSON artifact containing the deployed preview URL and project label after a successful deploy, keyed by run ID to avoid cross-run collisions.

#### Scenario: Successful deploy uploads artifact
- **WHEN** a matrix `Deploy` job completes successfully and produces a `deploy_url` output
- **THEN** a JSON artifact named `deploy-url-<run_id>-<project>` is uploaded containing `{ "label": "<friendly name>", "url": "<deploy_url>" }`

#### Scenario: Artifact scoped to run ID
- **WHEN** two PRs trigger the workflow concurrently
- **THEN** artifacts from each run do not collide because the run ID is part of the artifact name

### Requirement: Finish job collects all deploy URLs and posts a consolidated PR comment
After all matrix `Deploy` jobs complete, a `Finish` job SHALL download all `deploy-url-<run_id>-*` artifacts, parse them, and post a single consolidated PR comment containing all preview URLs labelled by project name.

#### Scenario: All deploys succeed
- **WHEN** all matrix `Deploy` jobs complete successfully
- **THEN** the `Finish` job posts (or updates) a single PR comment listing every preview URL with its project label

#### Scenario: Comment is updated on re-run
- **WHEN** the workflow is re-triggered on the same PR (e.g. a new commit is pushed)
- **THEN** the existing bot comment is found via its hidden marker and updated in-place, rather than a new comment being created

#### Scenario: Partial deploy failure
- **WHEN** one or more matrix `Deploy` jobs fail and do not upload an artifact
- **THEN** the `Finish` job posts a comment containing only the URLs that were successfully collected, without erroring out

#### Scenario: No deploys occur
- **WHEN** the `Deploy` matrix is empty and no `Deploy` jobs run
- **THEN** the `Finish` job is skipped and no comment is posted

### Requirement: PR comment format includes labelled URLs
The consolidated PR comment SHALL use a Markdown list with each entry labelled by a human-readable project name, and SHALL include a hidden HTML marker to enable find-and-replace on re-runs.

#### Scenario: Comment structure
- **WHEN** the `Finish` job builds the comment body
- **THEN** the comment begins with `<!-- pr-deploy-urls -->` followed by a `## Preview deployments` heading and a bullet list of `**<label>**: <url>` entries

### Requirement: Reusable deploy workflow no longer posts PR comments
The `deploy-vercel-project.yml` reusable workflow SHALL NOT post any PR comment and SHALL NOT accept a `pull_request_number` input.

#### Scenario: Deploy workflow called without PR comment side-effect
- **WHEN** `deploy-vercel-project.yml` completes a deploy
- **THEN** no PR comment is created by that workflow

#### Scenario: Removed input does not break production workflow
- **WHEN** `production.yml` calls `deploy-vercel-project.yml`
- **THEN** the workflow runs successfully without providing a `pull_request_number` input
