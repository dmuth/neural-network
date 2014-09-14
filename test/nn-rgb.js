/**
* Test out our Neural Network.
*/


var _common = require("./_common");
var should = require("should");
var nn = require("../lib/nn/rgb");


suite("Neural Network", function() {

	setup(function(done) {
		nn.clear();
		done();
	});

	teardown(function(done) {
		nn.clear();
		done();
	});


	test("RGB red", function(done) {

		var data = [
			{input: { r: "ff", g: "30", b: "30" }, output: { red: 1 }},
			{input: { r: "2f", g: "cc", b: "cc" }, output: { red: 0 }},
			{input: { r: "10", g: "cc", b: "ff" }, output: { red: 0 }}
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
		
		done();

	});


});


