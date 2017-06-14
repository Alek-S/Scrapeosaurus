const request = require('supertest');

describe('Loading Express', function () {
	let server;
	    beforeEach(function () {
	    server = require('../server');
    });
	    afterEach(function () {
	    server.close();
    });
	it('responds to /', function testSlash(done) {
	    request(server)
        .get('/')
        .expect(200, done);
    });
});