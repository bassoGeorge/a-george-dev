#!/bin/bash
# This script creates a new planet scale branch given the name

if [ -z $DB_NAME ] || [ -z $ORG_NAME ]; then
  echo "DB_NAME and ORG_NAME environment variables need to be set"
  exit 1
fi

BRANCH_NAME="$1"

if [ -z $BRANCH_NAME ]; then
  echo "Branch name not provided"
  exit 1
fi

. ./ps-branch-helper-functions.sh
echo "Deleting branch $BRANCH_NAME if it already exists..."
forceDeleteDbBranch "$ORG_NAME" "$DB_NAME" "$BRANCH_NAME"

echo "Creating branch $BRANCH_NAME..."
branch_url=$(createDbBranch "$ORG_NAME" "$DB_NAME" "$BRANCH_NAME")

if [ $? -ne 0 ]; then
  echo "Failed to create branch $BRANCH_NAME"
  exit 1
fi

echo "Successfully created branch $BRANCH_NAME"
echo "Generating password and connection string..."

connection_string=$(addBranchSecurityAndCreateConnectionString "$ORG_NAME" "$DB_NAME" "$BRANCH_NAME")

if [ $? -ne 0 ]; then
  echo "Failed to generate connection string for branch $BRANCH_NAME"
  exit 1
fi

echo "Successfully generated connection string for branch $BRANCH_NAME"

if [ -n "$CI" ]; then
  echo "Setting environment variables for branch url and connection string..."
  echo "DB_BRANCH_URL=$branch_url" >>$GITHUB_OUTPUT
  echo "DB_BRANCH_CONNECTION_STRING=$connection_string" >>$GITHUB_OUTPUT
fi