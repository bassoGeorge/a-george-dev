#!/bin/bash

ORG_NAME=lands-between
DB_NAME=ageorgedev
OPERATION=$1
DR_NUMBER=$2

if [ "$OPERATION" == "apply" ]; then
  echo "Applying DR $DR_NUMBER"
  COMPLETION_STATE="complete"
else if [ "$OPERATION" == "cancel" ]; then
  echo "Cancelling DR $DR_NUMBER"
  COMPLETION_STATE="complete_cancel"
else
  echo "Unknown operation: $OPERATION"
  exit 1
fi

# . ./ps-deploy-request-helper-functions.sh
pscale deploy-request $OPERATION "$DB_NAME" $DR_NUMBER --org "$ORG_NAME"

wait_output=$(waitForDeployRequestToCompleteProcessing $ORG_NAME $DB_NAME $DR_NUMBER)

if [ $? -ne 0]; then
  echo "Deploy request $DR_NUMBER failed to process: $wait_output"
  exit 1
fi

STATE=$(jq -r ".deployment.state" <<<"$OUTPUT")

if [ "$STATE" != "$COMPLETION_STATE" ]; then
  echo "Deploy request $DR_NUMBER is in a bad state. State: $STATE";
  exit 1
fi

echo "DR $DR_NUMBER completed";

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