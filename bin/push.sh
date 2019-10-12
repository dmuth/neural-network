#!/bin/bash

# Errors are fatal
set -e

#
# Change to the parent of this script
#
pushd $(dirname $0) > /dev/null
cd ..

echo "# "
echo "# Tagging containers..."
echo "# "
docker tag nodejs-neural-network dmuth1/nodejs-neural-network

echo "# "
echo "# Pushing container to Docker Hub..."
echo "# "
docker push dmuth1/nodejs-neural-network


echo "# Done!"

