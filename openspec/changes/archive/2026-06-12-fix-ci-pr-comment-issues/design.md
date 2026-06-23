## Context

The `consolidate-pr-deploy-comment` change restructured CI so that each deploy job uploads a JSON artifact, and a `Finish` job assembles them into a single PR comment. Three bugs exist:

1. **Incomplete comment**: `deploy-vercel-project.yml` artifact upload steps only run when all prior steps succeed. For the site project (`ageorge.dev`), e2e runs before the upload. If e2e fails (or is flaky), the upload is skipped and the site URL never appears in the consolidated comment.

2. **Broken cleanup**: `merge-pull-request.yml` uses `comment.body.match(/Preview URL: (https?:\/\/\S+)/)` — the old single-URL comment format. The new consolidated comment uses `- **Label**: <url>` per entry, so zero URLs are extracted and Vercel previews are never cleaned up.

3. **Leaked old deployments**: The `Finish` job updates the consolidated comment in-place on every run. Each push produces new Vercel deployments, but the previous run's URLs are silently overwritten in the comment. When the PR closes, the cleanup only sees the latest comment — all earlier preview deployments are never expired.

## Goals / Non-Goals

**Goals:**
- Deploy URL artifact is uploaded regardless of e2e outcome
- Each push accumulates a new preview comment; old ones are visually marked outdated so the history is legible
- Cleanup workflow expires ALL preview URLs across all runs — current and outdated comments — when the PR closes

**Non-Goals:**
- Changing how or when e2e runs
- Cleaning up previews for failed deploys where no URL was produced (out of scope)

## Decisions

### 1. Unconditional artifact upload

**Decision**: Add `if: always() && inputs.label != '' && !inputs.production` to both the `echo` (write JSON) and `actions/upload-artifact` steps.

**Why `always()`**: GitHub Actions skips all subsequent steps by default when any step in the job fails. The e2e step can fail on a flaky test while the deploy itself succeeded; the URL should still be captured.

**Alternative considered**: Run e2e in a separate downstream job. Rejected — would require significant workflow restructure and is out of scope.

### 2. Mark-old-as-outdated + post-new instead of update-in-place

**Decision**: When the `Finish` job finds an existing `<!-- pr-deploy-urls -->` comment, it:
1. Updates that comment in-place to replace the marker with `<!-- pr-deploy-urls-outdated -->` and prepend a `~~Outdated~~` header line
2. Posts a brand-new comment with the current run's URLs and the fresh `<!-- pr-deploy-urls -->` marker

**Why not update-in-place**: Updating in-place overwrites the previous URLs, causing those Vercel deployments to be invisible to the cleanup step. Keeping outdated comments (with a distinct marker) means the cleanup can always find the full set of URLs to expire.

**Why a distinct marker**: Using `<!-- pr-deploy-urls-outdated -->` lets the cleanup workflow sweep both current and outdated comments with two targeted queries, while avoiding false positives from unrelated PR comments.

**Alternative considered**: Store all historic URLs in a single growing comment. Rejected — the comment becomes hard to read and the format complexity is not worth the benefit over separate timestamped entries.

### 3. Cleanup sweeps all preview comment markers

**Decision**: `merge-pull-request.yml` queries all PR comments, collects every comment whose body includes either `<!-- pr-deploy-urls -->` or `<!-- pr-deploy-urls-outdated -->`, extracts all `- **<label>**: <url>` entries from each, and passes the full deduplicated list to `vercel remove`.

```js
const MARKERS = ['<!-- pr-deploy-urls -->', '<!-- pr-deploy-urls-outdated -->'];
const previewComments = comments.filter(c => MARKERS.some(m => c.body.includes(m)));
const urls = previewComments.flatMap(c =>
  [...c.body.matchAll(/- \*\*[^*]+\*\*: (https?:\/\/\S+)/g)].map(m => m[1])
);
const unique = [...new Set(urls)];
```

**Why target the marker**: Avoids false positives from other comments that might contain URLs.

## Risks / Trade-offs

- **e2e failures visible in comment**: If e2e fails but the URL is still posted, the comment contains a URL for a deployment that failed its smoke tests. Acceptable — the CI status check on the e2e job signals the failure clearly.
- **Outdated comment accumulation**: Long-lived PRs with many pushes will accumulate several outdated comments. Acceptable — they're clearly labelled and the current one is always at the bottom. Could be revisited if it becomes noisy.
- **Regex brittleness on cleanup**: URL extraction depends on the `- **Label**: <url>` format. If the `Finish` job template ever changes, the cleanup regex must change too. Mitigation: both live in the same file; changes are co-located.

## Migration Plan

All three changes are self-contained YAML / script edits. No staged rollout needed — the fix takes effect on the next PR that triggers the workflow.

Rollback: revert the three file edits; old behaviour is restored immediately. Note: any outdated comments left on open PRs will remain but cause no harm — the cleanup will simply find no matching markers from the new format.

## Open Questions

*(none)*
