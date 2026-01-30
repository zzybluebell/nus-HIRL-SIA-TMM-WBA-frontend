#!/bin/bash

# Variables
SERVER_USER='ubuntu'
SERVER_IP='www.getwellnessbuddy.com'
REMOTE_PATH='/home/ubuntu'
LOCAL_PATH='./build'
DATE_SUFFIX=$(date "+%d %b %Y at %-I-%M-%S %p")  # e.g., "29 Jan 2024 at 4-26-31 PM"
REMOTE_BUILD_PATH="$REMOTE_PATH/build"

# Command to check and rename existing build directory on remote server
ssh $SERVER_USER@$SERVER_IP "
if [ -d '$REMOTE_BUILD_PATH' ]; then
    mv '$REMOTE_BUILD_PATH' '${REMOTE_BUILD_PATH} ($DATE_SUFFIX)'
fi
"

# Command to copy build folder to remote server
scp -r $LOCAL_PATH $SERVER_USER@$SERVER_IP:$REMOTE_PATH

echo "Build folder has been copied successfully."
