'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('demoApiSeet.services', [])
    .value('version', '0.1')
    .factory('stateMonitor', function () {
        this.isMakingHttpCall = false;
    });
