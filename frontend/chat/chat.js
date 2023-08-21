const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById("chat-messages");
const userList = document.getElementById("user-list");

sendButton.addEventListener('click',async ()=>{

    const message = messageInput.value;
    messageInput.value = "";
 
const token = localStorage.getItem('token');
console.log(token);
 const response = await   axios({
        method: "post",
        url: "http://localhost:3000/message",
        data: {
          message:message,
        },
        headers:{
            "Authorization":token
        }

    })
})


document.addEventListener('DOMContentLoaded',async ()=>{
const token = localStorage.getItem('token');
          
    const response = await   axios({
        method: "get",
        url: "http://localhost:3000/getMessages",
       
        headers:{
            "Authorization":token
        }

    })

    response.data.messages.forEach(value=>{
        
        const messageElement = document.createElement("p");
        messageElement.classList.add("message");
        messageElement.textContent = value.message;
        chatMessages.appendChild(messageElement);
       
    })
})

/*


document.addEventListener("DOMContentLoaded", function () {
    

    sendButton.addEventListener("click", function () {
       
    });
    const users = ["User1", "User2", "User3"];
    users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.textContent = user;
        userList.appendChild(userItem);
    });
});


*/