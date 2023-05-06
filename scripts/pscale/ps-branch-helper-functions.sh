#!/bin/bash

forceDeleteDbBranch() {
  local ORG_NAME=$1
  local DB_NAME=$2
  local BRANCH_NAME=$3

  pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME" >/dev/null 2>&1
}

createDbBranch() {
  local ORG_NAME=$1
  local DB_NAME=$2
  local BRANCH_NAME=$3

  creation_output=$(pscale branch create "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" --wait)

  # if branch creation fails, exit with error
  if [ $? -ne 0 ]; then
    exit 1
  fi

  echo "https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/${BRANCH_NAME}"
}

addBranchSecurityAndCreateConnectionString() {
  local ORG_NAME=$1
  local DB_NAME=$2
  local BRANCH_NAME=$3

  local passwordName="$BRANCH_NAME-ci-pass"
  local passwordSet=$(pscale password create "$DB_NAME" "$BRANCH_NAME" "$passwordName" --org "$ORG_NAME" -f json)
  local username=$(jq -r '.username' <<<"$passwordSet")
  local password=$(jq -r '.plain_text' <<<"$passwordSet")
  local accessHostUrl=$(jq -r '.access_host_url' <<<"$passwordSet")

  local dbConnectionString="mysql://$username:$password@$accessHostUrl/$DB_NAME?sslaccept=strict"

  echo "$dbConnectionString"
}
