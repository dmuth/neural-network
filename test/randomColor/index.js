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


	test("RGB with red bias", function(done) {

		var result = color.getRandomRGB(0, {bias_red: 1} );
		result.red.should.not.equal("00");

		var result = color.getRandomRGB(4, {bias_red: 2} );
		result.red.should.not.equal("00");

		var result = color.getRandomRGB(4, {bias_red: 3} );
		result.red.should.not.equal("00");

		var result = color.getRandomRGB(4, {bias_red: 0} );
		result.red.should.equal("00");

		var result = color.getRandomRGB(4);
		result.red.should.not.equal("00");

		done();

	});


});


