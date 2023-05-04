#!/bin/bash

waitForDeployRequestToCompleteProcessing() {
  local ORG_NAME=$1
  local DB_NAME=$2
  local drNumber=$3

  if [ -z $4 ]; then
    local retries=10
  else
    local retries=$4
  fi

  # check whether fifth parameter is set, otherwise use default value
  if [ -z "$5" ]; then
    local max_timeout=600
  else
    local max_timeout=$5
  fi

  local count=0
  local wait=1

  while true; do
    # declaration needs to be separate. apparently, if you do it in one line, it will return the exit code of local which is always 0
    local raw_output
    raw_output=$(pscale deploy-request show "$DB_NAME" $drNumber --org "$ORG_NAME" -f json)

    # check return code, if not 0 then error
    if [ $? -ne 0 ]; then
      return 1
      # The stderr from previous command anyway gets shown on screen
    fi

    # local drState=`echo $raw_output | jq ".[] | select(.drNumber == $drNumber) | .deployment.state"`
    local drState=$(jq -r ".deployment.state" <<<"$raw_output")

    # test whether drState is pending, if so, increase wait timeout exponentially
    if [ "$drState" = "pending" ] || [ "$drState" = "submitting" ] || [ "$drState" = "in_progress" ] || [ "$drState" = "in_progress_cutover" ]; then
      # increase wait variable exponentially but only if it is less than max_timeout
      if [ $((wait * 2)) -le $max_timeout ]; then
        wait=$((wait * 2))
      else
        wait=$max_timeout
      fi

      count=$((count + 1))
      if [ $count -ge $retries ]; then
        echo "Deploy request $drNumber is not ready after $retries retries. Exiting..."
        return 2
      fi

      sleep $wait
    else
        # jq "{ requestState: .state, approved, state: .deployment.state, deployable: .deployment.deployable }" <<<"$raw_output"
        echo $raw_output
        return 0
    fi
  done
}

# NOTES
# There is a status of the overall DR. OPEN | CLOSED

# For auto-approve flow
# [create] -> pending -> ready -> [deploy] -> submitting -> in_progress -> in_progress_cutover -> complete (closed)
# [create] -> pending -> no_changes -> [close] -> no_changes (closed)
# [create] -> pending -> ready -> [close] -> ready (closed)

# For gated, we have options
# [create] -> pending -> ready -> [edit] -> ready -> [deploy] -> submitting -> in_progress -> pending_cutover -> [cancel] -> complete_cancel (closed)
# [create] -> pending -> ready -> [edit] -> ready -> [deploy] -> submitting -> in_progress -> pending_cutover -> [apply] -> in_progress_cutover -> complete (closed)

# Stable states:
# ready | no_changes         (possible with closed)
# pending_cutover
# complete | complete_cancel (possible with closed)
