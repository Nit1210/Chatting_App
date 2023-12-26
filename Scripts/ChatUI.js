export class chatUI{
    constructor(classList){
       this.List=classList
       console.log(this.List)
    }
    clear(){
        this.List.innerHTML=``;
    }
    render(data){
        const when =dateFns.distanceInWordsToNow(data.created_at.toDate(),{addSuffix:true});
        this.List.innerHTML+=`
        <li class="list-group-item" >
          <span class="username">${data.username}: </span>
          <br>
          <span class="message">${data.message}</span>
          <div class="time">${when}</div>
        </li>
        `;
        console.log("chatUI "+data.room);
      
    }
}