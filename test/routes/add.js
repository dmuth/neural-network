/**
* Test the /add endpoint.
*/


var async = require("async");
var request = require("request");
var should = require("should");

var comment = require("../_common");


suite("/add", function() {

	var server;

	setup(function(done) {

		//
		// Start up the server before each test.
		// Fun fact: time spenthere doesn't count against the time 
		// mocha counts for the test. :-)
		//
		var app = require('../../app');
		app.set('port', 3001);

		server = app.listen(app.get('port'), function() {
			done();
		});

	});


	teardown(function(done) {
		//
		// Stop the server after each test
		//
		server.close(function() {
			done();
		});
	});


	test("GET /add", function(done) {

		async.waterfall([function(cb) {
			request("http://localhost:3001/add", cb);

		}, function(response, body, cb) {
			response.statusCode.should.equal(404);
			cb();

		}], function(error) {
				done(error);

		});

	});


	test("POST /add", function(done) {
		done();
	});


});

