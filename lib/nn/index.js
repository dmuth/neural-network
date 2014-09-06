/**
* Our Neural Network module.
*/


var util = require("util");

var winston = require("winston");


/**
* Our object constructor.
*
* @param integer num_input Number of input nodes
* @param integer num_output Number of output nodes
* @param integer num_hidden Number of hidden nodes
*
*/
exports = module.exports = function(num_input, num_output, num_hidden) {

	var me = {};

	me.num_input = num_input;
	me.num_output = num_output;
	me.num_hidden = num_hidden || 10;

	//
	// The "Learning Rate"
	//
	me.eta = 0.001;

	//
	// The "momentum"
	//
	//me.alpha = 
	
	//
	// Our different layers of nodes
	//
	me.input = [];
	me.hidden = [];
	me.output = [];

	//
	// Weights between the input, hidden, and output nodes
	//
	me.weight_ih = [];
	me.weight_ho = [];
	me.delta_ih = [];
	me.delta_ho = [];


	/**
	* Initialize our nodes.
	*
	* @param integer num_nodes How many nodes to create.
	*/
	me.initNodes = function() {

		//
		// Create our arrays of nodes. The hidden nodes get a 
		// bias value on the end.
		//
		me.input = me.makeArray(me.num_input);
		me.hidden = me.makeArray(me.num_hidden + 1);
		me.output = me.makeArray(me.num_output);
		//me.debugNodes(); // Debugging

		me.weight_ih = me.makeMatrix(me.num_input, me.num_hidden);
		me.weight_ho = me.makeMatrix(me.num_hidden, me.num_output);
		me.delta_ih = me.makeMatrix(me.num_input, me.num_hidden);
		me.delta_ho = me.makeMatrix(me.num_hidden, me.num_output);
		//me.debugWeights(); // Debugging
		//me.debugDeltas(); // Debugging

		//console.log("NODES", me.nodes); // Debugging
	
	} // End of initNodes()


	/**
	* Train our neural net.
	*
	* @param array data An array where each object has an "input" and "expected" value.
	* @param integer num How many times to train?
	*/
	me.train = function(data, num) {

		num = num || 1000;

		me.debugNodes("Start"); // Debugging
		for (var i=1; i<=num; i++) {
			winston.info("Training iteration:", i);
			for (k in data) {
				var row = data[k];
				me.run(row.input);
				me.debugNodes("Updated");
				// TODO: call backPropagate() and compare against targets
			}
		}

	} // End of train()


	/**
	* Step through our neural network and do all calculations.
	*/
	me.run = function(data) {

		if (me.input.length != data.length) {
			winston.error(util.format(
				"run(): Expected %d inputs, got %d inputs (%j)", 
				me.input.length, data.length, data));
			return(null);
		}

		me.input = data;

		//
		// Update the hidden nodes
		//
		for (i=0; i < me.num_hidden; i++) {
			var sum = 0.0;
			for (j=0; j < me.num_input; j++) {
				sum += (me.input[j] * me.weight_ih[j][i]);
			}
			me.hidden[i] = me.sigmoid(sum);
		}

		//me.debugNodes("Updated hidden"); // Debugging

		//
		// Update the output nodes
		//
		for (i=0; i < me.num_output; i++) {
			var sum = 0.0;
			for (j=0; j < num_hidden; j++) {
				sum += (me.hidden[j] * me.weight_ho[j][i]);
			}
			me.output[i] = me.sigmoid(sum);
		}

		//me.debugNodes("Updated output"); // Debugging

		return(me.output);

	} // End of run()


	/**
	* Convert any number into something in the range of 0 to 1 for all 
	* numbers from negative to positive infinity.  Heavy weights are 
	* given to inputs between -1 and 1.
	*/
	me.sigmoid = function(x) {
    	return (1 / ( 1 + Math.pow(Math.E, -x)));
	} 


	/**
	* Convert a sigmoid derivative back to its original value.
	*/
	me.sigmoidUndo = function(x) {
		return (Math.log( x / (1 - x)));
	}


	/**
	* Create a 1 dimensional array of values
	*/
	me.makeArray = function(num) {

		var retval = [];

		for (var i=0; i<num; i++) {
			retval.push(1);
		}

		return(retval);

	} // End of makeArray()


	/**
	* Create a two-dimensional array based on the counts of different 
	* node arrays.
	*/
	me.makeMatrix = function(in_i, in_j) {

		var retval = [];

		for (var i=0; i<in_i; i++) {

			var row = [];

			for (var j=0; j<in_j; j++) {
				row.push(0);
			}

			retval.push(row);

		}

		return(retval);

	} // End of makeMatrix()


	/**
	* Debug output of our nodes.
	*/
	me.debugNodes = function(str) {
		str = str || "";
		console.log("DEBUG Nodes I/H/O (" + str + "):", me.input, me.hidden, me.output);
	}


	/**
	* Debug output of our weights.
	*/
	me.debugWeights = function(str) {
		str = str || "";
		console.log("DEBUG Weights IH (" + str + "): ", me.weight_ih);
		console.log("DEBUG Weights HO (" + str + "): ", me.weight_ho);
	}


	/**
	* Debug output of our deltas.
	*/
	me.debugDeltas = function(str) {
		console.log("DEBUG Deltas IH (" + str + "): ", me.delta_ih);
		console.log("DEBUG Deltas HO (" + str + "): ", me.delta_ho);
	}

	me.initNodes();

	return(me);

} // End of exports()



