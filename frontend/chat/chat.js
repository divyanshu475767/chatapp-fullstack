const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById("chat-messages");
const userGroupsList = document.getElementById("user-groups-list");
const button = document.getElementById('button');
const createGroup = document.getElementById('createGroup');
const chatContainer = document.querySelector('.container');
const groupName = document.getElementById('group-name');


let currentGroupId = null;



userGroupsList.addEventListener('click',async(e)=>{


    if(e.target.classList.contains('button')){
            chatMessages.textContent = '';
   currentGroupId =  e.target.value;
   chatContainer.style.display = 'block';
   groupName.textContent = e.target.textContent;


   setInterval(async()=>{
    chatMessages.textContent = '';

    const response=  await   axios({
        method: "get",
        url: `http://localhost:3000/getMessages/${currentGroupId}`,
       
    
    })


    response.data.messages.forEach(msg=>{


        const messageElement = document.createElement("p");
        messageElement.classList.add("message");
       let  userName = localStorage.getItem(msg.SignupId)
        messageElement.textContent =`${userName}:: ${msg.message}`
        chatMessages.appendChild(messageElement);
    
    
       })




   },1000)
  

   

 

    }
    })






    sendButton.addEventListener('click',async ()=>{

        if(currentGroupId === null){
            console.log('No group selected');
            return;
        }

        const message = messageInput.value;
       
    const token = localStorage.getItem('token');
    
     const response = await   axios({
            method: "post",
            url: "http://localhost:3000/message",
            data: {
              message:message,
              groupId:currentGroupId
              
            },
            headers:{
                "Authorization":token
            }
    
        })
    
       
        const messageElement = document.createElement("p");
        messageElement.classList.add("message");
        messageElement.textContent = `You:: ${message}`;
        chatMessages.appendChild(messageElement);
        messageInput.value = "";
    
        
     
    
    })
    
    
document.addEventListener('DOMContentLoaded',async ()=>{

const token = localStorage.getItem('token');
    
    const response = await   axios({
        method: "get",
        url: "http://localhost:3000/getAllGroups",
        
        headers:{
            "Authorization":token
        }

    })

    response.data.forEach(group=>{
      
     const newButton = button.cloneNode(true);

     newButton.value = group.id;
     newButton.textContent = group.name
     userGroupsList.appendChild(newButton);
     

    })




})















