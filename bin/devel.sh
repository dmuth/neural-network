#!/bin/bash

# Errors are fatal
set -e

#
# Change to the parent of this script
#
pushd $(dirname $0) > /dev/null
cd ..

./bin/build.sh

echo "# "
echo "# Running Docker container with interactive bash shell..."
echo "# "
docker run -p3000:3000 -v $(pwd):/mnt -it nodejs-neural-network bash

