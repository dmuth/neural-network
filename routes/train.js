/**
* Our module for training the neural network.
*/

var util = require("util");

var nn = require("../lib/nn/rgb");

module.exports = function init() {

	return(function(req, res) {

		//
		// Bail out if the network hasn't been trained at all.
		//
		var num = nn.length();
		if (!num) {
			req.session.message = 
				"Can't train the neural network until you add some data!";
			res.redirect("/");
			return(null);
		}

		var options = {
			errorThresh: 0.01,
			iterations: 10000,
			log: true, // Debugging
			logPeriod: 100,
			//learningRate: 0.3,
			};
		var result = nn.train(options);

		req.session.message = util.format(
				"Neural network trained! (Iterations: %d, Error: %d, Elapsed: %ds)",
				result.iterations, result.error, result.elapsed
				);
		
		res.redirect("/");

	});

} // End of init()



