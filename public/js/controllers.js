'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl',[ '$scope', '$http', 'DeleteImageServiceProvider', function ($scope, $http, DeleteImageServiceProvider) {
   
		$scope.deleteImage = function(filename){
			console.log("delete: "+filename);
			DeleteImageServiceProvider.del(filename);
		};	

		$scope.deleteImageDeep = function(directory,filename){
			console.log("delete: "+filename);
			DeleteImageServiceProvider.delDeep(directory,filename);
		};	

  }]).
  controller('NewController',['$scope', 'NewDirectoryServiceProvider', function ($scope, NewDirectoryServiceProvider) {

	$scope.update = function(options){		
		NewDirectoryServiceProvider.doItToIt(options);
	};
    // write Ctrl here

  }]).
  controller('DirectoryController',['$scope', 'DirectoryServiceProvider', function ($scope,DirectoryServiceProvider) {
		$scope.deleteDir = function(dir){
			DirectoryServiceProvider.del(dir);
		};	

  }]).
  controller('UploadController', ['$scope', 'FileUploader', 'UploadServiceProvider', function ($scope, FileUploader, UploadServiceProvider) {
	  $scope.uploader = new FileUploader({
			url: '/upload/',
			onSuccessItem: function(obj){
				UploadServiceProvider.doItToIt(obj)
			}
		});
  }]).
  controller('UploadDeepController', ['$scope', 'FileUploader', 'UploadServiceProvider', function ($scope, FileUploader, UploadServiceProvider) {
	  
	  $scope.init = function(val){
		$scope.directory = val;
		console.log($scope.directory);
		  $scope.uploader = new FileUploader({
				url: '/upload/?dir='+$scope.directory,
				formData: {data:$scope.directory},
				onSuccessItem: function(obj){
					UploadServiceProvider.doItToIt(obj)
				}
			});
	  }
  }]).
	
  controller('ContentController', ['$scope', 'ViewFileServiceProvider', function ($scope, ViewFileServiceProvider) {
	ViewFileServiceProvider.init($scope);
  }]);
