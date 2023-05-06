#!/bin/bash

if [ -z $DB_NAME ] || [ -z $ORG_NAME ]; then
  echo "DB_NAME and ORG_NAME environment variables need to be set"
  exit 1
fi

BRANCH_NAME="$1"

if [ -z $BRANCH_NAME ]; then
  echo "Branch name not provided"
  exit 1
fi

number_of_diffs=$(pscale branch diff "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" -f json | jq "length")

if [ "$number_of_diffs" -eq 0 ]; then
  echo "Branch $BRANCH_NAME has no diffs against parent, no need to create deploy request";
  if [ -n "$CI" ]; then
    echo "create_dr=false" >>$GITHUB_OUTPUT
  fi
else
  echo "Branch $BRANCH_NAME has diffs against parent, should create deploy request";
  if [ -n "$CI" ]; then
    echo "create_dr=true" >>$GITHUB_OUTPUT
  fi
fi
