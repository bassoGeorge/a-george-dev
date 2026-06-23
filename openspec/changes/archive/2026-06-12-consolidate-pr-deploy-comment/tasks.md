## 1. Update info.yml matrix entries

- [x] 1.1 Add a `label` field to each matrix entry in the `Compute PR deploy matrix` step in `info.yml` (e.g. `"ageorge.dev"` for the site project, `"Design System"` for design-docs)

## 2. Update deploy-vercel-project.yml

- [x] 2.1 Remove the `pull_request_number` input declaration from `deploy-vercel-project.yml`
- [x] 2.2 Remove the "Post preview URL comment" step from `deploy-vercel-project.yml`
- [x] 2.3 Add an artifact upload step that writes `{ "label": "<project_label>", "url": "<deploy_url>" }` to a JSON file and uploads it as `deploy-url-${{ github.run_id }}-${{ inputs.VERCEL_PROJECT_NAME }}`

## 3. Update pull-request.yml

- [x] 3.1 Remove `pull_request_number` from the `with:` block of the `Deploy` matrix job
- [x] 3.2 Remove the `pull-requests: write` permission from the `Deploy` job (it moves to `Finish`)
- [x] 3.3 Add a `Finish` job with `needs: [Deploy, Info]` and `if: always() && needs.Deploy.result != 'skipped'`
- [x] 3.4 Give the `Finish` job `pull-requests: write` permission
- [x] 3.5 In the `Finish` job, add a step to download all artifacts matching `deploy-url-${{ github.run_id }}-*`
- [x] 3.6 In the `Finish` job, add a `github-script` step that reads all downloaded artifact JSON files, builds the formatted comment body (with `<!-- pr-deploy-urls -->` marker and labelled URL list), and uses `find-or-create-comment` logic to update the PR comment in-place

## 4. Verify

- [ ] 4.1 Open a test PR that affects both `ageorgedev` and `design-docs` and confirm a single consolidated comment appears with both URLs
- [ ] 4.2 Push another commit to the same PR and confirm the existing comment is updated rather than a new one created
- [x] 4.3 Confirm `production.yml` still runs cleanly (no `pull_request_number` reference)
