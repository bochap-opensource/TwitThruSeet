'use strict';


// Declare app level module which depends on filters, and services
angular.module('demoApiSeet', ['demoApiSeet.filters', 'demoApiSeet.services', 'demoApiSeet.directives','ngRoute']).
  config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.responseInterceptors.push(function($q, $location) {
        return function(promise) {
            return promise.then(
                function(response) {
                    return response;
                },
                function(response) {
                    if (response.status === 401) {
                        $location.url('/auth/twitter');
                        return;
                    }
                    return $q.reject(response);
                }
            );
        }
    });
    $routeProvider
        .when('/about', {templateUrl: 'partials/about', controller: MyCtrl1})
        .when('/twitterService', {templateUrl: 'partials/twitterService', controller: MyCtrl2})
        .otherwise({redirectTo: '/about'});
    $locationProvider.html5Mode(true);
  }]);