
var express = require('express');
var router = express.Router();

var colors = require("../lib/randomColor");
var guess = require("../lib/model/guess")
var nn = require("../lib/nn/rgb");



//
// Add a piece of data to the neural network
//
router.post("/add", require("./add")());

//
// Train our neural network
//
router.post("/train", require("./train")());

//
// Take guesses
//
router.get("/guess", require("./guess")());

//
// Clear out the neural network
//
router.get("/clear", require("./clear")());


//
// The front page.
//
// Optional GET data: 
// - red_bias
//
router.get('/', function(req, res) {

	var red_bias = req.query.red_bias || 1;
	var color = colors.getRandomRGB(4, { bias_red: red_bias });


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
	var guess_result = {};
	if (num_trained) {
		var input = {
			r: color.red,
			g: color.green,
			b: color.blue,
			};
		guess_result = guess.go(input);

	}

	res.render('index', { 
		menu: { home: "active" },
		csrfToken: req.csrfToken(),
		color: color,
		message: message,
		nn_length: length,
		num_trained: num_trained,
		guess: guess_result,
		});

});


module.exports = router;


