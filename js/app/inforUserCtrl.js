app.controller(
  "inforUserCtrl",
  function ($scope, $rootScope, $filter, ApiService) {
    $rootScope.student.birthday = new Date($rootScope.student.birthday);
    let inf_student = angular.copy($rootScope.student);
    let id = $rootScope.student.id;

    $scope.saveInf = function () {
      let data = $rootScope.student;
      // $http.put("http://localhost:3000/student/" + id, data);
      // console.log(data);
      let url = "student/" + id;
      ApiService.callApi("patch", url, data)
        .then(function (response) {
          console.log(
            "Thông tin sinh viên đã được cập nhật thành công:",
            response
          );
          Swal.fire({
            icon: "success",
            title: "Successfully updated !",
          });
          inf_student = angular.copy(data);
          $scope.isEditing = false;
          return false;
        })
        .catch(function (error) {
          console.error("Lỗi khi cập nhật thông tin sinh viên:", error);
        });
    };

    $scope.updateInf = function () {
      event.preventDefault();
      $scope.isEditing = true;
    };

    $scope.cancelEdit = function () {
      event.preventDefault();
      $rootScope.student = angular.copy(inf_student);
      $scope.isEditing = false;
    };
    $scope.isGender = function () {
      if($scope.student.gender == 0){
        return false;
      }else{
        return true;
      }
    };
    $scope.isUnderage = function () {
      if ($scope.student.birthday) {
        var selectedDate = new Date($scope.student.birthday);
        var currentDate = new Date();
        var age = currentDate.getFullYear() - selectedDate.getFullYear();
        if (
          currentDate.getMonth() < selectedDate.getMonth() ||
          (currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getDate() < selectedDate.getDate())
        ) {
          age--;
        }
        return age < 12;
      }
      return false;
    };
  }
);
