var API = "http://localhost:3000/";

var app = angular.module("fquizpolyApp", ["ngRoute"]);

app.run(function ($rootScope, $http, ApiService) {
  ApiService.callApi("GET", "student")
    .then(function (response) {
      $rootScope.list_user = response;
      console.log($rootScope.list_user);
    })
    .catch(function (error) {
      console.error(error);
    });

  ApiService.callApi("GET", "subjects")
    .then(function (response) {
      $rootScope.list_subjects = response;
      console.log($rootScope.list_subjects);
    })
    .catch(function (error) {
      console.error(error);
    });

  $rootScope.listLans = [
    { name: "cplusplus", title: "C++" },
    { name: "android", title: "Android" },
    { name: "c-sharp", title: "C Sharp" },
    { name: "js", title: "JavaScript" },
    { name: "php", title: "PHP" },
    { name: "python", title: "Python" },
    { name: "sql", title: "SQL Server" },
    { name: "java", title: "Java" },
  ];

  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if ($rootScope.startDoing) {
      event.preventDefault();

      Swal.fire({
        title: "Want to stop taking the quiz?",
        text: "The quiz will stop immediately and your achievement will not be counted !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          $rootScope.startDoing = false; // Đánh dấu là đã kết thúc làm quiz
          $rootScope.showMess = false;
          let nextPath = next.$$route.originalPath.replace("/", "#!"); // Loại bỏ dấu '#!'
          console.log(nextPath);
          window.location.href = nextPath + "";
        }
      });
    }
  });
});

app.service("ApiService", function ($http) {
  this.callApi = function (method, url, data) {
    return $http({
      method: method,
      url: API + url,
      data: data,
    }).then(
      function successCallback(response) {
        return response.data;
      },
      function errorCallback(response) {
        throw new Error(response.statusText);
      }
    );
  };
});

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "template/main.html",
      controller: "SlickCarouselCtrl",
    })
    .when("/learning", {
      templateUrl: "template/page-learning.html",
      controller: "listsubjectsCtrl",
    })
    .when("/about", {
      templateUrl: "template/page-about.html",
    })
    .when("/contact", {
      templateUrl: "template/page-contact.html",
    })
    .when("/faqs", {
      templateUrl: "template/page-faqs.html",
    })
    .when("/feedback", {
      templateUrl: "template/page-feedback.html",
    })
    .when("/inforUser", {
      templateUrl: "template/infor-user.html",
      controller: "inforUserCtrl",
    })
    .when("/changePass", {
      templateUrl: "template/changepass.html",
    })
    .when("/achievement", {
      templateUrl: "template/achievement.html",
    })
    .when("/quiz/:id/:name", {
      templateUrl: "template/quiz.html",
      controller: "quizCtrl",
    })
    .otherwise({
      redirectTo: "/",
    });
});

app.controller("SlickCarouselCtrl", function ($scope, $timeout) {
  $scope.initSlickCarousel = function () {
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
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  };
  $timeout(function () {
    $scope.initSlickCarousel();
  });
});
