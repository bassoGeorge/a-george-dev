## 1. Update Info Workflow

- [x] 1.1 Remove the `is_hotfix` step and its `is_hotfix` output from `info.yml`
- [x] 1.2 Remove dead outputs `affected_base`, `affected_head`, and `should_preview_site` from `info.yml`
- [x] 1.3 Add a shell step that computes `production_deploy_matrix` JSON using `jq`, driven by `should_deploy_site` and `should_deploy_design_system`, with `vercel_project_name` resolved from `vars`
- [x] 1.4 Add a shell step that computes `pr_deploy_matrix` JSON, identical to production matrix except the site entry is included when `should_deploy_site || should_run_e2e`
- [x] 1.5 Declare `production_deploy_matrix` and `pr_deploy_matrix` as workflow-level outputs in `info.yml`

## 2. Update Deploy Reusable Workflow

- [x] 2.1 Add optional `pull_request_number` string input (default empty) to `deploy-vercel-project.yml`
- [x] 2.2 Add a conditional step at the end of the deploy job that posts a PR comment with the deploy URL when `inputs.pull_request_number != ''`

## 3. Update Production Workflow

- [x] 3.1 Remove the `if` condition from `Run_Tests` so tests always run after `Info`
- [x] 3.2 Remove the four hardcoded deploy jobs: `Deploy_Hotfix_Site`, `Deploy_Hotfix_Design_System`, `Deploy_Site`, `Deploy_Design_System`
- [x] 3.3 Add a single matrix deploy job using `fromJSON(needs.Info.outputs.production_deploy_matrix)`, calling `deploy-vercel-project.yml` with `production: true` and matrix-supplied `VERCEL_PROJECT_NAME` and `e2e_project`

## 4. Update PR Workflow

- [x] 4.1 Remove the `Site_Preview` and `Design_System_Preview` jobs from `pull-request.yml`
- [x] 4.2 Remove the `Save_Site_Preview_URL` and `Save_Design_System_Preview_URL` jobs
- [x] 4.3 Add a single matrix deploy job using `fromJSON(needs.Info.outputs.pr_deploy_matrix)`, calling `deploy-vercel-project.yml` with `production: false`, matrix-supplied inputs, and `pull_request_number: ${{ github.event.pull_request.number }}`
