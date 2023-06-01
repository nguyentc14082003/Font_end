var API = "http://localhost:3000/";

var app = angular.module("fquizpolyApp", ["ngRoute"]);

app.controller("userCtrl", function ($scope, $http, $timeout, $location) {
  // $scope.listAccount = [];
  // $http.get("../db/Students.js").then(function (response) {
  //   $scope.listAccount = response.data;
  // });
  function callApi(method, url) {
    return $http({
      method: method,
      url: API + url,
    }).then(
      function successCallback(response) {
        return response.data;
      },
      function errorCallback(response) {
        throw new Error(response.statusText);
      }
    );
  }

  callApi("GET", "student")
    .then(function (data) {
      console.log(data);
      $scope.listAccount = data;
    })
    .catch(function (error) {
      console.error(error);
    });

  $scope.userLogin = [
    {
      username: "",
      pass: "",
    },
  ];

  $scope.found;
  $scope.loading = false;
  $scope.logoutSuccess = false;

  $scope.logUserLogin = function () {
    $scope.found = false;
    if ($scope.loginForm.$valid) {
      $scope.loading = true;
      let user = $scope.userLogin.username;
      let password = $scope.userLogin.pass;
      for (let i = 0; i < $scope.listAccount.length; i++) {
        if (
          user === $scope.listAccount[i].username &&
          password === $scope.listAccount[i].password
        ) {
          $scope.userLogin = $scope.listAccount[i];
          $scope.found = true;
          break;
        }
      }
      $scope.success = false;
      $timeout(function () {
        if ($scope.found) {
          $scope.success = true;
          console.log($scope.success);
          $scope.loginSuccess = true;
          loginSuccess();
        } else {
          $scope.loginError = true;
        }
      }, 2000).finally(function () {
        $scope.loading = false;
        $timeout(hideAlert, 3000);
      });
    } else {
      $scope.loginForm.$submitted = true;
    }
  };

  function hideAlert() {
    $scope.logoutSuccess = false;
    $scope.loginSuccess = false;
    $scope.loginError = false;
  }

  var backdrop;
  var body;
  function loginSuccess() {
    backdrop = document.querySelector(".modal-backdrop");
    body = document.querySelector("body");
    if (backdrop) {
      backdrop.classList.add("d-none");
      body.classList.remove("modal-open");
      body.removeAttribute("style");
    }
    $location.path("/learning");
  }
  $scope.logOut = function () {
    backdrop.classList.remove("d-none");
    backdrop.classList.add("d-fixed");
    $scope.success = false;
    $scope.found = false;
    $scope.userLogin = [];
    $scope.loginSuccess = false;
    $scope.loginError = true;
    $scope.logoutSuccess = true;
    $timeout(hideAlert, 3000);
    console.log($scope.userLogin);
  };
});

app.controller("lanCtrl", function ($scope) {
  $scope.listLans = [
    { name: "cplusplus", title: "C++" },
    { name: "android", title: "Android" },
    { name: "c-sharp", title: "C Sharp" },
    { name: "js", title: "JavaScript" },
    { name: "php", title: "PHP" },
    { name: "python", title: "Python" },
    { name: "sql", title: "SQL Server" },
    { name: "java", title: "Java" },
  ];
});
app.controller("listSubjectController", function ($scope, $http) {
  // $scope.subjects = [];
  $http({
    method: "GET",
    url: API + "subjects",
  }).then(
    function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.subjects = response.data;
      $scope.pageCount = Math.ceil($scope.subjects.length / 4);
      console.log($scope.subjects);
    },
    function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    }
  );
  // $http.get("/db/Subjects.js").then(function (response) {
  // $scope.subjects = response.data;
  // $scope.pageCount = Math.ceil($scope.subjects.length / 4);
  // });

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

app.controller("SlickCarouselController", function ($scope, $timeout) {
  $scope.initSlickCarousel = function () {
    // Khởi tạo Slick Carousel khi các phần tử đã được render
    $(".slick-carousel .row").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: false,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>',
      responsive: [
        {
          breakpoint: 1024, // Kích thước màn hình khi thu nhỏ lại (iPad)
          settings: {
            slidesToShow: 2, // Hiển thị 2 phần tử trên màn hình iPad
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 768, // Kích thước màn hình khi thu nhỏ lại (điện thoại)
          settings: {
            slidesToShow: 1, // Hiển thị 1 phần tử trên màn hình điện thoại
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  };

  // Sử dụng $timeout để chờ đến khi tất cả các phần tử ng-repeat đã render xong
  $timeout(function () {
    $scope.initSlickCarousel();
  });
});

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../template/main.html",
      controller: "SlickCarouselController",
    })
    .when("/learning", {
      templateUrl: "../template/page-learning.html",
      controller: "listSubjectController",
    })
    .when("/about", {
      templateUrl: "../template/page-about.html",
    })
    .when("/contact", {
      templateUrl: "../template/page-contact.html",
    })
    .when("/faqs", {
      templateUrl: "../template/page-faqs.html",
    })
    .when("/feedback", {
      templateUrl: "../template/page-feedback.html",
    })
    .when("/inforUser", {
      templateUrl: "../template/infor-user.html",
    })
    .when("/changePass", {
      templateUrl: "../template/changepass.html",
    })
    .when("/achievement", {
      templateUrl: "../template/achievement.html",
    })
    .otherwise({
      redirectTo: "/",
    });
});
