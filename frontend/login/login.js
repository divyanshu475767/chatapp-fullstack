const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginForm = document.getElementById("login-form");
const p = document.getElementById("loginStatus");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  axios({
    method: "post",
    url: "http://localhost:3000/login",
    data: {
      email: loginEmail.value,
      password: loginPassword.value,
    },
  })
    .then((response) => {
      console.log(response);
      const token = response.data.id;

      if (token) {
        alert("login successful");
        localStorage.setItem("token", token);
        window.location.href='../chat/chat.html';
      }
    })
    .catch((error) => {
      alert(error.response.data);
    });

  loginForm.reset();
});
