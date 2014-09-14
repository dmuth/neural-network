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

module.exports = router;


