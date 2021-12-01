import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioProfile } from './DTOS/FormularioProfile';
import {ProfileService} from './profile.service';
import { DialogProfileComponent } from '../dialog-profile/dialog-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { usuarioDTO } from './DTOS/UsuarioDTO';
import { ConfirmDeleteProfileComponent } from '../confirm-delete-profile/confirm-delete-profile.component';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { notificationDTO } from 'src/app/entities/notificationDTO';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public notificationsRes='';
  public notifications: notificationDTO[]=[];
   public perfil!: usuarioDTO;
  hide=true;
    formularioProfile:FormularioProfile={
      institution: '',
      phone: '',
      name: ''
    }
  constructor(private profileService: ProfileService, private router: Router, private dialog: MatDialog, private dialogDelete: MatDialog, private notisSvc: NotificacionesService) { 

  }
  ngOnInit(): void {

    this.cargarPefil();
    

  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogProfileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  eliminar()
  {
    const dialogRef= this.dialogDelete.open(ConfirmDeleteProfileComponent);
  }

  public cargarPefil(): void
  {
    
    this.profileService.getUserById().subscribe(
      res=>{
        this.perfil=res;
        var id:number= res.id;
        console.log(id);
      },
      err=>
      {
        console.log(err);
      }
    )
  }
  regresarCursos(){
    this.router.navigate(['/courses']);
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
  public irTedu()
  {
this.router.navigate(['/courses']);

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
  public redirigirCurso( idCurso: string)
  {
    sessionStorage.setItem('currentCourse',idCurso);
    this.router.navigate(['/courses/' + idCurso]);
    console.log("debugeando")
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
  /*public eliminar(): void

  {
    this.profileService.DeleteProfile().subscribe(
      res=>
      {
        var message:string= res.message;

        console.log(message);
        sessionStorage.clear();
        this.router.navigate(['/login']);
      },
      err=>
      {
        console.log(err);
      }
    )
  }*/}

  


