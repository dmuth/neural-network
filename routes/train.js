/**
* Our module for training the neural network.
*/

var util = require("util");

var nn = require("../lib/nn/rgb");

module.exports = function init() {

	return(function(req, res) {

		var options = {
			errorThresh: 0.01,
			iterations: 10000,
			log: true, // Debugging
			logPeriod: 100,
			//learningRate: 0.3,
			};
		var result = nn.train(options);

		req.session.message = util.format(
				"Neural network trained! (Iterations: %d, Error: %d)",
				result.iterations, result.error
				);
		
		res.redirect("/");

	});

} // End of init()



