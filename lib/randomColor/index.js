/**
* This module is used to generate random colors.
*/


/**
* This function returns a color code along with its constituent colors.
*/
exports.getRandomRGB = function() {

	var retval = {};
	retval.red = getRandomColor();
	retval.green = getRandomColor();
	retval.blue = getRandomColor();
	retval.color = "#" + retval.red + retval.green + retval.blue;

	return(retval);

} // End of getRandomRGB()


/**
* Return a random hexadecimal color.
*/
function getRandomColor() {
	var retval = getRandomHex() + getRandomHex();
	return(retval);
}


/**
* Return a random hexdecimal value.
*/
function getRandomHex() {
	var letters = "0123456789ABCDEF".split("");
	var index = Math.floor(Math.random() * 16);
	var retval = letters[index];
	return(retval);
}

