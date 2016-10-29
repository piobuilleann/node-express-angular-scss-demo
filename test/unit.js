var app = require('../worker'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	q = require('q'),
	request = require('supertest');

describe('SimpleFs', function() {
	

	/*
	*
	*	Since there is a *-wildcard on get, testing the routing upon GET routes will always return 200
	*
	*/
	
	it('GET / should return 200',function(done){
		request(app)
		  .get('/')
		  .expect(200,done);
	});	
	
	it('GET /simpleFS should return 200',function(done){
		request(app)
		  .get('/simpleFS')
		  .expect(200,done);
	});	
	
	it('GET /templates/content should return 200',function(done){
		request(app)
		  .get('/templates/content')
		  .expect(200,done);
	});	
	
	
	/*
	*
	*	Now lets test the simpleFs Module...
	*
	*/	
	
	/*WRITE TEST DIRECTORY*/
	it("POST Create test Directory", function(done){
		var dirTest = 'test';
		request(app)
			.post('/templates/simpleFS/new')
			.set('Content-Type',  'application/x-www-form-urlencoded')
			.send({directory: dirTest})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				done();
			});			
	});
		
	/*UPLOAD TEST FILE*/
	it("POST Upload test file", function(done){
		var fileTest = '4.jpg',
			rndom = Math.random();

		request(app)
			.post('/upload/')
			.attach('image', path.join(__dirname,fileTest))
			.end(function(err, res){
				if(err){
					return done(err);
				}
				done()			
			});
	});	
	

	
	/*simpleFs.moveFile*/
	it('POST Move file should return JSON',function(done){
		
		
		var testOptions = {
			pathFrom: "/",
			pathTo: "/test",
			file: "4.jpg"		
		};
		request(app)
			.post('/moveFile/')
			.set('Content-Type',  'application/x-www-form-urlencoded')
			.send(testOptions)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				done();
			});
	});
	
	/*REMOVE TEST FILE*/
	it("POST Delete test file", function(done){
		var fileTest = '4.jpg',
			testOptions = {
				dir: "test",
				file: fileTest	
			};
			
		request(app)
			.post('/removeFileDeep/')
			.set('Content-Type',  'application/x-www-form-urlencoded')
			.send(testOptions)
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				done();
			});
	});	
	
	/*DELETE TEST DIRECTORY*/
	it("POST DELETE test Directory", function(done){
		var dirTest = 'test';
		
		request(app)
			.post('/removeDirectory/')
			.set('Content-Type',  'application/x-www-form-urlencoded')
			.send({dir: dirTest})
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				done();
			});			
	});	
});