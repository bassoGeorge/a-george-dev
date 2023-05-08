#!/bin/bash
# Deploy the given deploy request

if [ -z $DB_NAME ] || [ -z $ORG_NAME ]; then
  echo "DB_NAME and ORG_NAME environment variables need to be set"
  exit 1
fi

DR_NUMBER=$1

if [ -z $DR_NUMBER ]; then
  echo "Deploy request number not provided"
  exit 1
fi

. ./ps-deploy-request-helper-functions.sh
deployTheDeployRequest $ORG_NAME $DB_NAME $DR_NUMBER

wait_output=$(waitForDeployRequestToCompleteProcessing $ORG_NAME $DB_NAME $DR_NUMBER)

if [ $? -ne 0 ]; then
  echo "Deploy request $DR_NUMBER failed to process: $wait_output"
  exit 1
fi

STATE=$(jq -r ".deployment.state" <<<"$wait_output")

if [ "$STATE" != "pending_cutover" ]; then
  echo "Deploy request $DR_NUMBER is in a bad state. State: $STATE";
  exit 1
fi

echo "Successfully deployed DR $DR_NUMBER. Apply when site is deployed";