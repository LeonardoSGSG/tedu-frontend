import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CursoLeave } from '../../course-content/DTOS/cursoLeave';
import { CourseMembersService } from '../course-members.service';

@Component({
  selector: 'app-dialog-exit-course',
  templateUrl: './dialog-exit-course.component.html',
  styleUrls: ['./dialog-exit-course.component.css']
})
export class DialogExitCourseComponent implements OnInit {
  public course:string = window.location.href.split("/")[4];
  constructor( 
              private courseMembersSvc: CourseMembersService,
              private router: Router,
              public dialogRef: MatDialogRef<DialogExitCourseComponent>) {}

  ngOnInit(): void {
  }
  
  public SalirCurso(){
    var form: CursoLeave={
      course_id : this.course
    };
    this.courseMembersSvc.leaveCourse(form).subscribe(res =>{
      console.log(res.message);
      this.router.navigate(['/courses'])
      this.closeDialog();
    })
  }
  public closeDialog(){
    this.dialogRef.close(false);
  }
}
