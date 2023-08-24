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
    .then(async(response) => {
     // console.log(response);
      const token = response.data.id;
      

      if (token) {
        alert("login successful");
        localStorage.clear();
        localStorage.setItem("token", token);   
      const response = await   axios({
          method: "get",
          url: "http://localhost:3000/getMessages",
         
          headers:{
              "Authorization":token
          }
  
      })


      console.log(response);
      let local_storage_length = localStorage.length;
      console.log(local_storage_length);
      response.data.messages.forEach(value=>{
          
          local_storage_length++;
          localStorage.setItem(local_storage_length ,value.message );
         

      })
  
  

        
  window.location.href='../chat/chat.html';

      }
    })
    /*
    .catch((error) => {
      alert(error.response.data);
    });
    */

  loginForm.reset();
});
