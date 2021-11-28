import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { message } from './DTOs/message';
import { msg } from './DTOs/msg';
import { ViewChild} from '@angular/core';
import { Router } from '@angular/router';

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
  nombreDestino: string| null= sessionStorage.getItem('nombreChatDestino');
  constructor(private chatSvc: ChatService, private router: Router) { }

  ngOnInit(): void {
    this.allMessages();
    this.ordenarMensajes
  }

  public ordenarMensajes()
  {
    const items= this.messages.sort((a,b)=> new Date(a.created).getTime() - new Date(b.created).getTime());
    this.messages= items;


  }
  public irTedu()
  {
this.router.navigate(['/courses']);

  }
  public allMessages(): void{
    
    this.chatSvc.allMessages().subscribe(
      (response: message[]) => {
        this.messages = response;
        this.ordenarMensajes();
  
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
    
    this.ordenarMensajes;

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
  public deleteMessage(idN: number): void
  {
    this.chatSvc.deleteMessage(idN).subscribe(
      res=>
      {
        console.log("Mensaje con id: " + idN + "eliminado");
        this.allMessages();
      },
      (error:HttpErrorResponse)=>
      {

      }
    )

  }
  public redirProfile()
  {
    this.router.navigate(['/profile']);

  }
  public LogOut()
  {
    sessionStorage.clear();
    this.router.navigate(['/login']);

  }
}
