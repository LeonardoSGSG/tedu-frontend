import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { messageDTO } from './DTOs/messageDTO';
import { msg } from './DTOs/msg';
import { ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { notificationDTO } from 'src/app/entities/notificationDTO';
import { debug } from 'console';
import { NotificacionesComponent } from '../notificaciones/notificaciones.component';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  addMessageForm = new FormGroup({
    text: new FormControl('')
  })
  public notificationsRes='';
  public mArchivos: string[]=[];
  public archivosMensaje: any[]=[];
  public numeroArchivosMensaje:number=0;
  public notifications: notificationDTO[]=[];
  public messages: messageDTO[]=[];
  public idMessage: string='';
  public myId:string = sessionStorage.getItem('id')!;
  public cont!:number;
  idDestino: string| null= sessionStorage.getItem('idChatDestino'); 
  nombreDestino: string| null= sessionStorage.getItem('nombreChatDestino');
  constructor(private chatSvc: ChatService, private router: Router, private notisSvc: NotificacionesService) { }

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
      (response: messageDTO[]) => {
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
  public redirigirCurso( idCurso: string)
  {
    sessionStorage.setItem('currentCourse',idCurso);
    this.router.navigate(['/courses/' + idCurso]);
    console.log("debugeando")
  }
  public getUnseen(): void{
    this.notisSvc.getUnseen().subscribe(
      (response: notificationDTO[])=>
      {
        this.notifications=response;
        if(this.notifications.length==0)
        {
          this.notificationsRes="No hay notificaciones nuevas"
        }
        else{
          this.notificationsRes=""
        }
      },
      (error: HttpErrorResponse)=>
      {
        alert(error.message);
      }
    )
  } 
  public updateNotifications(): void{
    this.notisSvc.updateNotifications().subscribe(
    (response)=>
    {
      console.log("notis")
    },
    err=>{
      console.log(err);
    }
    )
  }
  postFormMessage(msg: msg){    
    msg.userId= this.idDestino;    
    (<HTMLInputElement>document.getElementById("envMensaje")).value = '';
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
  public redirCalendar(){
    this.router.navigate(['/calendar']);
  }
  public clicArchivo(){
    document.getElementById('archivos')?.click();
    this.limpiarArchivos();
  }
  public cambioArchivos(event:any){
    //this.limpiarArchivos();
    let archivo = event.target.files;
    this.numeroArchivosMensaje=event.target.files.length;
    if(event.target.files.length>0){
      let tNombres = document.createElement("div");
      tNombres.textContent="Nombre de archivos:";
      document.getElementById("tNombres")?.appendChild(tNombres);
    }
    for(let i=0; i<event.target.files.length; i++){
      let reader=new FileReader();
      var nomCort:string;
      if(archivo[i].name.length>25){
        nomCort = (archivo[i].name).substring(0,22)+"...";
        this.mArchivos.push(nomCort);
      }else{
        this.mArchivos.push(archivo[i].name);
      }
      reader.readAsDataURL(archivo[i]);
      reader.onloadend=()=>{
        //console.log(reader.result);
        this.archivosMensaje.push(reader.result);
      }
    }
    
  }
  public limpiarArchivos(){
    var e = document.getElementById("nombresArchivos");
    var f = document.getElementById("tNombres");
    this.mArchivos = [];
    this.archivosMensaje=[];
    var child = e!.lastElementChild;
    while(child!=null){
      e!.removeChild(child);
      child = e!.lastElementChild;
    }
    var child2 = f!.lastChild;
    while(child2!=null){
      f!.removeChild(child2);
      child2 = f!.lastElementChild;
    }
  }
}
