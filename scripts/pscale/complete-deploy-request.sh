#!/bin/bash

if [ -z $DB_NAME ] || [ -z $ORG_NAME ]; then
  echo "DB_NAME and ORG_NAME environment variables need to be set"
  exit 1
fi

OPERATION=$1
DR_NUMBER=$2

if [ "$OPERATION" = "apply" ]; then
  echo "Applying DR $DR_NUMBER"
  COMPLETION_STATE="complete"
elif [ "$OPERATION" = "cancel" ]; then
  echo "Cancelling DR $DR_NUMBER"
  COMPLETION_STATE="complete_cancel"
else
  echo "Unknown operation: $OPERATION"
  exit 1
fi

if [ -z $DR_NUMBER ]; then
  echo "Deploy request number not provided"
  exit 1
fi

. ./ps-deploy-request-helper-functions.sh
pscale deploy-request $OPERATION "$DB_NAME" $DR_NUMBER --org "$ORG_NAME"

wait_output=$(waitForDeployRequestToCompleteProcessing $ORG_NAME $DB_NAME $DR_NUMBER)

if [ $? -ne 0 ]; then
  echo "Deploy request $DR_NUMBER failed to process: $wait_output"
  exit 1
fi

STATE=$(jq -r ".deployment.state" <<<"$wait_output")

if [ "$STATE" != "$COMPLETION_STATE" ]; then
  echo "Deploy request $DR_NUMBER is in a bad state. State: $STATE"
  exit 1
fi

echo "DR $DR_NUMBER completed"