import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private CCService:CourseContentService, private notisSvc: NotificacionesService) { }

  ngOnInit(): void {
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
  public leaveCourse(): void{
    console.log("click en eliminar")
    var form: CursoLeave={
      course_id : sessionStorage.getItem('currentCourse')!
    };
    this.CCService.leaveCourse(form).subscribe(res =>{
      console.log(res.message);
      this.router.navigate(['/courses'])
    })
  }
  regresarCursos(){
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
    location.reload();

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
}
