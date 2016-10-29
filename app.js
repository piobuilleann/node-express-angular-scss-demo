
/**
 * Module dependencies
 */

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
	simpleFs = require('simpleFs/index'),
	cluster = require('cluster'),
	cpuCount = require('os').cpus().length,
	workers = {};
	
	
function spawn(){
	var worker = cluster.fork();
	workers[worker.pid] = worker;
	return worker;	
}

if(cluster.isMaster){
	for( var i = 0; i < cpuCount; i++ ) {
		spawn();
	}
	cluster.on( 'online', function( worker ) {
		console.log( 'Worker ' + worker.process.pid + ' is online.' );
	});
	cluster.on( 'exit', function( worker, code, signal ) {
		console.log( 'worker ' + worker.process.pid + ' died.' );
		
	});	
	cluster.on( 'death', function( worker ) {
		console.log('worker ' + worker.pid + ' died. spawning a new process...');
		delete workers[worker.pid];
		spawn();		
	});
}else{

	var app = require('./worker');
	 
	/**
	 * Start Server
	 */

	http.createServer(app).listen(app.get('port'), function () {
	  console.log('Express server listening on port ' + app.get('port'));
	});
}



