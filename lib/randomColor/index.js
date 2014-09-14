/**
* This module is used to generate random colors.
*/

exports.getRandomRGB = function() {
	var retval = "#" + getRandomColor() 
		+ getRandomColor() + getRandomColor();
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

