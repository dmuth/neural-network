/**
* Take some guesses
*/

var util = require("util");

var colors = require("../lib/randomColor");
var guess = require("../lib/model/guess")
var nn = require("../lib/nn/rgb");

module.exports = function init() {

	return(function(req, res) {

		//
		// Bail out if the network hasn't been trained at all.
		//
		var num_trained = nn.numTrained();
		if (!num_trained) {
			req.session.message = 
				"Can't take any guesses until you train your neural network!";
			res.redirect("/");
			return(null);
		}

		//
		// Make our guesses
		//
		var num = 100;
		var guesses = [];

		for (var i=0; i<num; i++) {

			var color = colors.getRandomRGB(4);
			var input = {
				r: color.red,
				g: color.green,
				b: color.blue,
				};
			var guess_result = guess.go(input);
			var row = {
				guess: guess_result,
				color: color.color,
				};
			guesses.push(row);

		}
	
		//
		// Now sort our guesses so the highest percentages come first
		//
		guesses.sort(function sort(a, b) {

			if (a.guess.percent < b.guess.percent) {
				return(1);

			} else if (a.guess.percent == b.guess.percent) {
				return(0);

			} else {
				return(-1);

			}

			});

		res.render("guess", { 
			menu: { guess: "active" },
			data: guesses,
		});


	});

} // End of init()



