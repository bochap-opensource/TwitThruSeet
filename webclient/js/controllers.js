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
    $scope.loadTweets = function (max_id, since_id) {
        $scope.last_refresh = new Date();
        $http.get('/api/twitter/timeline', { params: { max_id: max_id, since_id: since_id }}).success(function(data) {
            $scope.data = data;
        });
    };
    $scope.trustHtml = function(src) {
        return $sce.trustAsHtml(src);
    };

    // Load data when controller is first created
    $scope.loadTweets();
}
TwitterCtrl.$inject = ['$sce', '$scope', '$http'];
