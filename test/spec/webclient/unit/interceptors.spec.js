/**
 * Created by dseet on 6/10/2014.
 */
"use strict";

describe('Unit Testing: demoApiSeet.interceptors Module', function () {
    // Arrange
/*
    var $injector;
    beforeEach(function(){
        $injector = angular.injector([ 'demoApiSeet.interceptors' ]);
    });
*/


/*
    it('should contain a working twitterInterceptor Service', inject(function (twitterInterceptor) {
        expect(twitterInterceptor).not.toBeNull();
    }));
    */

    describe('Service twitterInterceptor', function () {
        var redirectUrl, serviceProvider, $http, $httpBackend, $window;
        beforeEach(module('demoApiSeet.interceptors', function(twitterInterceptorProvider, $httpProvider, $provide) {
            redirectUrl = '/Login';
            serviceProvider = twitterInterceptorProvider;
            serviceProvider.RedirectUrl(redirectUrl);
            $httpProvider.interceptors.push('twitterInterceptor');
            // mock out browser window object for testing
            $window = {
                // now, $window.location.path will upadte that empty object
                location: {},
                // we keep the reference to window.document
                document: window.document
            }
            // We register our new $window instead of the old
            $provide.constant( '$window' , $window );
        }));

        beforeEach(inject(function (_$http_, _$httpBackend_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
        }));
        describe('valid response', function () {
            var url = '/';

            it('should return requested data', function () {
                var successCallback = jasmine.createSpy();
                // Create expectation
                $httpBackend.expectGET(url).respond(200, 'mock data');

                // Call http service
                $http.get(url).success(successCallback);

                // callback called only after flush
                expect(successCallback).not.toHaveBeenCalled();

                // flush response
                $httpBackend.flush();

                // Verify expectations
                // Actual response is  [ 'mock data', 200, Function, { method : 'GET', url : '/path/to/resource' } ]
                expect(successCallback.mostRecentCall.args).toContain('mock data');
                expect(successCallback.mostRecentCall.args[1]).toBe(200);
            });
        })

        describe('invalid response', function () {
            var url = '/';

            it('should reject the promise with error', function () {

                var errorCallback = jasmine.createSpy();
                // Create expectation
                $httpBackend.whenGET(url).respond(500);

                // Call http service
                $http.get(url).error(errorCallback);

                // callback called only after flush
                expect(errorCallback).not.toHaveBeenCalled();

                // flush response
                $httpBackend.flush();

                // Verify expectations
                expect(errorCallback.mostRecentCall.args[0]).toBeUndefined();
                expect(errorCallback.mostRecentCall.args[1]).toBe(500);
            });

            it('should reject the promise and respond with error for non authorization related error', function () {

                var errorCallback = jasmine.createSpy();
                // Create expectation
                $httpBackend.whenGET(url).respond(500);

                // Call http service
                $http.get(url).error(errorCallback);

                // callback called only after flush
                expect(errorCallback).not.toHaveBeenCalled();

                // flush response
                $httpBackend.flush();

                // Verify expectations
                expect(errorCallback.mostRecentCall.args[0]).toBeUndefined();
                expect(errorCallback.mostRecentCall.args[1]).toBe(500);
            });

            it('should reroute request to the authorization url', inject(function ($location, $window) {

                var errorCallback = jasmine.createSpy();
                // Create expectation
                $httpBackend.whenGET(url).respond(401);

                // Call http service
                $http.get(url).error(errorCallback);

                // callback called only after flush
                expect(errorCallback).not.toHaveBeenCalled();

                // flush response
                $httpBackend.flush();

                // Verify expectations
                expect(errorCallback.mostRecentCall.args[0]).toBeUndefined();
                expect(errorCallback.mostRecentCall.args[1]).toBe(401);
                expect($location.path()).toBe(redirectUrl);
                expect($window.location.href).toBe($location.absUrl());
            }));

            it('should not reroute request to the authorization url if redirect url is not provided', inject(function ($location, $window) {
                var initialPath = $location.path();
                var initialWindowHref = $window.location.href;
                var errorCallback = jasmine.createSpy();
                serviceProvider.RedirectUrl(undefined);

                // Create expectation
                $httpBackend.whenGET(url).respond(401);

                // Call http service
                $http.get(url).error(errorCallback);

                // callback called only after flush
                expect(errorCallback).not.toHaveBeenCalled();

                // flush response
                $httpBackend.flush();

                // Verify expectations
                expect(errorCallback.mostRecentCall.args[0]).toBeUndefined();
                expect(errorCallback.mostRecentCall.args[1]).toBe(401);
                expect($location.path()).toBe(initialPath);
                expect($window.location.href).toBe(initialWindowHref);
            }));
        })

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

    })
})
