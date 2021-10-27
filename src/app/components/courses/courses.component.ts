import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/entities/curso';
import { CoursesService } from 'src/app/components/courses/courses.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ownedCourses } from 'src/app/entities/ownedCourses';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public codeCourse: Curso | undefined;
  public miId : string = sessionStorage.getItem('id')!;
  durationInSeconds = 5;
  joinCourseForm = new FormGroup({
    code: new FormControl(''),
  })

  constructor(private coursesService: CoursesService, public dialog: MatDialog, private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCourses();
  }
  postJoinForm(form:Curso){
    console.log(form);
    this.coursesService.joinCourse(form).subscribe(data =>{
      console.log(data);
      this.getCourses();
    })
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


  public entrarCurso(id:string,pId:string): void{
    sessionStorage.setItem('currentCourse',id)
    sessionStorage.setItem('pId',pId)
    this.router.navigate(['/courses/'+id])
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
    if (mode === 'verCodigo') {
      this.codeCourse = course;
      button.setAttribute('data-target','#verCodigoModal');
    }
    container?.appendChild(button);
    button.click();
  }
  onCreate(){
    return this.dialog.open(AddCourseComponent,{
      disableClose:true,
      autoFocus:true,
      width: "43%"
    }).afterClosed().subscribe(res =>{
      console.log(res);
      this.getCourses();
      if(res){
        this._snackBar.openFromComponent(snackBarAddCourse, {
          duration: this.durationInSeconds * 1000,
        });       
      }      
    })
  }
}
@Component({
  selector: 'snack-bar-add-course',
  templateUrl: 'snack-bar-add-course.html'
})
export class snackBarAddCourse {}
