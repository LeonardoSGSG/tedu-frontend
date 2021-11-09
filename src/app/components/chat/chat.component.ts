import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './chat.service';
import { message } from './DTOs/message';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  addIdForm = new FormGroup({
    text: new FormControl('')
  })
  public messages: message[]=[];
  public idMessage: string='';
  public myId:string = sessionStorage.getItem('id')!;
  public cont!:number;

  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
    var input =(<HTMLInputElement>document.getElementById("idUsuario")).value;
console.log(input);
  }

  public allMessages(idUser: string): void{
    
    this.chatSvc.allMessages(idUser).subscribe(
      (response: message[]) => {
        this.messages = response;
        console.log("se cargaron los mensajes del usuario con id " + this.myId)
        this.cont=this.messages.length;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }  
  
}
