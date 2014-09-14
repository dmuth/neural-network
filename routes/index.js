var express = require('express');
var router = express.Router();

var colors = require("../lib/randomColor");

router.get('/', function(req, res) {

	var color = colors.getRandomRGB();

	res.render('index', { 
		title: "Neural Network", 
		color: color 
		});

});


/**
* Add a piece of data to the neutral network.
*/
router.post("/add", function(req, res) {

	// TODO: add to training data req.body values
	// TODO: display a message to the user
	res.redirect("/");

});


/**
* Start training our neural network
*/
router.post("/train", function(req, res) {

	// TODO: possibly display a page with a meta refresh of 2 seconds
	// ...only if training takes too long!
	// TODO: display a message to the user
	res.redirect("/");

}); 


module.exports = router;


