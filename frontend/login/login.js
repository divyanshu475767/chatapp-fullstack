const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginForm = document.getElementById('login-form');
const p = document.getElementById('loginStatus');




loginForm.addEventListener('submit',(e)=>{

   e.preventDefault();
  // console.log(loginEmail.value , loginPassword.value)
  
  axios({
    method: "post",
    url: "http://localhost:3000/login",
    data: {
      email: loginEmail.value,
      password: loginPassword.value
    },
  })
  .then(response=>{
        
    const token = response.data.id;
    
        
    if(token){
          p.textContent = "login successful";
          localStorage.setItem('token', token);

        //  p.style.color = 'green';
        //  p.style.fontWeight="bold";
        //  p.style.fontSize ="25px";
        window.location.href = "../signup/signup.html"; 
    }
    
  })
  .catch(error=>{
    
    alert('login failed')
   // p.textContent= error.response.data;
    p.style.color = 'red';
    p.style.fontWeight="bold";
    p.style.fontSize ="25px"

  })

  loginForm.reset();



});