import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/entities/curso';
import { CoursesService } from 'src/app/components/courses/courses.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ownedCourses } from 'src/app/entities/ownedCourses';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Curso[]=[];  
  public ownedCourses: ownedCourses[] =[];
  public editCourse: Curso | undefined;
  public deleteCourse!: Curso;
  
  constructor(private coursesService: CoursesService, public dialog: MatDialog) { }

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
  public onUpdateCourse(id:number,course: Curso): void{
    this.coursesService.updateCourse(id,course).subscribe(
      (response: Curso) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  public onDeleteCourse(id:any): void{
    this.coursesService.deleteCourse(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public searchCourses(key: string):void{
    const results: Curso[] = [];
    for (const course of this.courses){
      if (course.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(course);
      }
    }
    this.courses = results;
    if (results.length === 0 || !key){
      this.getCourses();
    }
  }
  public onOpenModal(course: Curso, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'edit') {
      this.editCourse = course;
      button.setAttribute('data-target','#updateCourseModal');
    }
    if (mode === 'delete') {
      this.deleteCourse = course;
      button.setAttribute('data-target','#deleteCourseModal');
    }
    container?.appendChild(button);
    button.click();
  }
  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(AddCourseComponent ,dialogConfig)
  }
}
