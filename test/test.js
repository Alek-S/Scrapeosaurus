const request = require('supertest');
const server = require('../server');
const chalk = require('chalk');

//===HTML Routes===
describe( chalk.yellow('HTML Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET / with 200', function(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});

	it('responds to GET /article with 200', function(done) {
		request(server)
			.get('/article')
			.expect(200, done);
	});

});



//===API Routes===
describe(chalk.yellow('API Routes:'), function () {
	afterEach(function () {
		server.close();
	});

	it('responds to GET /api/scrape with 200, JSON {"result": "success"}', function(done) {
		request(server)
			.get('/api/scrape')
			.expect('Content-Type', /json/)
			.expect(200,  {
				result: 'success',
			}, done);
	});

	it('responds to GET /api/article with 200, JSON', function(done) {
		request(server)
			.get('/api/article')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
	
	it('responds to GET /api/comment with 200, JSON', function(done) {
		request(server)
			.get('/api/comment')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
	
	it('responds to POST /api/comment with 200, JSON', function(done) {
		request(server)
			.post('/api/comment')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

});