/**
* Test out our random color generation.
*/


var _common = require("../_common");
var should = require("should");
var color = require("../../lib/randomColor");


suite("Random Colors", function() {

	setup(function(done) {
		done();
	});

	teardown(function(done) {
		done();
	});


	test("RGB", function(done) {

		var result = color.getRandomRGB();
		result.should.not.equal("");

		done();

	});

	test("RGB to the nearest 4", function(done) {

		for (var i=0; i<20; i++) {
			var result = color.getRandomRGB(4);

			result.red[0].should.match(/[37BF]/);
			result.red[1].should.match(/[37BF]/);

		}


		done();

	});


});


