#!/bin/sh

# This script creates a new planet scale branch given the name

BRANCH_NAME="$1"

. ps-create-helper-functions.sh
create-db-branch "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "recreate"