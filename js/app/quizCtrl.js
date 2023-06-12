app.controller(
  "quizCtrl",
  function ($scope, $rootScope, ApiService, $timeout, $routeParams) {
    $scope.subjectName = $routeParams.name;

    // Khởi tạo các biến cần thiết
    $scope.showQuestions = []; // Danh sách các câu hỏi hiển thị
    $scope.currentQuestionIndex = 0; // Chỉ số của câu hỏi hiện tại
    $scope.score = 0; // Điểm số
    $scope.isAnswered = false; // Đã trả lời câu hỏi hay chưa
    $scope.isLastQuestion = false; // Là câu hỏi cuối cùng hay không
    $rootScope.showMess = true; // hiện thông báo khi làm hết 10c quizs
    $scope.timeOut = true;
    $rootScope.startDoing = false;

    let thoiluong = 600;
    $scope.startCountdown = function () {
      try {
        if (thoiluong > 0 && $rootScope.startDoing) {
          thoiluong--;
          sophut = Math.floor(thoiluong / 60);
          sogiay = thoiluong % 60;
          document.getElementById("minutes").innerHTML = sophut;
          document.getElementById("second").innerHTML = sogiay;
          $timeout($scope.startCountdown, 1000);
        } else {
          if (thoiluong == 0) {
            Swal.fire({
              icon: "info",
              title: "Time out !",
              text: "If you want to do it again press the start button !",
              showConfirmButton: true,
              allowOutsideClick: false,
            });
            $scope.timeOut = true;
            $scope.isLastQuestion = true;
            $rootScope.startDoing = false;
          } else if (!$scope.startDoing && $rootScope.showMess) {
            Swal.fire({
              icon: "success",
              title: "Congratulations on completing the quiz!",
              text: "If you want to do it again press the start button !",
              showConfirmButton: true,
              allowOutsideClick: false,
            });
            $rootScope.startDoing = false;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Hàm bắt đầu bài thi
    $scope.startQuiz = function () {
      thoiluong = 600;
      $rootScope.showMess = true;
      $rootScope.startDoing = true;
      $scope.isLastQuestion = false;
      $scope.startCountdown();

      // Gọi API để lấy danh sách câu hỏi từ server
      ApiService.callApi("get", "quizs/" + $routeParams.id)
        .then(function (response) {
          $scope.questionList = response.data;
          // Xáo trộn danh sách câu hỏi
          $scope.shuffleQuestions();
          // Hiển thị câu hỏi đầu tiên
          $scope.currentQuestionIndex = 0;

          // $scope.showNextQuestion();
          // console.log($scope.showQuestions);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // Hàm xáo trộn danh sách câu hỏi và giới hạn số lượng câu hỏi hiển thị
    $scope.shuffleQuestions = function () {
      $scope.showQuestions = angular.copy($scope.questionList);
      shuffleArray($scope.showQuestions);
      $scope.showQuestions = $scope.showQuestions.slice(0, 10); // Giới hạn số lượng câu hỏi hiển thị thành 10 câu
    };

    // Hàm hiển thị câu hỏi tiếp theo
    $scope.showNextQuestion = function () {
      $scope.isAnswered = false;
      $scope.correctAnswerId = false;
      $scope.incorrectAnswerId = false;
      $scope.currentQuestionIndex++;

      if ($scope.currentQuestionIndex === $scope.showQuestions.length) {
        // Nếu đây là câu hỏi cuối cùng
        $scope.isLastQuestion = true;
        $rootScope.startDoing = false;
      }

      // Reset lại câu trả lời
      $scope.selectedAnswerId = null;
    };

    // Hàm kiểm tra câu trả lời
    $scope.checkAnswer = function () {
      if (!$scope.isAnswered) {
        $scope.isAnswered = true;
        var currentQuestion = $scope.showQuestions[$scope.currentQuestionIndex];
        var selectedAnswer = $("input[name=myAns]:checked").val();
        var correctAnswerId = currentQuestion.AnswerId;
        // console.log(selectedAnswer);                                                           
        // console.log(correctAnswerId);
        if (selectedAnswer == correctAnswerId) {
          // Nếu câu trả lời đúng
          $scope.score++;
          // Hiển thị thông báo chọn đúng
          $scope.correctAnswerId = true;
          // Swal.fire({
          //   icon: "success",
          //   title: "Correct",
          //   text: "You chose the correct answer!",
          //   showConfirmButton: true,
          // });
        } else {
          // Nếu câu trả lời sai
          $scope.incorrectAnswerId = true;

          // Swal.fire({
          //   icon: "error",
          //   title: "Incorrect",
          //   text: "You chose the wrong answer.",
          //   showConfirmButton: true,
          // });
        }
      }
    };

    // Hàm xáo trộn mảng
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
);
