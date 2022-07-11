import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './chat.service';
import { messageDTO } from './DTOs/messageDTO';
import { msg } from './DTOs/msg';
import { Router } from '@angular/router';
import { notificationDTO } from 'src/app/entities/notificationDTO';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { StorageService } from '../storage/storage.service';
import { Archivo } from 'src/app/entities/archivo';
import { MatDialog } from '@angular/material/dialog';
import { SubidaArchivoComponent } from '../subida-archivo/subida-archivo.component';
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
  public nombresArchivosReales: string[]=[];
  public archivosMensaje: any[]=[];
  public numeroArchivosMensaje:number=0;
  public notifications: notificationDTO[]=[];
  public messages: messageDTO[]=[];
  public idMessage: string='';
  public myId:string = sessionStorage.getItem('id')!;
  public cont!:number;
  idDestino: string| null= sessionStorage.getItem('idChatDestino'); 
  nombreDestino: string| null= sessionStorage.getItem('nombreChatDestino');
  constructor(private chatSvc: ChatService,private dialog:MatDialog, private router: Router, private notisSvc: NotificacionesService, private apiFiles:StorageService) { }

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
    if(msg.text==null || msg.text==""){
      //Controlar mensajes vacios
    } else{
      msg.userId= this.idDestino;    
        //console.log("debug")
        this.sendMessage(msg);
    }
  }  
  public sendMessage(msg: msg): void{
    if(this.numeroArchivosMensaje>0){
      var dialogo = this.dialog.open(SubidaArchivoComponent,{
        disableClose: true
      });}
    this.chatSvc.sendMessage(msg).subscribe(
      res=>
      {
        if(this.numeroArchivosMensaje>0){
          for(let i=0;i<this.numeroArchivosMensaje;i++){
            let tempI=i;
            let archivosReales = (<HTMLInputElement>document.getElementById('archivos'))!;
            let nomCortado:string[] = this.nombresArchivosReales[i].split('.');
            this.apiFiles.subirImagen((nomCortado[0].length>35? nomCortado[0].substring(0,34):nomCortado[0]) + Date.now()+ this.myId +"."+nomCortado[nomCortado.length-1],this.archivosMensaje[i]).then(urlImagen=>{
              this.apiFiles.createMessageFile(urlImagen!,res.id+"",this.mArchivos[tempI]).subscribe(res=>{
                if(tempI==this.numeroArchivosMensaje-1){
                  window.setTimeout(() => {
                    //se envia el ultimo archivo
                    this.limpiarArchivos();
                    this.addMessageForm = new FormGroup({
                      text: new FormControl('')
                    });
                    (<HTMLInputElement>document.getElementById('archivos')).value='';
                    (<HTMLInputElement>document.getElementById('envMensaje')).value='';
                    this.allMessages();
                    dialogo.close();
                  },2500);
                }
              }),(error: HttpErrorResponse)=>{
                alert(error.message);
              }
            })
          }
        }else{
          (<HTMLInputElement>document.getElementById('archivos')).value='';
          (<HTMLInputElement>document.getElementById('envMensaje')).value='';
          this.allMessages();
        }
      },
      (error:HttpErrorResponse)=>
      {
        alert(error.message);
      }
    )
  }
  public deleteMessage(idN: number, archivos:Archivo[]): void
  {
    this.chatSvc.deleteMessage(idN).subscribe(
      res=>
      {
        this.apiFiles.eliminarImagenes(archivos);
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
    for(let i=0; i<archivo.length; i++){
      let reader=new FileReader();
      var nomCort:string;
      if(archivo[i].name.length<=25){
        this.mArchivos.push(archivo[i].name);
        this.nombresArchivosReales.push(archivo[i].name);
      }else if(archivo[i].name.length <= 50){
        nomCort = (archivo[i].name).substring(0,22)+"...";
        this.mArchivos.push(nomCort);
        this.nombresArchivosReales.push(archivo[i].name);
      }else{
        alert("El archivo de nombre: '"+archivo[i].name+"' tiene un nombre muy largo, favor de recortar e intentar de nuevo");
        this.limpiarArchivos();
      }
      reader.readAsDataURL(archivo[i]);
      reader.onloadend=()=>{
        if(archivo[i].name.length<=50){
          this.archivosMensaje.push(reader.result);
        }
      }
    }
    
  }
  public limpiarArchivos(){
    var e = document.getElementById("nombresArchivos");
    var f = document.getElementById("tNombres");
    (<HTMLInputElement>document.getElementById('archivos')).value='';
    this.numeroArchivosMensaje=0;
    this.nombresArchivosReales = [];
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
  accederArchivo(url:string){ 
    window.open(url, '_blank')
  }
}
