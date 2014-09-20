/**
* Clear out the neural network.
*/

var util = require("util");

var nn = require("../lib/nn/rgb");

module.exports = function init() {

	return(function(req, res) {

		nn.clear();
		eq.session.message = "Neural network cleared!";
		res.redirect("/");

	});

} // End of init()



