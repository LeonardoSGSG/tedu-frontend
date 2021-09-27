import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/entities/curso';
import { CoursesService } from 'src/app/components/courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Curso[]=[];
  
  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCourses();
  }
  public getCourses(): void{
    this.coursesService.getAllCourses().subscribe(
      (response: Curso[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
