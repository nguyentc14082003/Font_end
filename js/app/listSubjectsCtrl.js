app.controller("listsubjectsCtrl", function ($scope, $rootScope, ApiService) {
  $scope.pageCount = Math.ceil($rootScope.list_subjects.length / 4);
  console.log($scope.pageCount);

  $scope.begin = 0;

  $scope.first = function () {
    $scope.begin = 0;
  };

  $scope.last = function () {
    $scope.begin = ($scope.pageCount - 1) * 4;
  };

  $scope.next = function () {
    if ($scope.begin < ($scope.pageCount - 1) * 4) {
      $scope.begin += 4;
    }
  };

  $scope.prev = function () {
    if ($scope.begin > 0) {
      $scope.begin -= 4;
    }
  };
});
