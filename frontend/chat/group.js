const form = document.getElementById("form");
const groupName = document.getElementById("groupName");
const totalUsers = document.querySelector(".user-list");
const user = document.getElementById("user");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  let users = await axios({
    method: "get",
    url: "http://localhost:3000/getAllUsers",

    headers: {
      Authorization: token,
    },
  });

  console.log(users.data.allUsers)

  users.data.allUsers.forEach((data) => {
    const User = user.cloneNode(true);
    User.children[0].value = data.id;
    localStorage.setItem( data.id,data.name);

    User.children[1].textContent = data.name;
  

    totalUsers.appendChild(User);
  });

  totalUsers.children[0].style.display = "none";
});


form.addEventListener("submit", async (e) =>{
    const token = localStorage.getItem("token");

    e.preventDefault();

    const selectedUsers = [];
    const userDivs = document.querySelectorAll(".user");

    userDivs.forEach((user) =>{
        const checkbox = user.querySelector('input[type="checkbox"]');

        if(checkbox.checked){
            selectedUsers.push(checkbox.value);
        }
    })

    
    const groupname =groupName.value
    console.log(selectedUsers)
    form.reset();

    const createGroup = await axios({
        method: "post",
        url: "http://localhost:3000/createGroup",
        data:{
         groupName:groupname,
         participants:selectedUsers
        },
    
        headers: {
          Authorization: token,
        },
      });

    
      alert(createGroup.data.msg);

  




})
