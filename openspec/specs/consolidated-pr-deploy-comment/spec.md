## Purpose

Consolidates all per-project preview deploy URLs for a PR into a single, continuously-updated comment instead of one comment per project.

## Requirements

### Requirement: Matrix deploy jobs relay their URL via artifact
Each matrix `Deploy` job in the PR workflow SHALL upload a JSON artifact containing the deployed preview URL and project label after the deploy step completes, keyed by run ID to avoid cross-run collisions. The upload SHALL occur regardless of whether subsequent steps (e.g. e2e tests) succeed or fail.

#### Scenario: Successful deploy uploads artifact
- **WHEN** a matrix `Deploy` job completes its deploy step successfully and produces a `deploy_url` output
- **THEN** a JSON artifact named `deploy-url-<run_id>-<project>` is uploaded containing `{ "label": "<friendly name>", "url": "<deploy_url>" }`

#### Scenario: Artifact scoped to run ID
- **WHEN** two PRs trigger the workflow concurrently
- **THEN** artifacts from each run do not collide because the run ID is part of the artifact name

#### Scenario: Artifact uploaded even when e2e fails
- **WHEN** the deploy step succeeds but the subsequent e2e step fails
- **THEN** the JSON artifact is still uploaded so that the deploy URL appears in the consolidated comment

### Requirement: Finish job marks previous comment outdated and posts a new one
After all matrix `Deploy` jobs complete, the `Finish` job SHALL download all `deploy-url-<run_id>-*` artifacts for the current run, then: (1) if a prior `<!-- pr-deploy-urls -->` comment exists, update it to replace the marker with `<!-- pr-deploy-urls-outdated -->` and prepend a `~~Outdated~~` line; (2) post a new comment with the current run's URLs and the `<!-- pr-deploy-urls -->` marker. The `Finish` job SHALL NOT update a prior comment in-place with new URLs.

#### Scenario: First run on a PR
- **WHEN** the `Finish` job runs and no prior preview comment exists
- **THEN** a single new comment is posted with the current URLs and the `<!-- pr-deploy-urls -->` marker

#### Scenario: Subsequent push to same PR
- **WHEN** the `Finish` job runs and a prior `<!-- pr-deploy-urls -->` comment exists
- **THEN** that prior comment is updated to use the `<!-- pr-deploy-urls-outdated -->` marker and is prepended with `~~Outdated~~`
- **THEN** a new comment is posted with the current run's URLs and the `<!-- pr-deploy-urls -->` marker

#### Scenario: No deploys occur
- **WHEN** the `Deploy` matrix is empty and no `Deploy` jobs run
- **THEN** the `Finish` job is skipped and no comment is posted or modified

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

### Requirement: Cleanup workflow extracts URLs from all preview comments
When a PR is closed, the cleanup workflow SHALL find every comment whose body includes `<!-- pr-deploy-urls -->` or `<!-- pr-deploy-urls-outdated -->`, extract all URLs matching the `- **<label>**: <url>` pattern across all such comments, deduplicate, and pass the full list to the Vercel CLI for removal.

#### Scenario: PR closed after multiple pushes
- **WHEN** a PR is closed and multiple preview comments exist (one current, several outdated)
- **THEN** URLs from all preview comments are collected and all corresponding Vercel deployments are removed

#### Scenario: PR closed with only a current comment
- **WHEN** a PR is closed and only a single `<!-- pr-deploy-urls -->` comment exists
- **THEN** all URLs in that comment are removed

#### Scenario: PR closed with no preview comments
- **WHEN** a PR is closed and no comment contains either preview marker
- **THEN** the cleanup workflow exits without error and no Vercel remove calls are made

#### Scenario: Duplicate URLs across comments
- **WHEN** the same URL appears in more than one preview comment
- **THEN** `vercel remove` is called for that URL only once
