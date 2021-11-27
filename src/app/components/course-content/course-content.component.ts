import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { Router } from '@angular/router';
import { CourseContentService } from './course-content.service';
import { CursoLeave } from './DTOS/cursoLeave';
import { Curso } from 'src/app/entities/curso';
import { AsistenciaComponent } from '../asistencia/asistencia.component';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
  public pId:string = sessionStorage.getItem('pId')!;
  public myId:string = sessionStorage.getItem('id')!;

  constructor(private router: Router, private CCService:CourseContentService) { }

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

}
