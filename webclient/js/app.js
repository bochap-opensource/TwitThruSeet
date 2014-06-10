'use strict';


// Declare app level module which depends on filters, and services
angular.module('demoApiSeet', ['demoApiSeet.filters', 'demoApiSeet.services', 'demoApiSeet.directives', 'demoApiSeet.interceptors','ngRoute'])
    .config(['twitterInterceptorProvider', '$routeProvider', '$locationProvider', '$httpProvider', function(twitterInterceptorProvider, $routeProvider, $locationProvider, $httpProvider) {
        twitterInterceptorProvider.RedirectUrl('/auth/twitter');
        $httpProvider.interceptors.push('twitterInterceptor');
        $routeProvider
            .when('/about', {templateUrl: 'partials/about', controller: MyCtrl1})
            .when('/twitterService', {templateUrl: 'partials/twitterService', controller: MyCtrl2})
            .otherwise({redirectTo: '/about'});
        $locationProvider.html5Mode(true);
  }]);
/*

.factory('myHttpInceptor', ['$q', '$location', '$window', function($q, $location, $window) {
    return {
        response: function(response){
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $location.path('/auth/twitter');
                var authUrl = $location.absUrl();
                $window.location.href = authUrl;
            }
            return $q.reject(rejection);
        }
    }

}])*/
