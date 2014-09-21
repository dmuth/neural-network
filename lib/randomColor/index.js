/**
* This module is used to generate random colors.
*/


/**
* This function returns a color code along with its constituent colors.
*
* @param {integer} in_multiple Round the individual values to the 
*	next highested multiple - 1. For example, a value of 4 will 
*	result in values of 3, 7, B, or F.
*
* @param {object} options Used to push bias towards red.
*
*	The practical use of this is when generating random colors, we'll have
*	less possible colors, which is useful when doing initial training.
*	And since we're rounding UP, there's a chance we'll get a very strong 
*	red color (and other colors).
*
*/
exports.getRandomRGB = function(in_multiple, options) {

	var multiple = in_multiple || 0;
	options = options || {};

	var retval = {};
	retval.red = getRandomColor(multiple);
	retval.green = getRandomColor(multiple);
	retval.blue = getRandomColor(multiple);

	if (typeof(options.bias_red) != "undefined") {

		var bias = options.bias_red;

		retval.red = applyBias(retval.red, bias);
		retval.green = applyBias(retval.green, bias * -1);
		retval.blue = applyBias(retval.blue, bias * -1);

	}

	retval.color = "#" + retval.red + retval.green + retval.blue;

	return(retval);

} // End of getRandomRGB()


/**
* Return a random hexadecimal color.
*/
function getRandomColor(multiple) {
	var retval = getRandomHex(multiple) + getRandomHex(multiple);
	return(retval);
}


/**
* Return a random hexdecimal value.
*/
function getRandomHex(multiple) {

	var letters = "0123456789ABCDEF".split("");
	var index = Math.floor(Math.random() * 16);

	//
	// Divide by the multiple, round down, then add one, which is 
	// basically 1 *multiple* when we re-multiply.  Finally, subtract one.
	//
	if (multiple) {
		index = ( (Math.floor(index / multiple) + 1) * multiple) - 1;
	}

	var retval = letters[index];
	return(retval);

}


/**
* Apply bias to a specific color.
*
* @params {string} color The color in base 16.
* @params {float} bias The bias.  
*	If positive, multiply by this number. 
*	If negative, divide by it.  
*	Zero will return zero. (Don't do that)
*
* @return {string} The modified color, in base 16.
*/
function applyBias(color, bias) {

	//
	// Convert to base 10
	//
	var retval = parseInt(color, 16);

	if (bias >= 0) {
		retval = retval * bias;
		if (retval > 255) {
			retval = 255;
		}

	} else {
		//
		// Make the bias numer positive, then divide by it
		//
		bias = bias * -1;
		retval = retval / bias;
		retval = Math.floor(retval);
	
	}

	//
	// Convert back to hex.
	//
	retval = retval.toString(16);

	//
	// Add a leading zero, if necessary.
	//
	if (retval.length < 2) {
		retval = "0" + retval;
	}

	return(retval);

} // End of applyBias()





