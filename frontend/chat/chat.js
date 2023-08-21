const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');


sendButton.addEventListener('click',async ()=>{

const token = localStorage.getItem('token');
console.log(token);
 const response = await   axios({
        method: "post",
        url: "http://localhost:3000/message",
        data: {
          message:messageInput.value,
        },
        headers:{
            "Authorization":token
        }

    })

    
})