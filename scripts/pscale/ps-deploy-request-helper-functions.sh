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

    echo "Checking if deploy request $drNumber is ready for use..."
    while true; do
        # declaration needs to be separate. apparently, if you do it in one line, it will return the exit code of local which is always 0
        local raw_output
        raw_output=$(pscale deploy-request show "$DB_NAME" $drNumber --org "$ORG_NAME" -f json 2>&1)

        # check return code, if not 0 then error
        if [ $? -ne 0 ]; then
            echo "Error: pscale deploy-request show $drNumber returned non-zero exit code $?: $raw_output"
            return 1
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

            echo "Deploy-request $drNumber is in process. Current status: $drState"
            echo "Retrying in $wait seconds..."
            sleep $wait
        elif [ "$drState" = "ready" ]; then
            echo "Deploy-request $drNumber is ready. Edit and deploy now" ]
            return 0
        elif [ "$drState" = "no_changes" ]; then
            echo "Deploy-request $drNumber has no changes. We can close it off" ]
            return 0
        elif [ "$drState" = "pending_cutover" ]; then
            echo "Deploy-request $drNumber is gated and ready. Apply or cancel it."
            return 0
        elif [ "$drState" = "complete" ] || [ "$drState" = "complete_pending_revert" ]; then
            echo "Deploy-request $drNumber has been deployed successfully."
            return 0
        elif [ "$drState" = "complete_cancel" ]; then
            echo "Deploy-request $drNumber is cancelled" ]
            return 0
        else
            echo "Deploy-request $drNumber with unknown status: $drState"
            return 3
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
