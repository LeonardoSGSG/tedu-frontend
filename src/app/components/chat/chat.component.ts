import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './chat.service';
import { message } from './DTOs/message';
import { msg } from './DTOs/msg';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  addMessageForm = new FormGroup({
    text: new FormControl('')
  })
  
  public messages: message[]=[];
  public idMessage: string='';
  public myId:string = sessionStorage.getItem('id')!;
  public cont!:number;
  idDestino: string| null= sessionStorage.getItem('idChatDestino');
  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
    this.allMessages();
  }

  public allMessages(): void{
    
    this.chatSvc.allMessages().subscribe(
      (response: message[]) => {
        this.messages = response;
        console.log("se cargaron los mensajes del usuario con id " + this.idDestino)
        this.cont=this.messages.length;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }  
  postFormMessage(msg: msg){    
    msg.userId= this.idDestino;    

      console.log("debug")
      this.sendMessage(msg);
          
  }  
  public sendMessage(msg: msg): void{
    
    
    console.log("entra");
    this.chatSvc.sendMessage(msg).subscribe(
      res=>
      {
        console.log(res.text);
        console.log(msg.userId);
        this.allMessages();
      },
      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    )
  }
  
}
