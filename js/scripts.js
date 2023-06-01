const navLinks = document.querySelectorAll(".navbar-nav .nav-item a");
const mainPage = document.getElementById("mainPage");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => link.classList.remove("clicked"));
    navLink.classList.add("clicked");
  });
});
mainPage.addEventListener("click", () => {
  navLinks.forEach((navLink) => {
    navLink.classList.remove("clicked");
  });
});

// // Lấy tất cả các phầxn tử section có id
// var sections = document.querySelectorAll("section[id]");
// var header = document.querySelectorAll(".main-header");

// // Thêm sự kiện lăn chuột để tô đậm liên kết nav tương ứng với phần tử section được lăn chuột tới
// window.addEventListener("scroll", function () {
//   // Lấy vị trí hiện tại của trình duyệt
//   var currentScrollPos =
//     window.pageYOffset ||
//     document.documentElement.scrollTop ||
//     document.body.scrollTop ||
//     0;
//   // Lặp qua tất cả các phần tử section
//   sections.forEach(function (section) {
//     // Lấy vị trí bắt đầu và kết thúc của phần tử section
//     var sectionTop = section.offsetTop - 80;
//     var sectionBottom = sectionTop + section.offsetHeight;
//     // Nếu vị trí hiện tại nằm trong khoảng của phần tử section thì tô đậm liên kết nav tương ứng
//     if (currentScrollPos >= sectionTop && currentScrollPos <= sectionBottom) {
//       // Lấy href của liên kết nav tương ứng
//       var id = section.getAttribute("id");
//       var navLink = document.querySelector('a[href="#' + id + '"]');
//       // Xóa lớp "active" khỏi tất cả các liên kết nav
//       navLinks.forEach(function (link) {
//         link.classList.remove("clicked");
//       });
//       // Thêm lớp "active" cho liên kết nav tương ứng với phần tử section đang hiển thị
//       navLink.classList.add("clicked");
//     } else {
//       header.forEach(function (header) {
//         var headersquare = header.offsetHeight - 75;
//         if (currentScrollPos < headersquare) {
//           navLinks.forEach(function (link) {
//             link.classList.remove("clicked");
//           });
//         }
//       });
//     }
//   });
// });
function sendMail() {
  document
    .getElementById("feedback-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của form

      var recipient = "nguyentcpc04750@fpt.edu.vn"; // Địa chỉ email người nhận

      var form = document.getElementById("feedback-form");
      var name = form.elements.name.value;
      var email = form.elements.email.value;
      var message = form.elements.message.value;
      var subject = form.elements.subject.value;

      var mailtoLink =
        "mailto:" +
        recipient +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\nMessage: " + message
        );
      var linkElement = document.createElement("a");
      linkElement.href = mailtoLink;
      linkElement.click();
    });
}
const loginTab = document.getElementById("login-tab-pane");
const registerTab = document.getElementById("register-tab-pane");

const lgtab = document.getElementById("login-tab");
const retab = document.getElementById("register-tab");

const register = document.getElementById("register");
const login = document.getElementById("login");

const switchTab = document.getElementById("switchTab");

register.addEventListener("click", switchRegisterTabs);
switchTab.addEventListener("click", switchRegisterTabs);
login.addEventListener("click", switchLoginTabs);
function switchRegisterTabs() {
  registerTab.classList.add("active");
  registerTab.classList.add("show");

  loginTab.classList.remove("active");

  retab.classList.add("active");

  lgtab.classList.remove("active");
}
function switchLoginTabs() {
  registerTab.classList.remove("active");
  registerTab.classList.remove("show");

  loginTab.classList.add("active");

  retab.classList.remove("active");

  lgtab.classList.add("active");
}
