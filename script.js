const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Event listener for Sign Up button
document.getElementById("signup-btn").addEventListener("click", function () {
  window.location.href = "home.html"; // Navigate to home page
});

// Event listener for Sign In button
document.getElementById("signin-btn").addEventListener("click", function () {
  window.location.href = "home.html"; // Navigate to home page
});
