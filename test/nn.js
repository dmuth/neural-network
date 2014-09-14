/**
* Test out our Neural Network.
*/


var _common = require("./_common");
var should = require("should");
var nn = require("../lib/nn");


suite("Neural Network", function() {

	setup(function(done) {
		nn.clear();
		done();
	});

	teardown(function(done) {
		nn.clear();
		done();
	});


	test("XOR + extra", function(done) {

		var data = [
			{input: [0, 0], output: [1]},
			{input: [0, 1], output: [0]},
			{input: [1, 0], output: [0]},
			{input: [1, 1], output: [1]},
			{input: [-1, -1], output: [.5]}, // A little extra test :-)
			];

		nn.add(data[0].input, data[0].output);
		nn.add(data[1].input, data[1].output);
		nn.add(data[2].input, data[2].output);
		nn.add(data[3].input, data[3].output);
		nn.add(data[4].input, data[4].output);

		nn.length().should.equal(data.length);
		nn.numTrained().should.equal(0);

		var options = {
			errorThresh: 0.001,
			iterations: 100000,
			//log: true, // Debugging
			logPeriod: 100,
			learningRate: 0.3,
			};
		nn.train(options);
		nn.numTrained().should.equal(data.length);

		var diff = 0.1;
		nn.guess(data[0].input).should.be.below(data[0].output[0] + diff);
		nn.guess(data[1].input).should.be.above(data[1].output[0] - diff);
		nn.guess(data[2].input).should.be.above(data[2].output[0] - diff);
		nn.guess(data[3].input).should.be.below(data[3].output[0] + diff);
		nn.guess(data[4].input).should.be.below(data[4].output[0] + diff);
		nn.guess(data[4].input).should.be.above(data[4].output[0] - diff);

		done();

	});


	test("RGB black and white", function(done) {

		var data = [
			{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},
			{input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},
			{input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}
			];

		nn.add(data[0].input, data[0].output);
		nn.add(data[1].input, data[1].output);
		nn.add(data[2].input, data[2].output);

		var options = {
			errorThresh: 0.001,
			iterations: 100000,
			//log: true, // Debugging
			logPeriod: 100,
			learningRate: 0.3,
			};
		nn.train(options);

		var diff = 0.1;
		var result = nn.guess({ r: 1, g: 0.4, b: 0 });
		result.black.should.be.below(diff);
		result.white.should.be.above(1 - diff);

		done();

	});


	test("RGB red", function(done) {

		var data = [
			{input: { r: 1, g: 0.3, b: 0.3 }, output: { red: 1 }},
			{input: { r: 0.16, g: 0.8, b: 0.8 }, output: { red: 0 }},
			{input: { r: 0.1, g: 0.7, b: 1.0 }, output: { red: 0 }}
			];

		nn.add(data[0].input, data[0].output);
		nn.add(data[1].input, data[1].output);
		nn.add(data[2].input, data[2].output);

		var options = {
			errorThresh: 0.001,
			iterations: 100000,
			//log: true, // Debugging
			logPeriod: 100,
			learningRate: 0.3,
			};
		nn.train(options);

		var diff = 0.1;
		var result = nn.guess({ r: 1, g: 0.4, b: 0 });
		result.red.should.be.above(1 - diff);
		
		//result.black.should.be.below(diff);
		//result.white.should.be.above(1 - diff);

		done();

	});


});


