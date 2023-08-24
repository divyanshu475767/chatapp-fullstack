const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById("chat-messages");
const userList = document.getElementById("user-list");








sendButton.addEventListener('click',async ()=>{

    const message = messageInput.value;
    console.log(localStorage.getItem('lemon'));
    
 
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

   
    const messageElement = document.createElement("p");
    messageElement.classList.add("message");
    messageElement.textContent = message;;
    chatMessages.appendChild(messageElement);
    messageInput.value = "";
 let n = localStorage.length;
 n++;

 localStorage.setItem(n, message);


})




document.addEventListener('DOMContentLoaded',async ()=>{

 let n = localStorage.length;
    
        for(var i=2;i<=n;i++){
        const messageElement = document.createElement("p");
        messageElement.classList.add("message");
        messageElement.textContent =localStorage.getItem(i) ;
        chatMessages.appendChild(messageElement);
       
        }
})













