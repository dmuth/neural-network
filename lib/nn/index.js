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
	me.eta = 0.1;

	//
	// The "momentum"
	//
	me.alpha = 0.1;
	
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

	//
	// Store the last change on each training iteration
	//
	me.change_ih = [];
	me.change_ho = [];


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
		me.debugNodes("Start"); // Debugging

		me.weight_ih = me.randomMatrix(me.num_input, me.num_hidden);
		me.weight_ho = me.randomMatrix(me.num_hidden, me.num_output);
		me.change_ih = me.makeMatrix(me.num_input, me.num_hidden);
		me.change_ho = me.makeMatrix(me.num_hidden, me.num_output);
		me.debugWeights("Start"); // Debugging
		me.debugChanges("Start"); // Debugging

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

		var retval = [];

		for (var i=1; i<=num; i++) {
			winston.info("Training iteration:", i);

			var error = 0.0;
			for (k in data) {

				var row = data[k];
				me.run(row.input);
				me.debugNodesIO("After");
				//me.debugNodes("Updated"); // Includes hidden nodes
				error += me.backPropagate(row.target, me.eta, me.alpha);
				//me.debugWeights("After");

				if (i == num) {
					var row = {};
					row.input = me.input;
					row.output = me.output;
					retval.push(row);
				}

			}

			winston.info("Error of this run:", error);

		}

		return(retval);

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

	} // End of run()


	/**
	* Compare our results against what we wanted, and update our weights accordingly.
	*
	* @param array target Our array of nodes we expected
	* @param float eta Our learning rate, which dictates how much weights change.
	* @param float alpha Our momementum, which keeps track of weight change as deltas.
	*/
	me.backPropagate = function(targets, eta, alpha) {

		var error = 0.0;

		//
		// Calculate output deltas
		//
		var output_deltas = me.makeArray(me.num_output);
		for (var i=0; i<me.num_output; i++) {
			error = targets[i] - me.output[i];
			output_deltas[i] = error * me.sigmoidUndo(me.output[i]);
		}

		//
		// Update output weights
		//
		for (i=0; i<me.num_hidden; i++) {
			for (j=0; j<me.num_output; j++) {
				var change = output_deltas[j] * me.hidden[i];
				me.weight_ho[i][j] += (alpha * change) + (eta * me.change_ho[i][j]);
				me.change_ho[i][j] = change;
			}
		}

		//
		// Calculate hidden deltas
		//
		var hidden_deltas = me.makeArray(me.num_hidden);
		for (var i=0; i<me.num_hidden; i++) {
			var error = 0.0;
			for (j=0; j<me.num_output; j++) {
				error += output_deltas[j] * me.hidden[i];
			}
			hidden_deltas[i] = error * me.sigmoidUndo(me.hidden[i]);
		}

		//
		// Update hidden weights
		//
		for (var i=0; i<me.num_input; i++) {
			for (var j=0; j<me.num_hidden; j++) {
				var change = hidden_deltas[j] * me.input[i];
				me.weight_ih[i][j] = (alpha * change) + (eta * me.change_ih[i][j]);
				me.change_ih[i][j] = change;
			}
		}

		//
		// Calculate combined error
		//
		var error = 0.0;
		for (var i=0; i < targets.length; i++) {
			error += 0.5 * Math.pow( (targets[i] - me.output[i]), 2);
		}

		return(error);

	} // End of backPropagate()


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
	* Wrapper for makeMatrix() that puts "random" values between 0 and 1 
	* in each element.
	*/
	me.randomMatrix = function(in_i, in_j) {

		var retval = me.makeMatrix(in_i, in_j);

		for (var i=0; i<in_i; i++) {
			for (var j=0; j<in_j; j++) {
				var value = (i+j)/10;
				retval[i][j] = value;
			}
		}

		return(retval);

	} // End of randomMatrix()


	/**
	* Debug output of our nodes.
	*/
	me.debugNodes = function(str) {
		str = str || "";
		console.log("DEBUG Nodes I/H/O (" + str + "):", me.input, me.hidden, me.output);
	}

	/**
	* Debug output of our input and output nodes.
	*/
	me.debugNodesIO = function(str) {
		str = str || "";
		console.log("DEBUG Nodes I/O (" + str + "):", 
			me.getJSONFlatten(me.input), 
			me.getJSONFlatten(me.output));
	}


	/**
	* Convert a data structure to JSON and remove the newlines.
	*/
	me.getJSONFlatten = function(str) {
		var retval = JSON.stringify(str, true, 0);
		retval = retval.replace(/\r\n|\r|\n/g, "");
		retval = retval.replace(/(\]|,)/g, "$1 ");
		return(retval);
	}


	/**
	* Debug output of our weights.
	*/
	me.debugWeights = function(str) {
		str = str || "";

		console.log("DEBUG Weights IH (" + str + "): ", me.getJSONFlatten(me.weight_ih));
		console.log("DEBUG Weights HO (" + str + "): ", me.getJSONFlatten(me.weight_ho));

	}


	/**
	* Debug output of our deltas.
	*/
	me.debugChanges = function(str) {
		console.log("DEBUG Deltas IH (" + str + "): ", me.change_ih);
		console.log("DEBUG Deltas HO (" + str + "): ", me.change_ho);
	}

	me.initNodes();

	return(me);

} // End of exports()



