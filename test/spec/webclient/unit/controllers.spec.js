/**
 * Created by dseet on 6/11/2014.
 */
"use strict";

describe('Unit Testing: demoApiSeet Controllers', function () {
    var $controller, $scope, $httpBackend;
    var sourcedata = {
        max_id: 1,
        results: {
            5: {
                "created_at": "Tue Jun 12 22:15:04 +0000 2014"
                , "text": "This is item 5 of time line"
                , "user": {
                    "id": 1, "name": "User 1", "screen_name": "User_1"
                    , "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/3745958419\/9999d627e55bde3c66ebf1682c5ce47a_normal.png"
                    , "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/3745958419\/9999d627e55bde3c66ebf1682c5ce47a_normal.png"
                }
            }
            , 4: {
                "created_at": "Tue Jun 10 22:15:04 +0000 2014"
                , "text": "This is item 4 of time line"
                , "user": {
                    "id": 1, "name": "User 1", "screen_name": "User_1"
                    , "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/3745958419\/9999d627e55bde3c66ebf1682c5ce47a_normal.png"
                    , "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/3745958419\/9999d627e55bde3c66ebf1682c5ce47a_normal.png"
                }
            }
            , 3: {
                "created_at": "Tue Jun 10 21:00:54 +0000 2014"
                , "text": "This is item 3 of time line"
                , "user": {
                    "id": 2, "name": "User 2", "screen_name": "User_2"
                    , "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/443617852285648896\/ne7ZJOhu_normal.jpeg"
                    , "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/443617852285648896\/ne7ZJOhu_normal.jpeg"
                }
            }
            , 2: {
                "created_at": "Tue Jun 10 21:00:21 +0000 2014"
                , "text": "This is item 2 of time line"
                , "user": {
                    "id": 3, "name": "User 3", "screen_name": "User_3"
                    , "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/2344189796\/o5u8bz6cep1bfkasvsm1_normal.jpeg"
                    , "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/2344189796\/o5u8bz6cep1bfkasvsm1_normal.jpeg"
                }
            }
            , 1: {
                "created_at": "Tue Jun 10 04:33:41 +0000 2014"
                , "text": "This is item 1 of time line"
                , "user": {
                    "id": 3, "name": "User 3", "screen_name": "User_3"
                    , "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/2344189796\/o5u8bz6cep1bfkasvsm1_normal.jpeg"
                    , "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/2344189796\/o5u8bz6cep1bfkasvsm1_normal.jpeg"
                }
            }
        }
    }

    beforeEach(inject(function (_$rootScope_, _$httpBackend_) {
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
    }));

    describe('TwitterCtrl', function () {
        var controller;
        beforeEach(inject(function ($controller, _$http_) {
            controller = $controller('TwitterCtrl', { '$scope': $scope, $http: _$http_ });
            $httpBackend.expect('GET', '/api/twitter/timeline').respond({});
            $httpBackend.flush();
        }));

        it('should have a title property', function () {
            expect($scope.title).toBeDefined();
        });

        it('should have a data property', function () {
            expect($scope.data).toBeDefined();
        });

        it('should have a loadTweets method', function () {
            expect($scope.loadTweets).toBeDefined();
        });

        describe('calling loadTweets', function() {
            it('should have an empty data object when the timeline is empty', function () {
                $httpBackend.expect('GET', '/api/twitter/timeline').respond({});
                expect($scope.data).toEqual({});
                $scope.loadTweets();
                $httpBackend.flush();
                expect($scope.data).toEqual({});
                expect($scope.data.results).toBeUndefined();
                expect($scope.data.max_id).toBeUndefined();
            });

            it('should have a data object loaded with 5 results when there 5 records in the timeline', function () {
                $httpBackend.expect('GET', '/api/twitter/timeline').respond(sourcedata);
                expect($scope.data).toEqual({});
                $scope.loadTweets();
                $httpBackend.flush();
                // Using ECMA5 Object keys here since we have ability to control the browser, can consider writing the browser polyfill
                expect(Object.keys($scope.data.results).length).toBe(5);
                expect($scope.data.max_id).toBe(1);
            });
        })

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    })
});