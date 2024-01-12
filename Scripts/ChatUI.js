import { formatDistanceToNow} from 'date-fns'
export class chatUI{
    constructor(classList){
       this.List=classList
       console.log(this.List)
    }
    clear(){
        this.List.innerHTML=``;
    }
    render(data){
        const when =formatDistanceToNow(data.created_at.toDate(),{addSuffix:true});
       if(data.filename){
           this.List.innerHTML+=`
           <li class="list-group-item" >
           <span class="username">${data.username}: </span>
           <br>
           <a class="filename" href="${data.path}">${data.filename}</a>
           <div class="filesize">Size:${data.size}</div>
           <div class="time">${when}</div>
         </li>`
       }
       else{
        this.List.innerHTML+=`
        <li class="list-group-item" >
          <span class="username">${data.username}: </span>
          <br>
          <span class="message">${data.message}</span>
          <div class="time">${when}</div>
        </li>
        `;
        
       }
       
      
    }
}