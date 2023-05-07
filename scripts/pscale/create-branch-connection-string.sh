#!/bin/bash
# Creates a connection string for a branch

if [ -z $DB_NAME ] || [ -z $ORG_NAME ]; then
  echo "DB_NAME and ORG_NAME environment variables need to be set"
  exit 1
fi

BRANCH_NAME="$1"
ROLE="$2"

if [ -z $BRANCH_NAME ]; then
  echo "Branch name not provided"
  exit 1
fi

if [ "$ROLE" != "reader" ] && [ "$ROLE" != "writer" ] && [ "$ROLE" != "readwriter" ] && [ "$ROLE" != "admin" ]; then
  echo "Role must be reader, writer, readwriter or admin"
  exit 1
fi

lowercase_branch_name=$(tr '[:upper:]' '[:lower:]' <<<"$BRANCH_NAME")

passwordName="$lowercase_branch_name-$ROLE-ci-pass"

echo "Attempting to create new password named $passwordName for branch $BRANCH_NAME with role $ROLE..."

passwordSet=$(pscale password create "$DB_NAME" "$BRANCH_NAME" "$passwordName" --role "$ROLE" --org "$ORG_NAME" -f json)

if [ $? -ne 0 ]; then
  echo "Failed to create password for branch $BRANCH_NAME"
  exit 1
fi

username=$(jq -r '.username' <<<"$passwordSet")
password=$(jq -r '.plain_text' <<<"$passwordSet")
accessHostUrl=$(jq -r '.access_host_url' <<<"$passwordSet")

dbConnectionString="mysql://$username:$password@$accessHostUrl/$DB_NAME?sslaccept=strict"

echo "Created connection string for branch $BRANCH_NAME with role $ROLE"

if [ -n "$CI" ]; then
  echo "Setting environment variables for connection string..."
  echo "DB_BRANCH_CONNECTION_STRING=$dbConnectionString" >>$GITHUB_OUTPUT
else
  echo "Connection string: $dbConnectionString"
fi
