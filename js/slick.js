app.directive("slickCarousel", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      window.onload = function () {
        // Khởi tạo Slick Carousel khi các phần tử đã được render
        $(element).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
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
    },
  };
});
