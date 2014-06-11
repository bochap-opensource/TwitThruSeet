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


function TwitterCtrl($scope, $http, count) {
    $scope.title = 'Twitter Service';
    $scope.data = {};
    $scope.loadTweets = function () {
        $http.get('/api/twitter/timeline').success(function(data) { //, { params: {"count": $scope.count }}
            $scope.data = data;
        });
    };

    // Load data when controller is first created
    $scope.loadTweets();
}
TwitterCtrl.$inject = ['$scope', '$http'];
