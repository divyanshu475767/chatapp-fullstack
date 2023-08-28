const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");
const userGroupsList = document.getElementById("user-groups-list");
const button = document.getElementById("button");
const createGroup = document.getElementById("createGroup");
const chatContainer = document.querySelector(".container");
const groupName = document.getElementById("group-name");
const editGroup = document.getElementById("edit-group");
const addUserForm = document.getElementById("addUserForm");
const addusers = document.getElementById("addusers");
const user = document.getElementById("user");
const remainingMembers = document.getElementById("remaining-members");
const removeUsers = document.getElementById("removeUsers");
const removeUsersFrom = document.getElementById("removeUserForm");
const existingUser = document.getElementById("existingUser");
const allMembers = document.getElementById("allMembers");
const addAdmins = document.getElementById("addAdmins");
const addAdminsForm = document.getElementById("addAdminsForm");
const allMembersMinusMain = document.getElementById("allMembersMinusMain");

const socket = io('http://localhost:3000',{ transports: ['websocket'] });



let removeClickCount = 0;
let addClickCount = 0;


addAdmins.addEventListener("click",async()=>{
  const token = localStorage.getItem("token");

  if(addClickCount%2==0){
    addAdminsForm.style.display = 'block';
    addClickCount++;
    allMembersMinusMain.textContent = "none";

    let allNonAdmins = await axios({
      method: "get",
      url: `http://localhost:3000/getAllNonAdmins/${currentGroupId}`,

      headers: {
        Authorization: token,
      },
    });

    console.log(allNonAdmins.data);

   
    allNonAdmins.data.forEach((data) => {
      let userDetails = existingUser.cloneNode(true);

      userDetails.children[0].value = data.id;
      userDetails.children[1].textContent = data.name;
      allMembersMinusMain.appendChild(userDetails);
    });

  }

  else{
    addAdminsForm.style.display = "none";
    addClickCount++;
      
  }

})


addAdminsForm.addEventListener("submit",async(e)=>{

  e.preventDefault();

  const selectedUsers = [];
  const userDivs = document.querySelectorAll(".user");

  userDivs.forEach((user) =>{
      const checkbox = user.querySelector('input[type="checkbox"]');

      if(checkbox.checked){
          selectedUsers.push(checkbox.value);
      }
  })

  console.log(selectedUsers);

  const adminResponse = await   axios({
    method: "post",
    url: "http://localhost:3000/addAdmins",
    data: {
      groupId:currentGroupId,
      addAdmins:selectedUsers,
     
    },
  })


  alert(adminResponse.data);


})


removeUsers.addEventListener('click',async()=>{

    const token = localStorage.getItem("token");

    if(removeClickCount%2==0){
       removeUsersFrom.style.display='block';
       removeClickCount++;
    allMembers.textContent = "";


    console.log(currentGroupId);

    let allUsers = await axios({
        method: "get",
        url: `http://localhost:3000/getAllGroupMembers/${currentGroupId}`,
  
        headers: {
          Authorization: token,
        },
      });

      console.log(allUsers.data);

      
    allUsers.data.forEach((data) => {
        let userDetails = existingUser.cloneNode(true);
  
        userDetails.children[0].value = data.id;
        userDetails.children[1].textContent = data.name;
        allMembers.appendChild(userDetails);
      });


      

    }

    else{
        removeUserForm.style.display = "none";
        removeClickCount++;
    }


})


removeUsersFrom.addEventListener("submit",async(e)=>{

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

    console.log(selectedUsers);

    const removeresponse = await   axios({
        method: "post",
        url: "http://localhost:3000/removeUsers",
        data: {
          groupId:currentGroupId,
          removeUsers:selectedUsers,
         
        },
      })


      alert(removeresponse.data);
      removeUsers.click();
      removeClickCount--;



})












