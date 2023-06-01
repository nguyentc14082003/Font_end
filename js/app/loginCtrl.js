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
    $scope.loginStatus = false;
    $rootScope.list_user.forEach((e, i) => {
      if (e.username == $scope.username && e.password == $scope.password) {
        $scope.loginStatus = true;
        return ($rootScope.student = e);
      }
    });
    if ($scope.loginStatus) {
      console.log($rootScope.student);
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
});
