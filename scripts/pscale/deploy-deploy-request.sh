#!/bin/bash

ORG_NAME=lands-between
DB_NAME=ageorgedev
DR_NUMBER=$1

. ./ps-deploy-request-helper-functions.sh
triggerDeployRequest $ORG_NAME $DB_NAME $DR_NUMBER

wait_output=$(waitForDeployRequestToCompleteProcessing $ORG_NAME $DB_NAME $DR_NUMBER)

if [ $? -ne 0]; then
  echo "Deploy request $DR_NUMBER failed to process: $wait_output"
  exit 1
fi

STATE=$(jq -r ".deployment.state" <<<"$OUTPUT")

if [ "$STATE" != "pending_cutover" ]; then
  echo "Deploy request $DR_NUMBER is in a bad state. State: $STATE";
  exit 1
fi

echo "Successfully deployed DR $DR_NUMBER. Apply when site is deployed";

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
