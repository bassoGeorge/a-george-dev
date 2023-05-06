#!/bin/bash
# Create a deploy request on planetscale for the given branch

if [ -z $DB_NAME ] || [ -z $ORG_NAME ]; then
  echo "DB_NAME and ORG_NAME environment variables need to be set"
  exit 1
fi

BRANCH_NAME=$1

if [ -z $BRANCH_NAME ]; then
  echo "Branch name not provided"
  exit 1
fi

. ./ps-deploy-request-helper-functions.sh

DR_NUMBER=$(createDeployRequest $ORG_NAME $DB_NAME $BRANCH_NAME)
echo "Submitted deploy request number: $DR_NUMBER"

wait_output=$(waitForDeployRequestToCompleteProcessing $ORG_NAME $DB_NAME $DR_NUMBER)

if [ $? -ne 0 ]; then
  echo "Deploy request $DR_NUMBER failed to process: $wait_output"
  exit 1
fi

STATE=$(jq -r ".deployment.state" <<<"$wait_output")
DEPLOYABLE=$(jq -r ".deployment.deployable" <<<"$wait_output")

if [ "$DEPLOYABLE" = "false" ]; then
  echo "Deploy request $DR_NUMBER is not deployable. State: $STATE"
  exit 1
fi

echo "Deploy request $DR_NUMBER is done with processing. State: $STATE"

if [ "$STATE" = "no_changes" ]; then
  echo "Closing deploy request since there are no changes..."
  pscale deploy-request close "$DB_NAME" $DR_NUMBER --org "$ORG_NAME"
fi

if [ -n "$CI" ]; then
  if [ "$STATE" = "no_changes" ]; then
    echo "continue_dr=false" >>$GITHUB_OUTPUT
  else
    echo "DR_NUMBER=$DR_NUMBER" >>$GITHUB_OUTPUT
    echo "continue_dr=true" >>$GITHUB_OUTPUT
  fi
fi

# Logic
# if there is an error OR if DR is not deployable, we bail out
# else if state is no_changes, we can close the DR and ignore DR for the rest of the pipeline
# if state is ready,
#   We can deploy the DR
#     if state is not pending_cutover, we bail out
#     else we can deploy site to production
#         if site successfully deploys, we apply the DR
#         else we cancel the DR

# We should do the deploy step as a separate script
