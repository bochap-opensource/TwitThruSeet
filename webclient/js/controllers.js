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
    $scope.data = {};
    $scope.isLoadingTweets = false;
    function setLoadProcess(isLoad) {
        $scope.isLoadingTweets = isLoad;
    }

    function loadTweets(max_id, since_id) {
        $scope.last_refresh = new Date();
        setLoadProcess(true);
        $http.get('/api/twitter/timeline',{params: {max_id: max_id, since_id: since_id}})
            .then(function(response){
                // success
                if(since_id == null || response.data.length > 0)
                    $scope.data = response.data;
            }, function(error){
                // error
            }).then(function(response) {
                setLoadProcess(false);
            });
    };
    $scope.getNewTweets = function() {
        loadTwits(null, $scope.data.since_id);
    };
    $scope.getOlderTweets = function() {
        loadTwits($scope.data.max_id, null);
    };
    $scope.trustHtml = function(src) {
        return $sce.trustAsHtml(src);
    };

    // Load data when controller is first created
    //loadTweets();
}

TwitterTimelineCtrl.$inject = ['$sce', '$scope', '$http'];

function TwitterCreateCtrl($scope, $http) {
    $scope.status = '';
    $scope.reset = function () {
        $scope.reset();
    }
}

TwitterCreateCtrl.$inject = ['$sce', '$scope', '$http'];