## 1. Fix artifact upload gating in deploy workflow

- [x] 1.1 In `.github/workflows/deploy-vercel-project.yml`, add `if: always() && inputs.label != '' && !inputs.production` to the `echo` step that writes `deploy-url.json`
- [x] 1.2 Add the same `if: always() && inputs.label != '' && !inputs.production` condition to the `actions/upload-artifact` step that follows

## 2. Change Finish job from update-in-place to mark-outdated + post-new

- [x] 2.1 In the `Finish` job script (`.github/workflows/pull-request.yml`), after collecting artifact entries, find any existing comment whose body includes `<!-- pr-deploy-urls -->`
- [x] 2.2 If such a comment exists, update it: replace `<!-- pr-deploy-urls -->` with `<!-- pr-deploy-urls-outdated -->` and prepend `~~Outdated~~\n\n` to the body
- [x] 2.3 Always post a new comment with the current run's URLs using the `<!-- pr-deploy-urls -->` marker (remove the existing `updateComment` branch — always `createComment`)

## 3. Fix cleanup workflow to sweep all preview comments

- [x] 3.1 In `.github/workflows/merge-pull-request.yml`, replace the per-comment `Preview URL:` regex with logic that: (a) filters all PR comments to those containing `<!-- pr-deploy-urls -->` or `<!-- pr-deploy-urls-outdated -->`, (b) extracts all `- **<label>**: <url>` URLs from each matched comment, and (c) deduplicates the result
- [x] 3.2 Update the `vercel remove` step to iterate over the deduplicated URL array (which may now contain URLs from multiple comments)
