'use strict';

/* Controllers */

/*function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
}*/
function EmptyCtrl() {

}
EmptyCtrl.$inject = [];

function TwitterTimelineCtrl($sce, $scope, $http) {
    $scope.getNewTweets = function() {
        loadTweets(null, $scope.data.since_id);
    };
    $scope.getOlderTweets = function() {
        loadTweets($scope.data.max_id, null);
    };
    $scope.trustHtml = function(src) {
        return $sce.trustAsHtml(src);
    };

    function setLoadingState(isLoad) {
        $scope.isLoadingTweets = isLoad;
    }

    function loadTweets(max_id, since_id) {
        $scope.last_refresh = new Date();
        setLoadingState(true);
        $http.get('/api/twitter/timeline',{params: {max_id: max_id, since_id: since_id}})
            .then(function(response){
                // success
                if(since_id == null || response.data.length > 0)
                    $scope.data = response.data;
            }, function(error){
                // error
            }).then(function(response) {
                setLoadingState(false);
            });
    };


    function init() {
        $scope.data = {};
        setLoadingState(false);
        // Load data when controller is first created
        loadTweets();
    }

    init();
}

TwitterTimelineCtrl.$inject = ['$sce', '$scope', '$http'];

function TwitterCreateCtrl(geolocation, $upload, $scope, $http) {
    $scope.reset = function() {
        $scope.data = $scope.orig;
        getGeoIp();
    };
    $scope.onFileSelect = function(files) {
        $scope.file = files[0];
    };

    $scope.submit = function() {
        setSubmittingState(true);
        $scope.upload = $upload.upload({
            url: '/api/twitter/update',
            data: {
                status: $scope.status,
                latitude: $scope.geoIp.coords.latitude,
                longitude: $scope.geoIp.coords.longitude
            },
            file: $scope.file
        }).progress(function(event) {
            console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
        }).success(function(data, status, headers, config) {
            setSubmittingState(false);
        })
    };

    $scope.map = {
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 15,
        events: {
            tilesloaded: function (map) {
                $scope.$apply(function () {
                    $scope.mapInstance = map;
                });
            }
        },
        markClick: false,
        fit: true};

    function setSubmittingState(isSubmit) {
        $scope.isSubmittingTweet = isSubmit;
    }

    function getGeoIp() {
        geolocation.getLocation().then(function(data){
            $scope.geoIp = data;
            $scope.map.center.latitude = data.coords.latitude;
            $scope.map.center.longitude = data.coords.longitude;
        });
    }

    function init() {
        $scope.status = '';
        $scope.file = null;
        setSubmittingState(false);
        getGeoIp();
        $scope.orig = [$scope.data];
    }

    init();
}

TwitterCreateCtrl.$inject = ['geolocation', '$upload', '$scope', '$http'];