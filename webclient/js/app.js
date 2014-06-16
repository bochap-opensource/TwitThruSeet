'use strict';

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null || !(strValue);
}

// Declare app level module which depends on filters, and services
angular.module('demoApiSeet', ['demoApiSeet.filters', 'demoApiSeet.services', 'demoApiSeet.directives', 'demoApiSeet.interceptors', 'angularFileUpload', 'google-maps', 'geolocation', 'ngRoute'])
    .config(['twitterInterceptorProvider', '$routeProvider', '$locationProvider', '$httpProvider', function (twitterInterceptorProvider, $routeProvider, $locationProvider, $httpProvider) {
        twitterInterceptorProvider.RedirectUrl('/auth/twitter');
        $httpProvider.interceptors.push('twitterInterceptor');
        $routeProvider
            .when('/about', {templateUrl: 'partials/about', controller: EmptyCtrl})
            .when('/twitterService', {templateUrl: 'partials/twitterService'})
            .when('/error', {templateUrl: 'partials/error', controller: EmptyCtrl})
            .otherwise({redirectTo: '/about'});
        $locationProvider.html5Mode(true);
    }]);