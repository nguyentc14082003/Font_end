let a = 0;
function counterNumber() {
  let counterBox = $("#counter-box");
  if (counterBox.length == 0) {
    return;
  }
  let oTop = $("#counter-box").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter").each(function () {
      let $this = $(this),
        countTo = $this.attr("data-number");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 1000,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.countNum).toLocaleString("en"));
          },
          complete: function () {
            $this.text(Math.ceil(this.countNum).toLocaleString("en"));
          },
        }
      );
    });
    a = 1;
  }
}
mainPage = document.getElementById("mainPage");

if (mainPage) {
  mainPage.addEventListener("click", function () {
    a = 0;
    $(window).scroll(counterNumber);
    // counterNumber();
  });
}

$(window).scroll(counterNumber);
