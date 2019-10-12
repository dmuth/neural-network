#!/bin/bash
#
# Our entrypoint script.
#

# Errors are fatal
set -e

ARG=$1

if test "$ARG" == "bash"
then
	echo "# "
	echo "# Spawning an interactive bash shell in /mnt..."
	echo "# "
	echo "# To run ther dev copy of the webserver, enter this command: "
	echo "# "
	echo "# npm start "
	echo "# "

	cd /mnt
	exec /bin/bash
fi

# TODO: Default action goes here. :-)  Probably npm start

