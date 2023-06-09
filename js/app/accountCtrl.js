// app.controller("loginCtrl", function ($scope, $rootScope, ApiService) {
//   $rootScope.listStudent = function () {
//     ApiService.callApi("GET", "student")
//       .then(function (response) {
//         $rootScope.students = {};
//         $scope.loginForm = function () {
//           $scope.loginStatus = false;
//           response.forEach((e, i) => {
//             if (
//               e.username == $scope.username &&
//               e.password == $scope.password
//             ) {
//               $scope.loginStatus = true;
//               return ($rootScope.student = e);
//             }
//           });
//           if ($scope.loginStatus) {
//             console.log($rootScope.student);
//             Swal.fire({
//               icon: "success",
//               title: "Logged in successfully !",
//               showConfirmButton: false,
//               allowOutsideClick: false,
//               timer: 1600,
//             });
//             $scope.backdrop = document.querySelector(".modal-backdrop");
//             $scope.body = document.querySelector("body");
//             if ($scope.backdrop) {
//               $scope.backdrop.classList.add("d-none");
//               $scope.body.classList.remove("modal-open");
//               $scope.body.removeAttribute("style");
//             }
//             window.location.href = "#!learning";
//           } else {
//             Swal.fire({
//               icon: "error",
//               title: "Wrong account or password !",
//             });
//           }
//         };
//         $scope.logout = function () {
//           $scope.student = null;
//           $scope.username = null;
//           $scope.password = null;
//           $scope.loginStatus = false;
//           $scope.backdrop.classList.remove("d-none");
//           $scope.backdrop.classList.add("d-fixed");
//           Swal.fire({
//             icon: "info",
//             title: "Sign out successful !",
//             showConfirmButton: false,
//             allowOutsideClick: false,
//             timer: 1600,
//           });
//         };
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   };

//   checkLogin($scope.username, $scope.password);
//   function checkLogin(user, pass) {
//     if ($rootScope.listStudent() != undefined) {
//       // console.log($rootScope.listStudent);
//       $rootScope.listStudent().array.forEach((element) => {
//         console.log(element);
//       });
//     }
//   }
// });

app.controller("loginCtrl", function ($scope, $rootScope, ApiService) {
  $rootScope.student = {};
  $rootScope.loginForm = function () {
    if ($scope.username != null && $scope.password != null) {
      $rootScope.loginStatus = false;
      $rootScope.list_user.forEach((e, i) => {
        if (e.username == $scope.username && e.password == $scope.password) {
          $rootScope.loginStatus = true;
          return ($rootScope.student = e);
        }
      });
      if ($scope.loginStatus) {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully !",
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500,
        });
        $scope.backdrop = document.querySelector(".modal-backdrop");
        $scope.body = document.querySelector("body");
        if ($scope.backdrop) {
          $scope.backdrop.classList.add("d-none");
          $scope.body.classList.remove("modal-open");
          $scope.body.removeAttribute("style");
        }
        window.location.href = "#!learning";
      } else {
        Swal.fire({
          icon: "error",
          title: "Wrong account or password !",
        });
      }
    }
  };

  $scope.logout = function () {
    $rootScope.student = null;
    $scope.username = null;
    $scope.password = null;
    $scope.loginStatus = false;
    $scope.backdrop.classList.remove("d-none");
    $scope.backdrop.classList.add("d-fixed");
    Swal.fire({
      icon: "success",
      title: "Sign out successful !",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 1500,
    });
  };
  $scope.isCheck = false;

  let check = document.getElementById("cboAgree");
  check.addEventListener("click", function () {
    check.classList.remove("is-invalid");
  });
  $scope.register = function () {
    if (!check.checked) {
      check.classList.add("is-invalid");
      $scope.isCheck = true;
    } else {
      let listUser = $rootScope.list_user;
      let id = listUser.length + 1;
      let checkUsername = false;
      $rootScope.reStudent = {
        id: id,
        username: $scope.reStudent.username,
        password: $scope.reStudent.password,
        fullname: $scope.reStudent.fullname,
        email: $scope.reStudent.email,
        gender: 0,
        birthday: new Date(),
        schoolfee: $scope.reStudent.schoolfee,
        marks: 0,
      };

      listUser.forEach((e, i) => {
        if (e.username == $scope.reStudent.username) {
          checkUsername = true;
        }
      });
      if (checkUsername) {
        Swal.fire({
          icon: "warning",
          title: "Username already registered !",
          showConfirmButton: true,
          allowOutsideClick: false,
          timer: 1500,
        });
      } else {
        let data = $rootScope.reStudent;
        console.log(data);
        ApiService.callApi("post", "student", data)
          .then(function (response) {
            console.log("done: " + response);
            Swal.fire({
              icon: "success",
              title: "Sign Up Success !",
              text: "Please update some information before taking any quiz!",
            });
            $rootScope.student = $rootScope.reStudent;
            console.log($rootScope.student);
            ApiService.callApi("GET", "student")
              .then(function (response) {
                $rootScope.list_user = response;
                console.log($rootScope.list_user);
              })
              .catch(function (error) {
                console.error(error);
              });

            $scope.loginStatus = true;
            $scope.backdrop = document.querySelector(".modal-backdrop");
            $scope.body = document.querySelector("body");
            if ($scope.backdrop) {
              $scope.backdrop.classList.add("d-none");
              $scope.body.classList.remove("modal-open");
              $scope.body.removeAttribute("style");
            }
            window.location.href = "#!inforUser";
          })
          .catch(function (error) {
            console.error("Lỗi khi cập nhật thông tin sinh viên:", error);
          });
      }
    }
  };
});
