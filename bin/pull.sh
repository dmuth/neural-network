#!/bin/bash

# Errors are fatal
set -e

#
# Change to the parent of this script
#
pushd $(dirname $0) > /dev/null
cd ..

echo "# "
echo "# Pulling containers from Docker Hub..."
echo "# "
docker pull dmuth1/nodejs-neural-network

echo "# "
echo "# Tagging containers..."
echo "# "
docker tag dmuth1/nodejs-neural-network nodejs-neural-network


echo "# Done!"

