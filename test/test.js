const request = require('supertest');
const server = require('../server');

describe('Loading Express', function () {
	afterEach(function () {
		server.close();
	});

	it('responds to / with 200', function(done) {
		request(server)
        .get('/')
        .expect(200, done);
	});
});