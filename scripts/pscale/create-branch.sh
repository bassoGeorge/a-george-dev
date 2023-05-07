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
pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME" >/dev/null 2>&1

echo "Creating branch $BRANCH_NAME..."
pscale branch create "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" --wait