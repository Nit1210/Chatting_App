import{db,collection, Timestamp, addDoc, orderBy, doc, query, where, onSnapshot, updateDoc, getDocs} from './firestore.js';

class chatting_room
{
    constructor(room,username)
    {
        this.room=room;
        this.username= username;
        this.charts=collection(db,"chatting");
        this.getChat;
        
    }
    //adding chat to the database
    async addChat(message)
    {
        const time=new Date();
        const chat=
        {
            message,
            username: this.username,
            room:this.room,
            created_at:Timestamp.now(time).toDate(),
        }
        //console.log(chat);
    const response= await addDoc(this.charts,chat)
    }
    //getting chats form database
    getChats(callback)
    {
        console.log("started data collection");
       const q= query((this.charts),where("room","==",this.room),orderBy("created_at"));
      this.getChat= onSnapshot(q, (doc)=>
       {
        doc.docChanges().forEach(change =>
         {
          if(change.type==='added')
          {
            callback( change.doc.data());
            console.log("collected chat data");
          }
           
        });
        
       });
    }
//updating Username
    async updateUsername(username)
    {
        const docref= await getDocs(this.charts);
        docref.docs
        .filter((document)=>{
           return  (document.data().username !== username);
        })
        .forEach(async (document) => 
        {
            //  if (document.data().username !== username) 
            //  {
                if (document.data().username === this.username) //changing the names of only the current user
                {
                const q = await updateDoc(doc(db, "chatting", document.id), { username: username });
                this.username=username;
                localStorage.setItem('username',username);
                console.log("username Updated");
                }
            //  }
             else{
                console.log("This name is taken. enter another name");
             }
        });

        
      
          
    }
    updateRoom(Newroom){
        this.room=Newroom;
        if(this.getChat){
            this.getChat();
            console.log("room Updated :"+ Newroom);
        }
    }
}

export{chatting_room}
//chartroom.updateUsername('nit');