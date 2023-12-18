const section = document.querySelector(".hide-section");
const formContainer = document.querySelector(".login-container");
const loginContainer = document.querySelector(".login");
const profile = document.querySelector("img");

profile.onclick = () => {
  requestAnimationFrame(() => {
    loginContainer.classList.remove("hide-login");
    formContainer.classList.remove("hide-form");

    setTimeout(() => {
      section.classList.remove("hide-section");
    }, 1000);
  });
};

//clicking hidden h1

let loginform = document.getElementById("logform");
loginform.addEventListener("click", function () {
  document.getElementById("loginform").style.display = "block";
});
