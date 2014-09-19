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
*	The practical use of this is when generating random colors, we'll have
*	less possible colors, which is useful when doing initial training.
*	And since we're rounding UP, there's a chance we'll get a very strong 
*	red color (and other colors).
*
*/
exports.getRandomRGB = function(in_multiple) {

	var multiple = in_multiple || 0;

	var retval = {};
	retval.red = getRandomColor(multiple);
	retval.green = getRandomColor(multiple);
	retval.blue = getRandomColor(multiple);
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

