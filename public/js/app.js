'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngRoute']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/about', {templateUrl: 'partials/about', controller: MyCtrl1});
    $routeProvider.when('/twitterService', {templateUrl: 'partials/twitterService', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/about'});
    $locationProvider.html5Mode(true);
  }]);