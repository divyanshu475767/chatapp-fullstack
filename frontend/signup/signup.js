const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");

const form = document.getElementById("my-form");
const signupFail = document.getElementById("signupFail");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  axios({
    method: "post",
    url: "http://localhost:3000/signup",
    data: {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
    },
  }).then((result) => {
    // console.log(data)
    form.reset();
    if (!result.data.success) {
      alert("User already registered");
    } else {
      alert("congrats , you are now registered");
      window.location.href='../login/login.html';
    }
  });
});
