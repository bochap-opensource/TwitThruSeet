/**
 * Created by dseet on 6/11/2014.
 */
"use strict";

describe('Unit Testing: demoApiSeet Controllers', function () {
    var $controller, $scope, $httpBackend;
    var sourcedata = {
        max_id: "3",
        since_id: "13",
        result: [
            {   id_str: "13",
                created_at: 'Wed Jun 14 11:56:02 +0000 2014',
                text: 'Text for tweet 13',
                user_screen_name: 'User_1',
                user_name: 'User 1',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_1_normal.png' },
            {   id_str: "12",
                created_at: 'Wed Jun 11 13:56:02 +0000 2014',
                text: 'Text for tweet 12',
                user_screen_name: 'User_2',
                user_name: 'User 2',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png' },
            {   id_str: "11",
                created_at: 'Wed Jun 11 12:56:02 +0000 2014',
                text: 'Text for tweet 11',
                user_screen_name: 'User_3',
                user_name: 'User 3',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png' },
            {   id_str: "10",
                created_at: 'Wed Jun 11 11:56:02 +0000 2014',
                text: 'Text for tweet 10',
                user_screen_name: 'User_1',
                user_name: 'User 1',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_1_normal.png' },
            {   id_str: "9",
                created_at: 'Wed Jun 11 10:56:02 +0000 2014',
                text: 'Text for tweet 9',
                user_screen_name: 'User_2',
                user_name: 'User 2',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png' },
            {   id_str: "8",
                created_at: 'Wed Jun 11 09:56:02 +0000 2014',
                text: 'Text for tweet 8',
                user_screen_name: 'User_3',
                user_name: 'User 3',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png' },
            {   id_str: "7",
                created_at: 'Wed Jun 11 08:56:02 +0000 2014',
                text: 'Text for tweet 7',
                user_screen_name: 'User_4',
                user_name: 'User 4',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_4_normal.png' },
            {   id_str: "6",
                created_at: 'Wed Jun 11 07:56:02 +0000 2014',
                text: 'Text for tweet 6',
                user_screen_name: 'User_5',
                user_name: 'User 5',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_5_normal.png' },
            {   id_str: "5",
                created_at: 'Wed Jun 11 06:56:02 +0000 2014',
                text: 'Text for tweet 5',
                user_screen_name: 'User_1',
                user_name: 'User 1',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_1_normal.png' },
            {   id_str: "4",
                created_at: 'Wed Jun 11 06:29:17 +0000 2014',
                text: 'Text for tweet 4',
                user_screen_name: 'User_2',
                user_name: 'User 2',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png' }
            /*,
            {   id_str: "3",
                created_at: 'Wed Jun 11 00:17:07 +0000 2014',
                text: 'Text for tweet 3',
                user_screen_name: 'User_3',
                user_name: 'User 3',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png' },
            {   id_str: "2",
                created_at: 'Tue Jun 10 22:15:04 +0000 2014',
                text: 'Text for tweet 2',
                user_screen_name: 'User_4',
                user_name: 'User 4',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_4_normal.png' },
            {   id_str: "1",
                created_at: 'Tue Jun 10 21:19:08 +0000 2014',
                text: 'Text for tweet 1',
                user_screen_name: 'User_5',
                user_name: 'User 5',
                user_profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_5_normal.png' }*/
        ]
    }

    beforeEach(inject(function (_$rootScope_, _$httpBackend_) {
        $scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
    }));

    describe('TwitterTimelineCtrl', function () {
        var controller;
        beforeEach(inject(function ($controller, _$http_) {
            controller = $controller('TwitterTimelineCtrl', { '$scope': $scope, $http: _$http_ });
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
            describe('with empty timeline', function () {
                it('should return an empty data object', function () {
                    $httpBackend.expect('GET', '/api/twitter/timeline').respond({});
                    expect($scope.data).toEqual({});
                    $scope.loadTweets();
                    $httpBackend.flush();
                    expect($scope.data).toEqual({});
                    expect($scope.data.results).toBeUndefined();
                    expect($scope.data.since_id).toBeUndefined();
                    expect($scope.data.max_id).toBeUndefined();
                });
            });

            describe('with 10 entries in timeline', function () {
                it('should return a data object with 10 records', function () {
                    $httpBackend.expect('GET', '/api/twitter/timeline').respond(sourcedata);
                    expect($scope.data).toEqual({});
                    $scope.loadTweets();
                    $httpBackend.flush();

                    // Using ECMA5 Object keys here since we have ability to control the browser, can consider writing the browser polyfill
                    expect($scope.data.result.length).toBe(10);
                    expect($scope.data.since_id).toBe("13");
                    expect($scope.data.max_id).toBe("3");
                });
            });
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    })
});