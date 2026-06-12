## Why

The recent change to consolidate PR preview deploy comments introduced three regressions: the consolidated comment sometimes shows incomplete URLs (only one project instead of all deployed); the existing PR cleanup workflow is broken because it relies on a comment format that no longer exists; and the in-place comment update strategy silently discards old preview URLs — each new push overwrites the comment, so those old Vercel deployments are never expired when the PR closes.

## What Changes

- Add `if: always()` guard to the deploy URL artifact upload steps in `deploy-vercel-project.yml`, so the artifact is uploaded even when e2e tests fail or are skipped
- Change the `Finish` job from update-in-place to **mark-old-as-outdated + post-new**: when a prior preview comment exists, update it to mark it as outdated (visually and via marker), then always post a fresh comment for the current run's URLs
- Update the cleanup workflow (`merge-pull-request.yml`) to sweep all preview comments — both current (`<!-- pr-deploy-urls -->`) and outdated (`<!-- pr-deploy-urls-outdated -->`) — extracting every URL across all of them for Vercel removal

## Capabilities

### New Capabilities

*(none)*

### Modified Capabilities

- `consolidated-pr-deploy-comment`: Artifact upload runs unconditionally; `Finish` job marks previous comment outdated and posts new one instead of updating in-place; cleanup targets all preview comments (current and outdated)

## Impact

- `.github/workflows/deploy-vercel-project.yml` — artifact upload steps
- `.github/workflows/pull-request.yml` — `Finish` job comment posting logic
- `.github/workflows/merge-pull-request.yml` — URL extraction and multi-comment sweep
