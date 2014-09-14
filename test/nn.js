/**
* Test out our Neural Network.
*/


var _common = require("./_common");
var should = require("should");
var brain = require("brain");


suite("Neural Network", function() {

	setup(function(done) {
		done();
	});

	teardown(function(done) {
		done();
	});


	test("brain XOR", function(done) {

		var net = new brain.NeuralNetwork();

		var data = [
			{input: [0, 0], output: [0]},
			{input: [0, 1], output: [1]},
			{input: [1, 0], output: [1]},
			{input: [1, 1], output: [0]},
			{input: [-1, -1], output: [.5]}, // A little extra test :-)
			];
		var options = {
			errorThresh: 0.001,
			iterations: 100000,
			//log: true, // Debugging
			learningRate: 0.3,
			};
		net.train(data, options);

		for (var k in data) {
			var row = data[k];
			var output = net.run(row.input);
			//console.log("Debugging", row.input, output);
		}

		var diff = 0.1;
		net.run(data[0].input).should.be.below(data[0].output[0] + diff);
		net.run(data[1].input).should.be.above(data[1].output[0] - diff);
		net.run(data[2].input).should.be.above(data[2].output[0] - diff);
		net.run(data[3].input).should.be.below(data[3].output[0] + diff);
		net.run(data[4].input).should.be.below(data[4].output[0] + diff);
		net.run(data[4].input).should.be.above(data[4].output[0] - diff);

		done();

	});


});


