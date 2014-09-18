var express = require('express');
var router = express.Router();

var colors = require("../lib/randomColor");
var nn = require("../lib/nn/rgb");

router.get('/', function(req, res) {

	var color = colors.getRandomRGB();

	//
	// Make a copy of the message than wipe it from the session, 
	// as it should only be dispalyed once.
	//
	var message = req.session.message;
	req.session.message = "";

	var length = nn.length();
	var num_trained = nn.numTrained();

	//
	// If the network is trained, take a guess on if the current color is red
	//
	var red_guess = "";
	var percent = 0;
	var percent_width = 2;
	var percent_type = "danger";

	if (num_trained) {
		var input = {
			r: color.red,
			g: color.green,
			b: color.blue,
			};
		red_guess = nn.guess(input).red;
		percent = Math.floor(red_guess * 100);

		if (percent >= 90) {
			percent_type = "success";

		} else if (percent >= 75) {
			percent_type = "warning";

		}

		//
		// This ensures a minimum percentage width
		//
		if (percent > 2) {
			percent_width = percent;
		}

	}

	res.render('index', { 
		title: "Neural Network", 
		color: color,
		message: message,
		nn_length: length,
		num_trained: num_trained,
		red_guess: red_guess,
		percent: percent,
		percent_width: percent_width,
		percent_type: percent_type,
		});

});


/**
* Add a piece of data to the neutral network.
*/
router.post("/add", function(req, res) {

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


/**
* Start training our neural network
*/
router.post("/train", function(req, res) {

	var options = {
		errorThresh: 0.01,
		iterations: 100000,
		log: true, // Debugging
		logPeriod: 100,
		//learningRate: 0.3,
		};
	nn.train(options);

	req.session.message = "Neural network trained!";
	res.redirect("/");

}); 


module.exports = router;


