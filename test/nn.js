/**
* Test out our Neural Network.
*/


var _common = require("./_common");
var should = require("should");


suite("Neural Network", function() {

	setup(function(done) {
		done();
	});

	teardown(function(done) {
		done();
	});


	test("train", function(done) {

		var nn_module = require("../lib/nn");

		var num_nodes_input = 2;
		//var num_nodes_hidden = 2;
		var num_nodes_hidden = 3;
		var num_nodes_output = 1;
		var nn = new nn_module(num_nodes_input, num_nodes_output, num_nodes_hidden);

		var data = [
			//{input: [0, 0], target: [1]},
			//{input: [0, 1], target: [0]},
			{input: [0.01, 0.01], target: [1]},
			{input: [0.01, 1], target: [0]},
			//{input: [1, 0], target: [0]},
			//{input: [1, 1], target: [1]},
			];

		var num_trains = 2;
		//var num_trains = 3;
		//var num_trains = 5;
		var num_trains = 10;
		//var num_trains = 100;
		//var num_trains = 1000;
		var result = nn.train(data, num_trains);
console.log("TEST RESULT", result);

// TODO: Test with wrong number of inputs

		done();

	});


});


