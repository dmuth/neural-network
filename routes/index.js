var express = require('express');
var router = express.Router();

var colors = require("../lib/randomColor");

router.get('/', function(req, res) {
var color = colors.getRandomRGB();
console.log("TEST color", color);
  res.render('index', { title: 'Express' });
});

module.exports = router;
