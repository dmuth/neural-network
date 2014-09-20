/**
* This module is a wrapper for guessing logic, as it runs the guess
* and computes a percentage.
*/		


var nn = require("../nn/rgb");


/**
* Main entry point.
*
* @param {object} input Our object of red, green, and blue values.
*
* @return {object} Our guess, along with percentage values and labels.
*/
exports.go = function go(input) {

	var retval = {};

	retval.red_guess = nn.guess(input).red;
	retval.percent = Math.floor(retval.red_guess * 100);

	//
	// Set a default width so that we'll have a reasonable size for the bar
	//
	retval.percent_width = 15;

	//
	// Default type is red
	//
	retval.percent_type = "danger";

	if (retval.percent >= 90) {
		retval.percent_type = "success";

	} else if (retval.percent >= 75) {
		retval.percent_type = "warning";

	}

	//
	// This ensures a minimum percentage width
	//
	if (retval.percent > retval.percent_width) {
		retval.percent_width = retval.percent;
	}

	return(retval);

} // End of go()


