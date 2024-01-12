import { chatting_room } from "./chat.js";
import {chatUI} from "./ChatUI.js"
import "./firestore.js"
import "../styles.css"
//Dom queries
const chat_list=document.querySelector(".chat-list");
const body=document.querySelector(".main");
const login=document.querySelector(".login");
const add_chatForm=document.querySelector(".new-chat");
const newNameForm=document.querySelector(".new-name");
const userName= document.querySelectorAll(".username");
const updateRoom=document.querySelector(".chat-rooms");
let selectedFiles = document.getElementById("input");
const chat= new chatUI(chat_list);
let room_type='general';

//login auth
login.addEventListener('submit',e=>{
   e.preventDefault();
   login.classList.remove("active");
   //after auth activating main page
   body.classList.add("active");
});


//adding file to storage
selectedFiles.addEventListener('change', async () => {
   const files = selectedFiles.files;
   console.log(files);

   for (let i = 0; i < files.length; i++) {
       console.log("passing " + files[i].name + " to cloud");

       try {
           const message = await chartroom.uploadfile(files[i]);
           console.log(message);
           selectedFiles.files = null;
       } catch (err) {
           console.error(err);
       }
   }
});

//download file from storage
chat_list.addEventListener('click',e=>{
        if(e.target.className==='filename'){
            let file=e.target.innerHTML;
           chartroom.downloadfile(file);
        }
});

//add chat form UI
add_chatForm.addEventListener('submit',e=>{
    e.preventDefault();
        const message =add_chatForm.message.value.trim();
        chartroom.addChat(message).then(()=>{
            add_chatForm.reset();
        }).catch(err=>console.log(err));
})

//Update username from UI
newNameForm.addEventListener('submit', e=>{
    e.preventDefault();
     const NewName=newNameForm.name.value.trim();
     chartroom.updateUsername(NewName);
     console.log("Update username Intiated ")
     chat.clear();
    chartroom.getChats((chat_data)=>
     {
        console.log("entered getChats function");
        chat.render(chat_data);
     });
     //Reset form
     newNameForm.reset();

})
//updating chatroom

updateRoom.addEventListener('click',e=>{
   if(e.target.tagName==='BUTTON'){
    chat.clear();
    const room=e.target.getAttribute('id');
    chartroom.updateRoom(room);
    console.log(room);
    chartroom.getChats((chat_data)=>{
        chat.render(chat_data);
       // console.log("render call done");
    });
    localStorage.setItem('room',room);
   }
    

})

 room_type =localStorage.room;

//check if username exist
 const Name= localStorage.username ? localStorage.username :'default';

if(Name==='default'){
    alert('Update your username you dont have one');
}

//chart function
const chartroom =new chatting_room(room_type,Name);

chartroom.getChats((chat_data)=>
{
   chat.render(chat_data);
});


