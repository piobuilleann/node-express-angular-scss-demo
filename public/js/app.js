'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ct.ui.router.extras',
  'ui.router',
  'angularFileUpload'
]).
config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('index', {
      url: "/",
      views: {
        "simpleFS@nav": { templateUrl: "/templates/primNav" },
		"simpleFS@content": { templateUrl: "/templates/content" }
      },
	  deepStateRedirect: false,
	  sticky: false
    })
    .state('simpleFS', {
      url: "/simpleFS",
      views: {
        "simpleFS@nav": { templateUrl: "/templates/simpleFS/primNav" },
		"simpleFS@seconNav": { templateUrl: "/templates/simpleFS/seconNav"},
		"simpleFS@content": { templateUrl: "/templates/simpleFS/content" }
      },
	  resolve: {
		initalData: function(){
			return 
		}
	  },
	  sticky: false,
	  deepStateRedirect: false
    })
    .state('simpleFS.docs', {
      url: "/docs",
      views: {
        "simpleFS@nav": { templateUrl: "/templates/simpleFS/primNav" },
		"seconNav": { templateUrl: "/templates/simpleFS/seconNav"},
		"simpleFS@content": { templateUrl: "/templates/simpleFS/content" }
      },
	  resolve: {
		initalData: function(){
			return 
		}
	  },
	  sticky: true
    })
    .state('simpleFS.newDir', {
      url: "/new-directory",
      views: {
        "simpleFS@nav": { templateUrl: "/templates/simpleFS/primNav" },
		"simpleFS@seconNav": { templateUrl: "/templates/simpleFS/seconNav"},
		"simpleFS@content": { templateUrl: "/templates/simpleFS/new" }
      },
	  resolve: {
		initalData: function(){
			return 
		}
	  },
	  sticky: true
    })
    .state('simpleFS.upload', {
      url: "/upload",
      views: {
        "simpleFS@nav": { templateUrl: "/templates/simpleFS/primNav" },
		"simpleFS@seconNav": { templateUrl: "/templates/simpleFS/seconNavDeepRoot"},
		"simpleFS@content": { templateUrl: "/templates/simpleFS/upload" }
      },
	  sticky: true
    })
    .state('simpleFS.uploadDeep', {
      url: "/:directory/upload",
      views: {
        "simpleFS@nav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/primNav?dir="+$stateParams.directory;
			}
		},
		"simpleFS@seconNav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/seconNavDeepRoot";
			}
		},
		"simpleFS@content": { templateUrl: function($stateParams){
			return "/templates/simpleFS/uploadDeep?dir="+$stateParams.directory;
		}}
      },
	  sticky: true
    })
    .state('simpleFS.dynamDir', {
      url: "/:dynamDir",
      views: {
        "simpleFS@nav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/primNav?dir="+$stateParams.dynamDir;
			}
		},
		"simpleFS@seconNav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/seconNavDeepRoot?dir="+$stateParams.dynamDir;
			}
		},
		"simpleFS@content": { templateUrl: function($stateParams){
			return "/templates/simpleFS/content?dir="+$stateParams.dynamDir;
		}}
      },
	  sticky: false
    })
    .state('simpleFS.viewFileInDir', {
      url: "/:dir/:file",
      views: {
        "simpleFS@nav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/primNav?dir";
			}
		},
		"simpleFS@seconNav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/seconNavDeepRoot";
			}
		},		
		"simpleFS@content": { templateUrl: function($stateParams){
			return "/templates/simpleFS/fileViewDeep?file="+$stateParams.file+"&dir="+$stateParams.dir;
			//return "/templates/simpleFS/fileViewFrame";
		}}
      },
	  sticky: false
    })
    .state('simpleFS.viewFile', {
      url: "/file/:file",
      views: {
        "simpleFS@nav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/primNav?dir";
			}
		},
		"simpleFS@seconNav": { 
			templateUrl: function($stateParams){
				return "/templates/simpleFS/seconNavDeepRoot";
			}
		},		
		"simpleFS@content": { templateUrl: function($stateParams){
			return "/templates/simpleFS/fileView?dir="+$stateParams.file;
			//return "/templates/simpleFS/fileViewFrame";
		}}
      },
	  sticky: false
    });
  
  /*$routeProvider.
    when('/Golden-Frog-UI-Test', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/simpleFS', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/Golden-Frog-UI-Test'
    });*/

  $locationProvider.html5Mode(true);
}]).run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});
