#!/bin/bash
#
# Loop forever running the webserver.
# Useful for development, because I can just hit ^C, and changes will be loaded.
#

while true
do
	npm start
	echo "Sleeping for 1 second... "
	sleep 1
done


