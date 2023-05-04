#!/bin/bash

. ./ps-deploy-request-helper-functions.sh
OUTPUT=$(waitForDeployRequestToCompleteProcessing lands-between ageorgedev $1)

echo $OUTPUT;
