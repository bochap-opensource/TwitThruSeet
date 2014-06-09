'use strict';

/* Directives */


angular.module('demoApiSeet.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
