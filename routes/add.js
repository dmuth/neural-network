/**
* Our handler for adding a color and its result to our neural network module.
*/

var nn = require("../lib/nn/rgb");

module.exports = function init() {

	return(function(req, res) {

		var input = {
			r: req.body.color_red,
			g: req.body.color_green,
			b: req.body.color_blue,
			};

		//console.log("is_red?", req.body.is_red); // Debugging
		var output = {red: 0};
		if (req.body.is_red == "Yes") {
			output = {red: 1};
		}

		nn.add(input, output);

		req.session.message = "Answer saved!";
		res.redirect("/");

	});

} // End of init()


