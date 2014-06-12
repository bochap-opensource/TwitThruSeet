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

function TwitterCtrl($sce, $scope, $http) {
    $scope.title = 'Twitter Service';
    $scope.data = {};
    $scope.isLoadingTwits = false;
    function setLoadProcess(isLoad) {
        $scope.isLoadingTwits = isLoad;
    }

    function loadTwits(max_id, since_id) {
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
    $scope.getNewTwits = function() {
        loadTwits(null, $scope.data.since_id);
    };
    $scope.getOlderTwits = function() {
        loadTwits($scope.data.max_id, null);
    };
    $scope.trustHtml = function(src) {
        return $sce.trustAsHtml(src);
    };

    // Load data when controller is first created
    loadTwits();
}
TwitterCtrl.$inject = ['$sce', '$scope', '$http'];
