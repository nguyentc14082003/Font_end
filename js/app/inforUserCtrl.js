app.controller(
  "inforUserCtrl",
  function ($scope, $rootScope, $filter, ApiService, $http) {
    $rootScope.student.birthday = new Date($rootScope.student.birthday);
    let inf_student = angular.copy($rootScope.student);
    let id = $rootScope.student.id;
    console.log(id);
    $scope.updateInf = function () {
      event.preventDefault();
      $scope.isEditing = true;
    };

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
          event.preventDefault();
          $scope.isEditing = false;
        })
        .catch(function (error) {
          console.error("Lỗi khi cập nhật thông tin sinh viên:", error);
          alert("Đã xảy ra lỗi khi cập nhật thông tin sinh viên.", error);
        });
    };

    $scope.cancelEdit = function () {
      event.preventDefault();
      $rootScope.student = inf_student;
      $scope.isEditing = false;
    };
  }
);
