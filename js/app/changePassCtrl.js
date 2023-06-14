app.controller("changePassCtrl", function ($scope, $rootScope, ApiService) {
  $scope.loading = false;
  $scope.formChange = {};
  let id = $rootScope.student.id;
  $scope.changePass = function () {
    $rootScope.loading = true;

    let url = "student/" + id;

    console.log(id);
    if ($rootScope.student.password == $scope.formChange.txtchangePass) {
      if ($scope.formChange.txtnewpassword == $scope.formChange.txtconfirmPassword) {
        if ($rootScope.student.password == $scope.formChange.txtnewpassword) {
          $rootScope.loading = false;
          Swal.fire({
            icon: "warning",
            title:
              "The new password must not be the same as the old password !",
          });
        } else {
          $rootScope.student.password = $scope.formChange.txtnewpassword;
          ApiService.callApi("patch", url, $rootScope.student)
            .then(function (response) {
              console.log(
                "Thông tin sinh viên đã được cập nhật thành công:",
                response
              );
              $rootScope.loading = false;
                
              Swal.fire({
                icon: "success",
                title: "Change password successfully !",
              });
              $scope.formChange = {};
              ApiService.callApi("GET", "student")
                .then(function (response) {
                  $rootScope.list_user = response;
                  console.log($rootScope.list_user);
                })
                .catch(function (error) {
                  console.error(error);
                });
            })
            .catch(function (error) {
              alert("Some error occurred");
              console.error("Lỗi khi cập nhật thông tin sinh viên:", error);
            });
        }
      } else {
        $rootScope.loading = false;
        Swal.fire({
          icon: "warning",
          title: "Confirm password is incorrect !",
        });
      }
    } else {
      $rootScope.loading = false;
      Swal.fire({
        icon: "warning",
        title: "Current password is incorrect !",
      });
    }
  };
});
