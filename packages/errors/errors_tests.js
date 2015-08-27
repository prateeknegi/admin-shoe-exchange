// Write your tests here!
// Here is an example.
Tinytest.add('Errors - collection', function (test) {
	test.equal(Errors.collection.find({}).count(), 0);
	Errors.throw("some error");
	test.equal(Errors.collection.find({}).count(), 1);
	Errors.collection.remove({});
});
