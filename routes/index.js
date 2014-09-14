var express = require('express');
var router = express.Router();

var colors = require("../lib/randomColor");

router.get('/', function(req, res) {

	var color = colors.getRandomRGB();

	//
	// Make a copy of the message than wipe it from the session, 
	// as it should only be dispalyed once.
	//
	message = req.session.message;
	req.session.message = "";

	res.render('index', { 
		title: "Neural Network", 
		color: color,
		message: message,
		});

});


/**
* Add a piece of data to the neutral network.
*/
router.post("/add", function(req, res) {

	// TODO: add to training data req.body values
	req.session.message = "Answer saved!";
	res.redirect("/");

});


/**
* Start training our neural network
*/
router.post("/train", function(req, res) {

	// TODO: possibly display a page with a meta refresh of 2 seconds
	// ...only if training takes too long!
	req.session.message = "Neural network trained!";
	res.redirect("/");

}); 


module.exports = router;


