'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory('NewDirectoryServiceProvider',['$http', '$state', '$stateParams', function($http, $state, $stateParams){
       return {
			doItToIt: function(dirVal){
				$http({
				  method: 'POST',
				  url: '/templates/simpleFS/new',
				  params: dirVal
				}).
				success(function (data, status, headers, config) {
					console.log("Good");
					$state.transitionTo('simpleFS', $stateParams, {
						reload: true,
						inherit: false,
						notify: true
					});
				}).
				error(function (data, status, headers, config) {
					console.log("Error");
				});				
			}
	   };
  }])
  .factory('UploadServiceProvider',['$state', '$stateParams', function($state, $stateParams){
       return {
			doItToIt: function(obj){
				console.log(obj);
				$state.transitionTo('simpleFS', $stateParams, {
					reload: true,
					inherit: false,
					notify: true
				});							
			}
	   };
  }])
  .factory('ViewFileServiceProvider',['$state', '$stateParams', '$http', '$compile', function($state, $stateParams, $http, $compile){
       return {
			init: function($scope){
				$http({
				  method: 'GET',
				  url: '/templates/simpleFS/fileView',
				  params: {"dir": "6.jpg"}
				}).
				success(function (data, status, headers, config) {
					console.log(headers('content-type'));
					var newDirective = angular.element('<div>oh?</div>');
					$compile(newDirective)($scope);					
				}).
				error(function (data, status, headers, config) {
					console.log("Error");
				});	
						
			}
	   };
  }])
  .factory('DeleteImageServiceProvider',['$state', '$stateParams', '$http', function($state, $stateParams, $http){
       return {
			del: function(file){
				$http({
				  method: 'POST',
				  url: '/removeFile/',
				  params: {"file": file}
				}).
				success(function (data, status, headers, config) {	
					$state.transitionTo('simpleFS', $stateParams, {
						reload: true,
						inherit: false,
						notify: true
					});				
				}).
				error(function (data, status, headers, config) {
					console.log("Error");
				});	
						
			},delDeep: function(directory,filename){
				$http({
				  method: 'POST',
				  url: '/removeFileDeep/',
				  params: {"dir": directory, "file": filename}
				}).
				success(function (data, status, headers, config) {	
					console.log(data);
					$state.transitionTo('simpleFS.dynamDir', {"dynamDir": data}, {
						reload: true,
						inherit: false,
						notify: true
					});				
				}).
				error(function (data, status, headers, config) {
					console.log("Error");
				});	
						
			},
	   };
  }])
  .factory('DirectoryServiceProvider',['$state', '$stateParams', '$http', function($state, $stateParams, $http){
       return {
			del: function(dir){
				console.log("delete: "+dir);
				$http({
				  method: 'POST',
				  url: '/removeDirectory/',
				  params: {"dir": dir}
				}).
				success(function (data, status, headers, config) {	
					$state.transitionTo('simpleFS', $stateParams, {
						reload: true,
						inherit: false,
						notify: true
					});				
				}).
				error(function (data, status, headers, config) {
					console.log("Error");
				});	
						
			}
	   };
  }]);
