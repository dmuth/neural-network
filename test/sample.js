/**
* Sample test.
*/


suite("Sample", function() {

	setup(function(done) {
		done();
	});

	teardown(function(done) {
		done();
	});


	test("sample test", function(done) {
		true.should.be.true;
		var i = 1;
		i.should.equal(1);
		"foo".should.not.equal("bar");
		done();
	});



});