let clickcount = 0;
addusers.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  if (clickcount % 2 == 0) {
    remainingMembers.textContent = "";
    addUserForm.style.display = "block";
    clickcount++;

    console.log(currentGroupId);

    let users = await axios({
      method: "get",
      url: `http://localhost:3000/getAllRemainingUsers/${currentGroupId}`,

      headers: {
        Authorization: token,
      },
    });

    console.log(users.data);

    users.data.forEach((data) => {
      let userDetails = user.cloneNode(true);

      userDetails.children[0].value = data.id;
      userDetails.children[1].textContent = data.name;
      remainingMembers.appendChild(userDetails);
    });
  } else {
    addUserForm.style.display = "none";
    clickcount++;
  }
});





addUserForm.addEventListener("submit",async(e)=>{

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

  

 const newUsersAdded = await   axios({
    method: "post",
    url: "http://localhost:3000/newUsersAdd",
    data: {
      groupId:currentGroupId,
      newUsers:selectedUsers,
     
    },
  })

  alert(newUsersAdded.data);
  addusers.click();
  
 
  addUserForm.reset();

});










let currentGroupId = null;

let prevClickedItem = null;

userGroupsList.addEventListener("click", async (e) => {

  addusers.style.display = "none";
  removeUsers.style.display = "none";
  addAdmins.style.display = "none";
  if (e.target.classList.contains("button")) {

   const token = localStorage.getItem("token");

     
   currentGroupId = e.target.value;

 const checkAdmin = await axios({
  method: "get",
  url: `http://localhost:3000/checkAdmin/${currentGroupId}`,
  
  headers: {
    Authorization: token,
  },
})

if(checkAdmin.data.admin){
  addusers.style.display = "block";
  removeUsers.style.display = "block";
  addAdmins.style.display = "block";
}
chatMessages.textContent = "";


    chatContainer.style.display = "block";
    groupName.textContent = e.target.textContent;

    const clickedItem = e.target;
    if (prevClickedItem !== null) {
      prevClickedItem.style.backgroundColor = "";
      addUserForm.style.display = "none";
      removeUsersFrom.style.display='none';
     
    }
    clickedItem.style.backgroundColor = "purple";
    prevClickedItem = clickedItem;

    const response = await axios({
      method: "get",
      url: `http://localhost:3000/getMessages/${currentGroupId}`,
    });

    response.data.messages.forEach((msg) => {
      const messageElement = document.createElement("p");
      messageElement.classList.add("message");
      let userName = localStorage.getItem(msg.SignupId);
      messageElement.textContent = `${userName}:: ${msg.message}`;
      chatMessages.appendChild(messageElement);
    });
  }
});

sendButton.addEventListener("click", async () => {
  if (currentGroupId === null) {
    console.log("No group selected");
    return;
  }

  


  const message = messageInput.value;
  socket.emit('message',{
    message:message,
    groupId: currentGroupId,
  })
  const token = localStorage.getItem("token");

  const response = await axios({
    method: "post",
    url: "http://localhost:3000/message",
    data: {
      message: message,
      groupId: currentGroupId,
    },
    headers: {
      Authorization: token,
    },
  });

  const messageElement = document.createElement("p");
  messageElement.classList.add("message");
  messageElement.textContent = `You:: ${message}`;
  chatMessages.appendChild(messageElement);
  messageInput.value = "";
});

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  const response = await axios({
    method: "get",
    url: "http://localhost:3000/getAllGroups",

    headers: {
      Authorization: token,
    },
  });

  response.data.forEach((group) => {
    const newButton = button.cloneNode(true);

    newButton.value = group.id;
    newButton.textContent = group.name;
    userGroupsList.appendChild(newButton);
  });
});



socket.on('message',(msg)=>{
  console.log(msg);

  if(currentGroupId == msg.groupId){

  const message = msg.message
  const messageElement = document.createElement("p");
  messageElement.classList.add("message");
  messageElement.textContent = `Divyanshu:: ${message}`;
  chatMessages.appendChild(messageElement);
  messageInput.value = "";
  }
})