const request = require('supertest');
const server = require('../server');


//===HTML Routes===
describe('HTML Routes:', function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET / with 200', function(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

});



//===API Routes===
describe('API Routes:', function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET /api/scrape with 200, JSON', function(done) {
		request(server)
			.get('/api/scrape')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('responds to GET /api/article with 200, JSON', function(done) {
		request(server)
			.get('/api/article')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

});