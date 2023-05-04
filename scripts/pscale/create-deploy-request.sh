#!/bin/bash

ORG_NAME=lands-between
DB_NAME=ageorgedev


. ./ps-deploy-request-helper-functions.sh

DR_NUMBER=$(createDeployRequest $ORG_NAME $DB_NAME dr-test)
echo "Submitted deploy request number: $DR_NUMBER"

OUTPUT=$(waitForDeployRequestToCompleteProcessing $ORG_NAME $DB_NAME $DR_NUMBER)
STATE=$(jq -r ".deployment.state" <<<"$OUTPUT")
echo "Deploy request $DR_NUMBER is done with processing. State: $STATE"

# echo $OUTPUT;
