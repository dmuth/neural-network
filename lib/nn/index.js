/**
* This module acts as a wrapper for the Node.js Brain neural net framework.
*/


var brain = require("brain");

var net = new brain.NeuralNetwork();

//
// Our training data
//
var data = [];


/**
* Clear out our array of training data.
*/
exports.clear = function() {
	net = new brain.NeuralNetwork();
	data = [];
}


/**
* Add a row of input and output into our data array for training purposes.
*/
exports.add = function(input, output) {
	data.push({input: input, output: output});
} // End of add()


/**
* How many elements are in data?
*/
exports.length = function() {
	return(data.length);
}


/**
* Train our neural network.
*
* @param {object} options An object of options for training the array.
*/
exports.train = function(options) {
	net.train(data, options);
} // End of train()


/**
* Run our neural network against some input, and return the output.
*/
exports.guess = function(input) {
	var retval = net.run(input);
	return(retval);
} // End of guess()

