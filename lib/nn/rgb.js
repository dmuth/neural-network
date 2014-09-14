/**
* This module is a wrapper for our neural network that is RGB-specific.
*/

var nn = require("./index");

//
// Passthrough to our neural network
//
exports.clear = nn.clear;
exports.train = nn.train;
exports.length = nn.length;
exports.numTrained = nn.numTrained;


/**
* This function turns our RGB values to values between 0 and 1 and 
* sends them off to the neural net.
*
* @param {object} input An array of r, g, and b values in hexadecimal 
*	format between 00 and FF.
*
* @param {object} output Whatever our output value is expected to be.
*/
exports.add = function(input, output) {

	//
	// Turn our colors back from hexadecimal into base 10, then reduce to a 
	// value between zero and 1.
	//
	var colors = {};
	colors.r = parseInt(input.r, 16) / 255;
	colors.g = parseInt(input.g, 16) / 255;
	colors.b = parseInt(input.b, 16) / 255;

	nn.add(colors, output);

} // End of add()


/**
* Run our input through the (hopefully) trained neural network.
*/
exports.guess = function(input) {

	var colors = {};
	colors.r = parseInt(input.r, 16) / 255;
	colors.g = parseInt(input.g, 16) / 255;
	colors.b = parseInt(input.b, 16) / 255;

	var retval = nn.guess(colors);

	return(retval);

} // End of ouess()


