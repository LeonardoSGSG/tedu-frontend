import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseContentService } from './course-content.service';
import { CursoLeave } from './DTOS/cursoLeave';
import { Curso } from 'src/app/entities/curso';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { notificationDTO } from 'src/app/entities/notificationDTO';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
  public notificationsRes='';
  public notifications: notificationDTO[]=[];
  public pId:string = sessionStorage.getItem('pId')!;
  public myId:string = sessionStorage.getItem('id')!;
  public course:string = window.location.href.split("/")[4];
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private CCService:CourseContentService, 
    private notisSvc: NotificacionesService
  ) { }

  ngOnInit(): void {
    this.setCurrentCourseVariable();
  }

  public setCurrentCourseVariable(): void {
    /*this.route.paramMap.subscribe(paramMap => {
      sessionStorage.setItem('currentCourse', paramMap.get('id')!);
    });*/
    sessionStorage.setItem('currentCourse', window.location.href.split("/")[4]);
  }

  public redirProfile() {
    this.router.navigate(['/profile']);
  }

  public LogOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  regresarCursos() {
    this.router.navigate(['/courses']);
  }

  public getUnseen(): void {
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

  public redirigirCurso( idCurso: string) {
    sessionStorage.setItem('currentCourse', idCurso);
    this.router.navigate(['/courses/' + idCurso]);
    location.reload();

    console.log("debugeando")
  }

  public updateNotifications(): void {
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

  public redirCalendar(){
    this.router.navigate(['/calendar']);
  }

}
