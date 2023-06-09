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

function sendMail() {
  document
    .getElementById("feedback-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của form

      let recipient = "nguyentcpc04750@fpt.edu.vn"; // Địa chỉ email người nhận

      let form = document.getElementById("feedback-form");
      let name = form.elements.name.value;
      let email = form.elements.email.value;
      let message = form.elements.message.value;
      let subject = form.elements.subject.value;

      let mailtoLink =
        "mailto:" +
        recipient +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\nMessage: " + message
        );
      let linkElement = document.createElement("a");
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

// Lấy đối tượng offcanvas
let offcanvas = document.getElementById("togglerNavbar");

// Lấy tất cả các thẻ <a> bên trong offcanvas
let links = offcanvas.getElementsByTagName("a");

// Thêm sự kiện click cho từng thẻ <a>
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    // Ẩn offcanvas khi nhấp vào thẻ <a>
    let offcanvas = bootstrap.Offcanvas.getInstance(
      document.getElementById("togglerNavbar")
    );
    if (offcanvas != null) {
      offcanvas.hide();
    }
  });
}

window.addEventListener("load", function () {
  window.location.href = "#!";
});
