import { Component } from '@angular/core';
import { CoursesService } from 'src/app/components/courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CoursesService]
})
export class AppComponent {
  title: string = 'Tracker de tareas';

  constructor(private coursesSvc: CoursesService ){}

  ngOnInit(){
    this.coursesSvc.getAllCourses().subscribe(res =>{
      console.log('Res',res);
    })
  }
}
