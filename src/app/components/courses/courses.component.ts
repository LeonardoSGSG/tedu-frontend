import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseI } from 'src/app/models/course.interface';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: CourseI[]=[];
  
  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCourses();
  }
  public getCourses(): void{
    this.coursesService.getAllCourses().subscribe(
      (response: CourseI[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
