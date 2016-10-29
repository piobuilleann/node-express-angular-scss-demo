
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('error-handler'),
	morgan = require('morgan'),
	routes = require('./routes'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	//sass = require('node-sass'),
	simpleFs = require('simpleFs/index');


	var app = module.exports = express()


	/**
	 * Configuration
	 */

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.disable('view cache');

	app.use(bodyParser.urlencoded({
		extended: true,
		uploadDir: path.join(__dirname, 'tmpFiles'), 
		keepExtensions: true 
	}));

	app.use(busboy());

	app.use(methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));

	/*
	 *
	 * Init the simpleFs will authenticate the user, to ensure the proper baseDirectory is created
	 * THIS SHOULD ONLY BE PERFORMED ONCE - SHOULD NOT BE IN A WORKER!!!!
	 *
	 */
	simpleFs.init();

	/**
	 * Routes
	 */

	// serve index and view partials
	app.get('/', routes.index);
	app.get('/partials/:name', routes.partials);

	app.get('/templates/primNav', function(req, res){
		res.render("partials/primeNav.jade");
	})
	app.get('/templates/content', function(req, res){
		res.render("partials/partial1.jade")
	});
	app.get('/templates/simpleFS/primNav', function(req, res){	
		simpleFs.buildPrimeNav(req, res);			
	});
	app.get('/templates/simpleFS/seconNav', function(req, res){
		res.render("partials/simpleFS/seconNav.jade");			
	});
	app.get('/templates/simpleFS/content', function(req, res){
		//res.render("partials/simpleFS/seconNav.jade");			
		simpleFs.buildPrimeBody(req, res);
	});
	app.get('/templates/simpleFS/new', function(req, res){
		res.render("partials/simpleFS/new.jade");
	});
	app.post('/templates/simpleFS/new', function(req, res){
		simpleFs.newDirectory(req.param('directory')).then(function(defr){
			if(defr == 'EEXIST') console.log("This directory already exists");
			res.json(defr);
		});
	});
	app.get('/templates/simpleFS/seconNavDeepRoot', function(req, res){
		res.render("partials/simpleFS/seconNavDeepRoot.jade", {dir: req.param('dir')});
	});
	app.get('/templates/simpleFS/upload', function(req, res){
		res.render("partials/simpleFS/upload.jade");
	});
	app.get('/templates/simpleFS/uploadDeep', function(req, res){
		res.render("partials/simpleFS/uploadDeep.jade",{dir: req.param('dir')});
	});
	app.get('/templates/simpleFS/fileView', function(req, res){
		simpleFs.viewFile(req, res).then(function(data){
			console.log("done "+data);	
		});
	});
	app.get('/templates/simpleFS/fileViewDeep', function(req, res){
		simpleFs.viewFileDeep(req, res).then(function(data){
			console.log("done "+data);	
		});
	});
	app.post('/upload/', function(req, res){
		simpleFs.uploadFile(req, res);
	});
	app.get('/templates/simpleFS/fileViewFrame', function(req, res){
		res.render("partials/simpleFS/fileViewFrame.jade");
	});
	app.post('/removeFile/', function(req, res){
		simpleFs.removeFile(req.param('file')).then(function(){
			return res.json("");
		});
	});
	app.post('/removeFileDeep/', function(req, res){
		simpleFs.removeFileDeep(req.param('dir'),req.param('file')).then(function(){
			return res.send(req.param('dir'));
		});
	});
	app.post('/removeDirectory/', function(req, res){
		simpleFs.removeDir(req.param('dir')).then(function(){
			return res.json("");
		});
	});
	app.post('/moveFile/', function(req, res){
		simpleFs.moveFile(req, res);		
	});


		


	// redirect all others to the index (HTML5 history)
	app.get('*', routes.index);
